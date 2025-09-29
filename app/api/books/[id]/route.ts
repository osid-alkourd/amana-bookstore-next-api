import { NextResponse } from "next/server";
import booksData from "@/app/data/books.json";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  // find book by ID
  const book = booksData.books.find((b) => b.id === id);

  if (!book) {
    return NextResponse.json(
      { error: `Book with ID ${id} not found`},
      { status: 404 }
    );
  }

  return NextResponse.json(book);
}