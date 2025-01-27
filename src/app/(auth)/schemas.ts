import { z } from "zod";

export const PasswordSchema = z
  .string()
  .min(8, { message: "Be at least 8 characters long" })
  .regex(/[a-zA-Z]/, { message: "Contain at least one letter." })
  .regex(/[0-9]/, { message: "Contain at least one number." })
  .regex(/[^a-zA-Z0-9]/, {
    message: "Contain at least one special character.",
  })
  .trim();

export const EmailSchemaField = z
  .string()
  .email({ message: "Ingrese un email válido." })
  .trim();

export const SignInSchema = z.object({
  email: EmailSchemaField,
  password: PasswordSchema,
});
