import * as z from "zod";

export const FilterSchema = z.object({
  company: z.string().optional(),
  status: z.string().optional(),
});

export type FilterSchema = z.infer<typeof FilterSchema>;
