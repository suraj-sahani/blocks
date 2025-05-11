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
    return user;
  } catch (error: any) {
    throw new Error(error?.message);
  }
};

export const logoutUser = async () => await deleteSession();
