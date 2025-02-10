import { clue } from "../../../utils/constants";
import { axiosInstance } from "../../axiosInstance";
import { apiErrorHandler } from "../apiErrorHandling";

export const switchTurn = async (roomId: string, word: clue["clueWord"]) => {
  try {
    const response = await axiosInstance.post("/switch-turn", { roomId, word });
    if (response.data.success) {
      return { success: true, message: "Completed" };
    }
    return { success: false, message: response.data.message };
  } catch (err: any) {
    return apiErrorHandler(err);
  }
};
