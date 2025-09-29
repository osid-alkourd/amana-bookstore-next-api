import { NextResponse } from "next/server";
import path from "path";
import { promises as fs } from "fs";

const filePath = path.join(process.cwd(), "app", "data", "reviews.json");

export async function POST(request: Request) {
  try {
    let newReview;

    // If request is JSON
    if (request.headers.get("content-type")?.includes("application/json")) {
      const body = await request.json();
      newReview = body;
    } 
    // If request is form-data
    else if (request.headers.get("content-type")?.includes("form")) {
      const formData = await request.formData();
      newReview = {
        bookId: formData.get("bookId")?.toString(),
        author: formData.get("author")?.toString(),
        rating: Number(formData.get("rating") || 0),
        title: formData.get("title")?.toString() || "",
        comment: formData.get("comment")?.toString() || "",
        verified: formData.get("verified") === "true"
      };
    } else {
      return NextResponse.json({ error: "Unsupported content type" }, { status: 400 });
    }

    // read existing reviews
    const data = await fs.readFile(filePath, "utf8");
    const reviews = JSON.parse(data);

    // find max review number
    const maxId = reviews.reviews.reduce((max: number, r: any) => {
      const num = parseInt(r.id.replace("review-", ""), 10);
      return Math.max(max, num);
    }, 0);

    // build final review
    const reviewToSave = {
      id: `review-${maxId + 1}`,
      bookId: newReview.bookId,
      author: newReview.author,
      rating: newReview.rating,
      title: newReview.title,
      comment: newReview.comment,
      timestamp: new Date().toISOString(),
      verified: newReview.verified ?? false,
    };

    reviews.reviews.push(reviewToSave);

    // save to file
    await fs.writeFile(filePath, JSON.stringify(reviews, null, 2), "utf8");

    return NextResponse.json(
      { message: "Review added successfully", review: reviewToSave },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error writing review:", error);
    return NextResponse.json({ error: "Could not write to reviews.json" }, { status: 500 });
  }
}
