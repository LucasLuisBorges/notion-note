"use server";

import { ActionResponse } from "@/@types/action-response";
import { db } from "@/server/db";

export async function deleteContent(id: string): Promise<ActionResponse> {
  if (!id) {
    return { message: "Campos inválidos", status: "error" };
  }

  await db.content.delete({ where: { id } });

  return { message: "Item removido com sucesso", status: "success" };
}
