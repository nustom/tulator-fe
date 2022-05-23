import { AxiosError } from "axios";

export function extractAxiosError(error: Error & AxiosError): string {
  let errorMessage = error.message;
  if (error.isAxiosError) {
    errorMessage = error.response?.data as string || error.message;
  }
  return errorMessage;
}
