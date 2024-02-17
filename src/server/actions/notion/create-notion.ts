"use server";

import { CreateNotionSchema } from "@/schemas/notion";
import { db } from "@/server/db";

export async function createNotion({ values }: { values: CreateNotionSchema }) {
  const validatedFields = CreateNotionSchema.safeParse(values);

  if (!validatedFields.success) {
    return { message: "Invalid fields", status: "error" };
  }

  const { title, message, status, term, content, userId } =
    validatedFields.data;

  await db.notion.create({
    data: {
      title,
      message,
      status,
      term,
      userId,
    },
  });

  return { message: "Notion added successfully", status: "success" };
}
