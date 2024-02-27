"use server";

import { CreateContentSchema } from "@/schemas/content";
import { db } from "@/server/db";

export async function createContent({
  values,
}: {
  values: CreateContentSchema;
}) {
  const validatedFields = CreateContentSchema.safeParse(values);

  if (!validatedFields.success) {
    return { message: "Campos inválidos", status: "error" };
  }

  const { title, check, notionId } = validatedFields.data;

  await db.content.create({
    data: {
      title,
      check,
      notionId,
    },
  });

  return { message: "Item criado com sucesso", status: "success" };
}
