"use server";

import { ActionResponse } from "@/@types/action-response";
import { NotionIProps } from "@/components/notion-card";
import { db } from "@/server/db";

export async function getNotionsByUser({
  userId,
}: {
  userId: string | null | undefined;
}): Promise<ActionResponse<NotionIProps[]>> {
  if (!userId) {
    return { message: "Usuário não encontrado", status: "error" };
  }

  const notions = await db.notion.findMany({
    where: {
      userId,
    },
    include: {
      content: true,
    },
  });

  return {
    message: "Anotações encontradas com sucesso",
    status: "success",
    body: notions,
  };
}
