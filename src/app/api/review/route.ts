import { NextResponse } from "next/server";
import { client } from "@/sanity/lib/client";

interface Review {
  name: string;
  rating: number;
  comment: string;
}

export async function POST(request: Request) {
  const { productId, review } = (await request.json()) as {
    productId: string;
    review: Review;
  };

  try {
    const newReview = {
      ...review,
      date: new Date().toISOString(),
    };

    await client
      .patch(productId)
      .setIfMissing({ reviews: [] })
      .append("reviews", [newReview])
      .commit({ token: process.env.SANITY_WRITE_TOKEN });

    return NextResponse.json(
      { message: "Review submitted successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error submitting review:", error);
    return NextResponse.json(
      { message: "Failed to submit review." },
      { status: 500 }
    );
  }
}