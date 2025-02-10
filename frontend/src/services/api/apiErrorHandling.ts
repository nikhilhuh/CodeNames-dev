import { isAxiosError } from "axios";

export const apiErrorHandler = (err: any) => {
  if (isAxiosError(err)) {
    if (err.code === "ECONNABORTED") {
      return { success: false, message: "Request Timed Out" };
    } else if (err.response) {
      if (err.response.status === 400) {
        const { success, message } = err.response.data;
        return { success, message };
      }
    } else if (err.request) {
      return { success: false, message: "No response from server" };
    }
  } else if (err instanceof Error) {
    return { success: false, message: "An unexpected error occurred" };
  } else {
    return { success: false, message: "An unknown error occurred" };
  }
};
