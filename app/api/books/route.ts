import { NextResponse } from "next/server";
import path from "path";
import { promises as fs } from "fs";

// Build the path to books.json
const filePath = path.join(process.cwd(), "app", "data", "books.json");

// GET all books
export async function GET() {
  try {
    const data = await fs.readFile(filePath, "utf8");
    const books = JSON.parse(data);
    return NextResponse.json(books);
  } catch (error) {
    return NextResponse.json(
      { error: "Could not read books.json" },
      { status: 500 }
    );
  }
}

// POST a new book
export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    if (!formData.get("title") || !formData.get("author")) {
      return NextResponse.json(
        { error: "Title and author are required" },
        { status: 400 }
      );
    }

    // Read existing books
    const data = await fs.readFile(filePath, "utf8");
    const books = JSON.parse(data);

    // Create new book object
    const newBook = {
      id: (books.books.length + 1).toString(),
      title: formData.get("title") as string,
      author: formData.get("author") as string,
      description: formData.get("description") as string,
      price: Number(formData.get("price") || 0),
      isbn: formData.get("isbn") as string,
      genre: formData.getAll("genre[]") as string[],
      tags: formData.getAll("tags[]") as string[],
      datePublished: formData.get("datePublished") || new Date().toISOString(),
      pages: Number(formData.get("pages") || 0),
      language: formData.get("language") as string,
      publisher: formData.get("publisher") as string,
    };

    // Add to array
    books.books.push(newBook);

    // Write back to file
    await fs.writeFile(filePath, JSON.stringify(books, null, 2), "utf8");

    return NextResponse.json(
      { message: "Book added successfully", book: newBook },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Could not write to books.json" },
      { status: 500 }
    );
  }
}
