import { z } from "zod";

export const UserZodSchema = z.object({
  username: z.string().trim().min(1),
});
