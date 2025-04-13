import { z } from "zod";

export const createProjectSchema = z.object({
  hackatonId: z.string(),
});

export type CreateProjectType = z.infer<typeof createProjectSchema>;
