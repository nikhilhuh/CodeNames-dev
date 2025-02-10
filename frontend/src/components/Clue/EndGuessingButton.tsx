import React from "react";
import { endGuessing } from "../../services/api/apiCalls/endGuessing";
import { usePlayer } from "../../context/PlayerContext";
import { useRoom } from "../../context/RoomContext";

const EndGuessingButton: React.FC = () => {
  const { PlayerDetails } = usePlayer();
  const { roomId } = useRoom();
  
  const handleEndGuessing = async () => {
    if (!roomId || !PlayerDetails) return;
    await endGuessing(roomId, PlayerDetails.nickname);
  };
  return (
    <button
      onClick={handleEndGuessing}
      title="End Guessing"
      className="text-center font-semibold py-1 px-2 laptop-l:px-4 4k:px-6 4k:py-2 text-[2.5vw] tablet:text-[1.5vw]  bg-yellow-400 rounded-full shadow-md"
    >
      End Guessing
    </button>
  );
};

export default EndGuessingButton;
