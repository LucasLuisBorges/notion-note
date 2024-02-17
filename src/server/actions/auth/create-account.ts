"use server";

import { ActionResponse } from "@/@types/action-response";
import { SignUpSchema } from "@/schemas/auth";
import { db } from "@/server/db";

export async function createAccount({
  values,
}: {
  values: SignUpSchema;
}): Promise<ActionResponse> {
  const validateFields = SignUpSchema.safeParse(values);

  if (!validateFields.success) {
    return { message: "Invalid fields", status: "error" };
  }

  const { first_name, last_name, email, password } = validateFields.data;

  const accountExists = await db.user.findUnique({
    where: { email },
  });

  if (accountExists) {
    return { message: "Account already exists", status: "error" };
  }

  await db.user.create({
    data: {
      first_name,
      last_name: last_name || "",
      email,
      password,
    },
  });

  return { message: "Account added successfully", status: "success" };
}
