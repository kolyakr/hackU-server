import { z } from "zod";

export const createProjectSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters long")
    .max(100, "Title must not exceed 100 characters"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters long")
    .max(1000, "Description must not exceed 1000 characters"),
});

export type CreateProjectType = z.infer<typeof createProjectSchema>;
