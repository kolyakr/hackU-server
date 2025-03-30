import { z } from "zod";
import { loginUserSchema } from "./loginUserValidation";

export const registerUserSchema = loginUserSchema.extend({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(30, "Maximum length is 30 characters"),
});

export type RegisterUserType = z.infer<typeof registerUserSchema>;
