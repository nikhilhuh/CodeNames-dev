import { getRoomDetails } from "./getRoomDetails";
import { axiosInstance } from "../../axiosInstance";
import socket from "../../socketSetup";
import { updateLocalStorage } from "../../updateLocalStorage";
import { apiErrorHandler } from "../apiErrorHandling";
import { Player } from "../../../utils/constants";

export const createRoom = async (nickname: Player["nickname"]) => {
  try {
    const response = await axiosInstance.post("/create-room", { nickname });
    const { roomId } = response.data;

    updateLocalStorage("nickname", nickname);
    updateLocalStorage("roomId", roomId);
    socket.emit("create-room", roomId);

    // Fetch room details and ensure it's not undefined
    const roomResponse = await getRoomDetails(roomId);

    if (!roomResponse) {
      return { success: false, message: "Failed to fetch room details" };
    }

    if ("room" in roomResponse) {
      updateLocalStorage("roomDetails", roomResponse.room);
      return { success: true, message: "Completed", roomId };
    } else {
      return {
        success: false,
        message: roomResponse.message ?? "An unexpected error occurred",
      };
    }
  } catch (err: any) {
    return apiErrorHandler(err);
  }
};
