import React from "react";
import { usePlayer } from "../../context/PlayerContext";
import { useRoom } from "../../context/RoomContext";
import { resetGame } from "../../services/api/apiCalls/resetGame";
import { IoIosRefresh } from "react-icons/io";

const ResetButton: React.FC = () => {
  const { PlayerDetails } = usePlayer();
  const { room, roomId } = useRoom();

  if (!room || !PlayerDetails || !roomId) return <></>;

  if(room.creator !== PlayerDetails.nickname) return <></>;

  const handleResetGame = async () => {
    await resetGame(roomId, PlayerDetails.nickname);
  };
  return (
    <button
      title="Reset Board"
      onClick={handleResetGame}
      className="flex gap-[1vw] tablet:gap-[0.5vw] items-center px-[2.5vw] py-[1.5vw] tablet:px-[1vw] tablet:py-[0.8vw] bg-yellow-400 rounded-full shadow-xl hover:bg-yellow-500 hover:scale-105 transition"
    >
      <IoIosRefresh />
      <span className="hidden tablet:inline-block">Reset Game</span>
    </button>
  );
};

export default ResetButton;
