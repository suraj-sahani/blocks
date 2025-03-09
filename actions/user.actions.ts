"use server";
import { usersTable } from "@/drizzle/schema/user.schema";
import { db } from "@/drizzle/db";

export const createUser = async () => {
  const user: typeof usersTable.$inferInsert = {
    email: "test@gmail.com",
    firstName: "Rahul",
    lastName: "Sahani",
  };

  await db.insert(usersTable).values(user);
};
