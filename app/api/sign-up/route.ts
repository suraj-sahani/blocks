import { db } from "@/drizzle/db";
import { usersTable } from "@/drizzle/schema/user.schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const user = await request.json();

    // Check if user already exists in database
    const existingUser = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, user.email))
      .limit(1);
    if (existingUser?.length)
      return NextResponse.json(
        {
          message: "User already exists",
          success: false,
          status: 409,
        },
        { status: 409 }
      );

    // If user does not exixt, create the new user
    const newUser = await db.insert(usersTable).values(user).returning();
    return NextResponse.json(
      {
        success: true,
        message: "User created successfully",
        data: newUser,
      },
      { status: 201 }
    );
  } catch (error: any) {
    throw new Error(error?.message);
  }
}
