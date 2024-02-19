"use server";

import { CreateNotionSchema } from "@/schemas/notion";
import { db } from "@/server/db";

export async function createNotion({
  values,
  userId,
}: {
  values: CreateNotionSchema;
  userId?: string | null;
}) {
  if (!userId) {
    return { message: "User id not provided", status: "error" };
  }

  const validatedFields = CreateNotionSchema.safeParse(values);

  if (!validatedFields.success) {
    return { message: "Invalid fields", status: "error" };
  }

  const { title, message, status, term, company, priority } =
    validatedFields.data;

  await db.notion.create({
    data: {
      title,
      message,
      status,
      term,
      company,
      priority,
      userId,
    },
  });

  return { message: "Notion added successfully", status: "success" };
}
