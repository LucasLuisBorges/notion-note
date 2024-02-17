import * as z from "zod";

export const SignInSchema = z
  .object({
    email: z
      .string({
        invalid_type_error: "Por favor, insira um e-mail válido",
      })
      .email({
        message: "E-mail é obrigatório",
      }),
    password: z.string().min(1, {
      message: "Senha é obrigatória",
    }),
  })
  .refine((data) => {
    if (data.email) {
      data.email = data.email.toLowerCase().trim();
    }

    return true;
  });

export const SignUpSchema = z
  .object({
    first_name: z.string().min(1, {
      message: "Nome é obrigatório",
    }),
    last_name: z.string().optional(),
    email: z
      .string({
        invalid_type_error: "Por favor, insira um e-mail válido",
      })
      .email({
        message: "E-mail é obrigatório",
      }),
    password: z.string().min(1, {
      message: "Senha é obrigatória",
    }),
  })
  .refine((data) => {
    if (data.email) {
      data.email = data.email.toLowerCase().trim();
    }

    return true;
  });

export type SignInSchema = z.infer<typeof SignInSchema>;
export type SignUpSchema = z.infer<typeof SignUpSchema>;
