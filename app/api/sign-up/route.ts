import { db } from "@/drizzle/db";
import { usersTable } from "@/drizzle/schema/user.schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { createSession } from "@/lib/session";

export async function POST(request: NextRequest) {
  try {
    const user = await request.json();

    // Check if user already exists in database
    const existingUser = await db.query.usersTable.findFirst({
      where: eq(usersTable.email, user.email),
    });

    if (existingUser)
      return NextResponse.json(
        {
          message: "User already exists",
          success: false,
          status: 409,
        },
        { status: 409 }
      );

    const hashedPassword = await bcrypt.hash(user.password, 10);

    // If user does not exixt, create the new user
    const newUser = await db
      .insert(usersTable)
      .values({ ...user, password: hashedPassword })
      .returning({
        id: usersTable.id,
        first_name: usersTable.firstName,
        last_name: usersTable.lastName,
        imageUrl: usersTable.imageUrl,
      });

    await createSession(newUser[0]);
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
