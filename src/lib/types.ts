export type FormState =
  | {
      errors?: Record<string, string | string[] | undefined>;
      message?: string;
      success?: boolean;
    }
  | undefined;
