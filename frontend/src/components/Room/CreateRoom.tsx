import React from "react";
import { createRoom } from "../../services/api/apiCalls/createRoom";
import { useNavigate } from "react-router-dom";
import { useRoom } from "../../context/RoomContext";

const CreateRoom: React.FC<{
  nickname: string;
  setError: React.Dispatch<React.SetStateAction<string>>;
}> = ({ nickname, setError }) => {
  const navigate = useNavigate();
  const { setisLoading } = useRoom();

  const handleCreateRoom = async () => {
    if (nickname.trim() === "") {
      setError("Enter your Nickname to continue");
      return;
    }
    try {
      setisLoading(true);
      const response = await createRoom(nickname);
      if (response && response.success && "roomId" in response) {
        const newRoomId = response.roomId;
        navigate(`/games/${newRoomId}`);
      } else {
        setError(response?.message || "Error creating room , please try again");
      }
    } catch (error) {
      setError("Error creating room , please try again");
    }
  };

  return (
    <div className="border-b-2 tablet:border-r-2 tablet:border-b-0 border-black px-4 py-2">
      <button
        onClick={handleCreateRoom}
        className="p-4 bg-green-600 text-[3vw] tablet:text-[2.5vw] laptop-l:text-[2vw] font-semibold font-serif rounded-xl hover:bg-green-700"
      >
        Create Room
      </button>
    </div>
  );
};

export default CreateRoom;
