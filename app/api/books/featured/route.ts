import { NextResponse } from "next/server";
import booksData from "@/app/data/books.json";

export async function GET() {
  const featuredBooks = booksData.books.filter(
    (book) => book.featured === true
  );
  return NextResponse.json(featuredBooks);
}
