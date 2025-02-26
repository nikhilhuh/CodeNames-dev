import { getRoomDetails } from "./getRoomDetails";
import { axiosInstance } from "../../axiosInstance";
import socket from "../../socketSetup";
import { updateSessionStorage } from "../../updateSessionStorage";
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
      updateSessionStorage("nickname", nickname);
      updateSessionStorage("roomId", roomId);
      socket.emit("join-room", roomId);

      const roomResponse = await getRoomDetails(roomId);

      if (!roomResponse) {
        return { success: false, message: "Failed to fetch room details" };
      }

      if ("room" in roomResponse) {
        updateSessionStorage("roomDetails", roomResponse.room);
        return { success: true, message: "Completed" };
      } else {
        return {
          success: false,
          message: roomResponse.message ?? "An unexpected error occurred",
        };
      }
    } else {
      return {
        success: false,
        message: "Unexpected error occured during room join",
      };
    }
  } catch (err: any) {
    return apiErrorHandler(err);
  }
};
