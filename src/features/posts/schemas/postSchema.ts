import { z } from "zod";

export const postSchema = z.object({
  title: z
    .string()
    .min(4, "El título debe tener más de 3 letras"),

  body: z
    .string()
    .min(5, "La descripción debe tener más de 5 caracteres"),

  userId: z.number(),
  id: z.number().optional()
});

export type PostFormValues = z.infer<typeof postSchema>;
