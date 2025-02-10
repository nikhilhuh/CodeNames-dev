import { axiosInstance } from "../../axiosInstance";
import { apiErrorHandler } from "../apiErrorHandling";

export const getRoomDetails = async (roomId: string) => {
  try {
    const response = await axiosInstance.get("/room-details", {
      params: { roomId },
    });
    if (response.data.success) {
      const { room } = response.data;
      return { success: true, message: "Completed", room };
    } else
      return {
        success: false,
        message: "Unexpected error occured while collecting Room Data",
      };
  } catch (err: any) {
    return apiErrorHandler(err);
  }
};
