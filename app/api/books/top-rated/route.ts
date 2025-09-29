import { NextResponse } from "next/server";
import booksData from "@/app/data/books.json";

export async function GET() {
  const scoredBooks = booksData.books.map((book) => ({
    ...book,
    score: book.rating * book.reviewCount,
  }));

  // sort descending by score
  const sortedBooks = scoredBooks.sort((a, b) => b.score - a.score);

    // get top 10

const top10Books = sortedBooks.slice(0, 10);

  return NextResponse.json(top10Books);

}
