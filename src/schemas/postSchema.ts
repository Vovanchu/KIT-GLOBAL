import { z } from "zod";

export const postSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title must be at most 100 characters"),
  author: z
    .string()
    .min(2, "Author must be at least 2 characters")
    .max(50, "Author must be at most 50 characters")
    .regex(
      /^[a-zA-Zа-яА-ЯёЁіІїЇєЄ\s']+$/,
      "Author name can only contain letters",
    ),
  content: z
    .string()
    .min(10, "Content must be at least 10 characters")
    .max(5000, "Content must be at most 5000 characters"),
});

export type PostFormValues = z.infer<typeof postSchema>;
