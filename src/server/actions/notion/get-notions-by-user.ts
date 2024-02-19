"use server";

import { ActionResponse } from "@/@types/action-response";
import { db } from "@/server/db";
import { Notion } from "@prisma/client";

export async function getNotionsByUser({
  userId,
}: {
  userId: string | null | undefined;
}): Promise<ActionResponse<Notion[]>> {
  if (!userId) {
    return { message: "User not provided", status: "error" };
  }

  const notions = await db.notion.findMany({
    where: {
      userId: userId,
    },
  });

  return {
    message: "Stores fetched successfully",
    status: "success",
    body: notions,
  };
}
