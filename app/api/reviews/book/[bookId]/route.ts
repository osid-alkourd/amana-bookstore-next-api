import { NextResponse } from "next/server";
import reviewsData from "@/app/data/reviews.json";

export async function GET(
  request: Request,
  { params }: { params: { bookId: string } }
) {
  const { bookId } = params;
  // filter reviews by bookId
  const bookReviews = reviewsData.reviews.filter(
    (review) => review.bookId === bookId
  );

  if (bookReviews.length === 0) {
    return NextResponse.json(
      { error: `No reviews found for book with ID ${bookId}` },
      { status: 404 }
    );
  }

  return NextResponse.json(bookReviews);
}
