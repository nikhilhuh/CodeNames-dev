import React from "react";
import { usePlayer } from "../../context/PlayerContext";
import { useRoom } from "../../context/RoomContext";

const WinnerInfo: React.FC = () => {
  const { PlayerDetails} = usePlayer();
  const { room } = useRoom();

  if (!room || !PlayerDetails) return <></>;

  const { winner } = room;

  if (!winner) return <></>;

  return (
    <div className="min-h-[8vh] tablet:min-h-0 flex justify-center items-center">
      <div className="bg-gray-200 bg-opacity-80 p-2 rounded-lg text-center flex flex-col">
        <div className="text-[2.5vw] tablet:text-[1.5vw] font-semibold font-mono">{winner.team === PlayerDetails.team ? "You Win!" : "You Lost!"}</div>
        <div className="typewriter text-[2.2vw] tablet:text-[1.2vw]">{winner.way === "assassin" ? winner.team === PlayerDetails.team ? "Opponents's Team has contacted the assassin" : "Your Team has contacted the assassin"
        : winner.team === PlayerDetails.team ? "Your team has found all your cards" : "Opponents have found all their cards"}</div>
      </div>
    </div>
  );
};

export default WinnerInfo;
