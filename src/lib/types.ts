export type FormState =
  | {
      errors?: Record<string, string | string[] | undefined> | undefined;
      message?: string;
      success?: boolean;
    }
  | undefined;
