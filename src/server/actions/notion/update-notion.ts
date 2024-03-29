"use server";

import { ActionResponse } from "@/@types/action-response";
import { UpdateNotionSchema } from "@/schemas/notion";
import { db } from "@/server/db";

export async function updateNotion({
  values,
  userId,
}: {
  values: UpdateNotionSchema;
  userId?: string | null;
}): Promise<ActionResponse> {
  if (!userId) {
    return { message: "Usuário não encontrado", status: "error" };
  }

  const validatedFields = UpdateNotionSchema.safeParse(values);

  if (!validatedFields.success) {
    return { message: "Campos inválidos", status: "error" };
  }

  const { id, title, company, message, priority, status, term } =
    validatedFields.data;

  const notionExists = await db.notion.findUnique({ where: { id } });

  if (!notionExists) {
    return { message: "Anotação não existe", status: "error" };
  }

  await db.notion.update({
    where: { id },
    data: {
      title,
      company,
      message,
      priority,
      status,
      term,
    },
  });

  return { message: "Anotação atualizada com sucesso", status: "success" };
}
