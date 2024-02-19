"use server";

import { ActionResponse } from "@/@types/action-response";
import { db } from "@/server/db";

export async function deleteNotion(id: string): Promise<ActionResponse> {
  if (!id) {
    return { message: "Invalid fields", status: "error" };
  }

  await db.notion.delete({ where: { id } });

  return { message: "Notion deleted successfully", status: "success" };
}
