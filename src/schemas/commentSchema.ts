import { z } from "zod";

export const commentSchema = z.object({
  author: z
    .string()
    .min(2, "Author must be at least 2 characters")
    .max(50, "Author must be at most 50 characters"),
  content: z
    .string()
    .min(2, "Content must be at least 2 characters")
    .max(5000, "Content must be at most 5000 characters"),
});

export type CommentFormValues = z.infer<typeof commentSchema>;
