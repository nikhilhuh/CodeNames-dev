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
    <div className="bg-gray-200 bg-opacity-80 lg:px-4 lg:py-2 p-2 rounded-lg text-center flex flex-col md:gap-2">
      <div className="xl:text-[1.4rem] lg:text-[1.2rem] text-[1rem] font-semibold font-mono">{winner.team === PlayerDetails.team ? "You Win!" : "You Lost!"}</div>
      <div className="typewriter xl:text-[1.2rem] lg:text-[1rem] text-[0.8rem]">{winner.way === "assassin" ? winner.team === PlayerDetails.team ? "Opponents's Team has contacted the assassin" : "Your Team has contacted the assassin"
      : winner.team === PlayerDetails.team ? "Your team has found all your cards" : "Opponents have found all their cards"}</div>
    </div>
  );
};

export default WinnerInfo;
