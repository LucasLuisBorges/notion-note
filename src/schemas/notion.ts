import * as z from "zod";

import { NotionStatus, Priority } from "@prisma/client";

export const NotionSchema = z.object({
  id: z.string(),
  title: z.string().min(1, {
    message: "Título é obrigatório e deve ter pelo menos 1 caractere",
  }),
  message: z.string().min(1, {
    message: "Mensagem é obrigatória e deve ter pelo menos 1 caractere",
  }),
  status: z.nativeEnum(NotionStatus).optional(),
  priority: z.nativeEnum(Priority).optional(),
  company: z.string().optional(),
  term: z.date().optional(),
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
  term: z.date().optional(),
  priority: z.nativeEnum(Priority).optional(),
  company: z.string().optional(),
  content: z.array(z.string()).optional(),
});

export const UpdateNotionSchema = z.object({
  id: z.string(),
  title: z.string().optional(),
  message: z.string().optional(),
  status: z.nativeEnum(NotionStatus).optional(),
  priority: z.nativeEnum(Priority).optional(),
  company: z.string().optional(),
  term: z.date().optional(),
  content: z.array(z.string()).optional(),
});

export type NotionSchema = z.infer<typeof NotionSchema>;
export type CreateNotionSchema = z.infer<typeof CreateNotionSchema>;
export type UpdateNotionSchema = z.infer<typeof UpdateNotionSchema>;
