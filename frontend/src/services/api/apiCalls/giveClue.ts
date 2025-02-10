import { clue, Player } from "../../../utils/constants";
import { axiosInstance } from "../../axiosInstance";
import { apiErrorHandler } from "../apiErrorHandling";

export const giveClue = async (
  roomId: string,
  nickname: Player["nickname"],
  clueWord: clue["clueWord"],
  clueNumber: clue["clueNumber"]
) => {
  try {
    const response = await axiosInstance.post("/give-clue", {
      roomId,
      nickname,
      clueWord,
      clueNumber,
    });
    if (response.data.success) {
      return { success: true , message: "Completed" };
    }
    return { success: false, message: response.data.message };
  } catch (err: any) {
    return apiErrorHandler(err);
  }
};
