"use server";

import { ActionResponse } from "@/@types/action-response";
import { db } from "@/server/db";
import { Content } from "@prisma/client";

export async function getContentByNotion({
  notionId,
}: {
  notionId: string;
}): Promise<ActionResponse<Content[]>> {
  if (!notionId) {
    return { message: "Anotação não encontrada", status: "error" };
  }

  const content = await db.content.findMany({
    where: {
      notionId,
    },
  });

  return {
    message: "Itens encontrados com sucesso",
    status: "success",
    body: content,
  };
}
