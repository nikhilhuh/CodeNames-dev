import React from "react";
import { leaveRoom } from "../../../services/api/apiCalls/leaveRoom";
import { useNavigate } from "react-router-dom";
import { usePlayer } from "../../../context/PlayerContext";
import { useRoom } from "../../../context/RoomContext";
import { GiExitDoor } from "react-icons/gi";

const LeaveRoom: React.FC<{
  setError: React.Dispatch<React.SetStateAction<string>>;
  onClose: () => void;
}> = ({ setError, onClose }) => {
  const { PlayerDetails } = usePlayer();
  const { roomId } = useRoom();
  if (!PlayerDetails || !roomId) return <></>;
  const navigate = useNavigate();

  const handleLeaveRoom = async () => {
    try {
      const response = await leaveRoom(roomId, PlayerDetails.nickname);
      if (response && !response.success) {
        setError(response.message || "Error leaving room , please try again");
      } else if (response?.success) {
        onClose();
        navigate("/");
      }
    } catch (error) {
      setError("Error Leaving Room , please try again");
    }
  };
  return (
    <button
      onClick={handleLeaveRoom}
      className="flex items-center justify-center gap-[1vw] bg-red-400 w-full p-2 4k:p-4 mt-1 shadow-xl rounded-full hover:bg-red-500 transition"
    >
      Leave Room
      <GiExitDoor />
    </button>
  );
};

export default LeaveRoom;
