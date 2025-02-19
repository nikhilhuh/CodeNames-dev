import { Player } from "../../../utils/constants";
import { axiosInstance } from "../../axiosInstance";
import socket from "../../socketSetup";
import { apiErrorHandler } from "../apiErrorHandling";

export const changeNickname = async (
  roomId: string,
  oldnickname: Player["nickname"],
  newnickname: Player["nickname"]
) => {
  try {
    const response = await axiosInstance.patch("/change-nickname", {
      roomId,
      oldnickname,
      newnickname
    });
    if (response.data.success) {
      socket.emit("update-player", roomId);
      localStorage.setItem("nickname",newnickname);

      return { success: true, message: "Completed" };
    } else
      return { success: false, message: "Unexpected error occured while updating nickname" };
  } catch (err: any) {
    return apiErrorHandler(err);
  }
};
