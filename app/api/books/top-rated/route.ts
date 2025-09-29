import { NextResponse } from "next/server";
import booksData from "@/app/data/books.json";

export async function GET() {
  const scoredBooks = booksData.books.map((book) => {
    const rating = book.rating ?? 0;         // default to 0 if missing
    const reviewCount = book.reviewCount ?? 0; // default to 0 if missing

    return {
      ...book,
      score: rating * reviewCount,
    };
  });

  // sort descending by score
  const sortedBooks = scoredBooks.sort((a, b) => b.score - a.score);

  // get top 10
  const top10Books = sortedBooks.slice(0, 10);

  return NextResponse.json(top10Books);
}
