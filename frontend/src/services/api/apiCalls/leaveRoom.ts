import { Player } from "../../../utils/constants";
import { axiosInstance } from "../../axiosInstance";
import socket from "../../socketSetup";
import { apiErrorHandler } from "../apiErrorHandling";

export const leaveRoom = async (
  roomId: string,
  nickname: Player["nickname"]
) => {
  try {
    const response = await axiosInstance.patch("/leave-room", {
      roomId,
      nickname,
    });
    if (response.data.success) {
      socket.emit("update-player", roomId);
      return { success: true, message: "Room left" };
    } else
      return {
        success: false,
        message: "Unexpected error occured while leaving Room",
      };
  } catch (err: any) {
    return apiErrorHandler(err);
  }
};
