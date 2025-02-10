import { Player } from "../../../utils/constants";
import { axiosInstance } from "../../axiosInstance";
import socket from "../../socketSetup";
import { apiErrorHandler } from "../apiErrorHandling";

export const updatePlayerDetails = async (
  roomId: string,
  nickname: Player["nickname"],
  role: Player["role"],
  team: Player["team"]
) => {
  try {
    const response = await axiosInstance.patch("/update-player", {
      nickname,
      roomId,
      team,
      role,
    });
    if (response.data.success) {
      socket.emit("update-player", roomId);

      return { success: true, message: "Completed" };
    } else
      return { success: false, message: "Unexpected error during room join" };
  } catch (err: any) {
    return apiErrorHandler(err);
  }
};
