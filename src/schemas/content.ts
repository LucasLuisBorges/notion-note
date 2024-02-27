import * as z from "zod";

export const ContentSchema = z.object({
  id: z.string(),
  title: z.string().min(1, {
    message: "Título é obrigatório e deve ter pelo menos 1 caractere",
  }),
  check: z.boolean().default(false).optional(),
});

export const CreateContentSchema = z.object({
  title: z.string().min(1, {
    message: "Título é obrigatório e deve ter pelo menos 1 caractere",
  }),
  check: z.boolean().default(false).optional(),
  notionId: z.string(),
});

export const UpdateContentSchema = z.object({
  id: z.string(),
  title: z.string().optional(),
  check: z.boolean().optional(),
});

export type ContentSchema = z.infer<typeof ContentSchema>;
export type CreateContentSchema = z.infer<typeof CreateContentSchema>;
export type UpdateContentSchema = z.infer<typeof UpdateContentSchema>;
