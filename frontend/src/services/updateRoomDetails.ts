import { getRoomDetails } from "./api/apiCalls/getRoomDetails";
import { apiErrorHandler } from "./api/apiErrorHandling";
import { updateLocalStorage } from "./updateLocalStorage";

export const updateRoomDetails = async (roomId: string) => {
  try {
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