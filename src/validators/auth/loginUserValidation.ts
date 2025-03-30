import { z } from "zod";

export const loginUserSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(30, "Maximum length is 30 characters"),
});

export type LoginUserType = z.infer<typeof loginUserSchema>;
