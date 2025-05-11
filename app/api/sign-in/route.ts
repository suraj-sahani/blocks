import { db } from "@/drizzle/db";
import { usersTable } from "@/drizzle/schema/user.schema";
import { createSession } from "@/lib/session";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const user = await request.json();
    // Check if user exists in db
    const existingUser = await db.query.usersTable.findFirst({
      where: eq(usersTable.email, user.email),
    });

    if (!existingUser)
      return NextResponse.json(
        {
          message: "User does not exist",
          success: false,
          status: 404,
        },
        { status: 404 }
      );

    // Check if password is correct
    const passwordMatch = await bcrypt.compare(
      user.password,
      existingUser.password
    );
    if (!passwordMatch)
      return NextResponse.json(
        {
          message: "Email or password is incorrect.",
          success: false,
        },
        {
          status: 401,
        }
      );
    const { id, firstName, lastName, imageUrl } = existingUser;
    const session = await createSession({
      id,
      first_name: firstName,
      last_name: lastName,
      imageUrl,
    });
    return NextResponse.json({
      message: "User Signed In Successfully.",
      success: true,
      data: {
        user: existingUser,
        session,
      },
    });
  } catch (error: any) {
    console.error(error);
    throw new Error(error?.message);
  }
}
