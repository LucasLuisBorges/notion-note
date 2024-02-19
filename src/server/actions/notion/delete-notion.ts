"use server";

import { ActionResponse } from "@/@types/action-response";
import { db } from "@/server/db";

export async function deleteNotion(id: string): Promise<ActionResponse> {
  if (!id) {
    return { message: "Campos inválidos", status: "error" };
  }

  await db.notion.delete({ where: { id } });

  return { message: "Anotação removida com sucesso", status: "success" };
}
