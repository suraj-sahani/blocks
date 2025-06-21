"use server";
import { usersTable } from "@/drizzle/schema/user.schema";
import { db } from "@/drizzle/db";
import { eq } from "drizzle-orm";
import { deleteSession } from "@/lib/session";

export const createUser = async (
  userDetails: typeof usersTable.$inferInsert
) => {
  try {
    // See if user alread exists
    const existingUser = await db.query.usersTable.findFirst({
      where: eq(usersTable.email, userDetails.email),
    });

    if (existingUser) throw new Error("User already exists.");
    const user = await db.insert(usersTable).values(userDetails).returning();
    return {
      success: true,
      message: "User created successfully.",
      data: user,
    };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to create user.",
      data: null,
    };
  }
};

export const logoutUser = async () => await deleteSession();
