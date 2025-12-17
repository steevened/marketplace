export type FormState<T = unknown> =
  | {
      errors?: Record<string, string | string[] | undefined> | undefined;
      message?: string;
      success?: boolean;
      formData?: FormData;
      data?: T;
    }
  | undefined;
