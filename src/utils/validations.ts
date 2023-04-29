import { z } from "zod";

export const userZodSchema = z.object({
  username: z.string().trim().min(1),
});
