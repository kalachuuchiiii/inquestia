import { AxiosError, isAxiosError } from "axios";
import { ZodError } from "zod";

export const getErrMsg = (err: any): string => {
  if (err instanceof ZodError) {
    return err.issues[0].message;
  }
  if (isAxiosError(err)) {
    return err.response?.data.message ?? "Something went wrong.";
  }

  if (err instanceof Error) {
    return err.message;
  }

  return err?.message ?? "Something went wrong.";
};
