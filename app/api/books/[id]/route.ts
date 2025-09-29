import {NextRequest, NextResponse } from "next/server";
import booksData from "@/app/data/books.json";

export async function GET(
  request: NextRequest,
  context: { params: { id: string } }
) {
  const { id } = context.params;

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