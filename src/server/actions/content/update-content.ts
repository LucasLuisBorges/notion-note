"use server";

import { ActionResponse } from "@/@types/action-response";
import { UpdateContentSchema } from "@/schemas/content";
import { db } from "@/server/db";

export async function updateContent({
  values,
}: {
  values: UpdateContentSchema;
}): Promise<ActionResponse> {
  const validatedFields = UpdateContentSchema.safeParse(values);

  if (!validatedFields.success) {
    return { message: "Campos inválidos", status: "error" };
  }

  const { id, title, check } = validatedFields.data;

  const contentExists = await db.content.findUnique({ where: { id } });

  if (!contentExists) {
    return { message: "Item não existe", status: "error" };
  }

  await db.content.update({
    where: { id },
    data: {
      title,
      check,
    },
  });

  return { message: "Item atualizado com sucesso", status: "success" };
}
