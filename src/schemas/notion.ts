import * as z from "zod";

export enum NotionStatus {
  BACKLOG = "BACKLOG",
  PENDING = "PENDING",
  RUNNING = "RUNNING",
  REVIEW = "REVIEW",
  DONE = "DONE",
}

export const NotionSchema = z.object({
  id: z.string(),
  title: z.string().min(1, {
    message: "Título é obrigatório e deve ter pelo menos 1 caractere",
  }),
  message: z.string().min(1, {
    message: "Mensagem é obrigatória e deve ter pelo menos 1 caractere",
  }),
  status: z.nativeEnum(NotionStatus).optional(),
  term: z.string().optional(),
  content: z.array(z.string()).optional(),
  userId: z.string(),
});

export const CreateNotionSchema = z.object({
  title: z.string().min(1, {
    message: "Título é obrigatório e deve ter pelo menos 1 caractere",
  }),
  message: z.string().min(1, {
    message: "Mensagem é obrigatória e deve ter pelo menos 1 caractere",
  }),
  status: z.nativeEnum(NotionStatus).optional(),
  term: z.string().optional(),
  content: z.array(z.string()).optional(),
  userId: z.string(),
});

export const UpdateNotionSchema = z.object({
  title: z
    .string()
    .min(1, {
      message: "Título é obrigatório e deve ter pelo menos 1 caractere",
    })
    .optional(),
  message: z
    .string()
    .min(1, {
      message: "Mensagem é obrigatória e deve ter pelo menos 1 caractere",
    })
    .optional(),
  status: z.nativeEnum(NotionStatus).optional(),
  term: z.string().optional(),
  content: z.array(z.string()).optional(),
  userId: z.string().optional(),
});

export type NotionSchema = z.infer<typeof NotionSchema>;
export type CreateNotionSchema = z.infer<typeof CreateNotionSchema>;
export type UpdateNotionSchema = z.infer<typeof UpdateNotionSchema>;
