export type FormState =
  | {
      errors?: {
        password?: string[];
        email?: string[];
      };
      message?: string;
      success?: boolean;
    }
  | undefined;
