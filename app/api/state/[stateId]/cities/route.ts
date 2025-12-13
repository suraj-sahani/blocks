import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/drizzle/db";
import { cities, states } from "@/drizzle/schema";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ stateId: string }> }
) {
  try {
    const { stateId } = await params;
    const citiesList = await db
      .select({
        id: cities.id,
        name: cities.name,
        stateId: cities.stateId,
      })
      .from(cities)
      .where(eq(cities.stateId, stateId));

    return NextResponse.json({
      success: true,
      data: citiesList,
    });
  } catch (error) {
    console.error("Error fetching cities:", error);
    return NextResponse.json(
      { message: "Failed to fetch cities" },
      { status: 500 }
    );
  }
}
