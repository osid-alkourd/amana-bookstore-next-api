import { NextResponse } from "next/server";
import booksData from "@/app/data/books.json";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const start = searchParams.get("start");
  const end = searchParams.get("end");

  if (!start || !end) {
    return NextResponse.json(
      {
        error: "Please provide both start and end dates in YYYY-MM-DD format.",
      },
      { status: 400 }
    );
  }

  const startDate = new Date(start);
  const endDate = new Date(end);

  const filteredBooks = booksData.books.filter((book) => {
    const publishedDate = new Date(book.datePublished);
    return publishedDate >= startDate && publishedDate <= endDate;
  });

    return NextResponse.json(filteredBooks);

}
