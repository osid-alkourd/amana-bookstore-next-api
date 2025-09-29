import { NextResponse } from "next/server";
import books from "@/app/data/books.json";

export async function GET() {
  return NextResponse.json(books);
}