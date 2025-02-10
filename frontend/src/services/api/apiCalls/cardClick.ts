import { clue, Player } from "../../../utils/constants";
import { axiosInstance } from "../../axiosInstance";
import { apiErrorHandler } from "../apiErrorHandling";

export const cardClick = async (roomId: string, word: clue['clueWord'] , nickname: Player['nickname']) => {
  try{
    const response = await axiosInstance.post('/card-click', {roomId, word , nickname});
    if(response.data.success){
      return {success: true, message: "Completed" };
    }
    return {success: false, message: response.data.message};
  }catch (err: any) {
   return apiErrorHandler(err);
  }
};