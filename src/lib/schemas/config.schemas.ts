import { z } from "zod";

export const ServerToastSchema = z.object({
    id: z.number(),
  message: z.string(),
  description: z.string().optional(),
  variant: z.enum(["success", "error", "warning", "info"]),
  position: z
    .enum([
      "top-left",
      "top-right",
      "top-center",
      "bottom-left",
      "bottom-right",
      "bottom-center",
    ])
    .optional(),
});
