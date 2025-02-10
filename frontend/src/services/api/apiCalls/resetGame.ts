import { Player } from "../../../utils/constants";
import { axiosInstance } from "../../axiosInstance";
import { apiErrorHandler } from "../apiErrorHandling";

export const resetGame = async (
  roomId: string,
  nickname: Player["nickname"]
) => {
  try {
    const response = await axiosInstance.post("/reset-game", {
      roomId,
      nickname,
    });
    if (response.data.success) {
      return { success: true, message: "Completed" };
    }
    return { success: false, message: response.data.message };
  } catch (err: any) {
    return apiErrorHandler(err);
  }
};
