import { getRoomDetails } from "./getRoomDetails";
import { axiosInstance } from "../../axiosInstance";
import socket from "../../socketSetup";
import { updateLocalStorage } from "../../updateLocalStorage";
import { apiErrorHandler } from "../apiErrorHandling";
import { Player } from "../../../utils/constants";

export const joinRoom = async (
  roomId: string,
  nickname: Player["nickname"]
) => {
  try {
    const response = await axiosInstance.post("/join-room", {
      roomId,
      nickname,
    });

    if (response.data.success) {
      updateLocalStorage("nickname", nickname);
      updateLocalStorage("roomId", roomId);
      socket.emit("join-room", roomId);

      const roomResponse = await getRoomDetails(roomId);

      if (!roomResponse) {
        return { success: false, message: "Failed to fetch room details" };
      }

      if ("room" in roomResponse) {
        updateLocalStorage("roomDetails", roomResponse.room);
        return { success: true, message: "Completed" };
      } else {
        return {
          success: false,
          message: roomResponse.message ?? "An unexpected error occurred",
        };
      }
    } else
      return { success: false, message: "Unexpected error occured during room join" };
  } catch (err: any) {
    return apiErrorHandler(err);
  }
};
