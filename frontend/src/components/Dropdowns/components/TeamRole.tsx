import React from "react";
import { usePlayer } from "../../../context/PlayerContext";

const TeamRole: React.FC = () => {
  const { PlayerDetails } = usePlayer();
    if (!PlayerDetails) return <></>;

    const role =
    PlayerDetails.role === "spymaster" ? "🎩 Spymaster" : "🕵️ Operative";
  const teamColor =
    PlayerDetails.team === "red"
      ? "bg-red-400 text-white"
      : "bg-blue-500 text-white";
  const teamName = PlayerDetails.team === "red" ? "Red 🔴" : "Blue 🔵";
  return (
    <>
      {!PlayerDetails.role && !PlayerDetails.team ? (
        <div className="text-gray-600">Join a Team!</div>
      ) : (
        <div
          className={`py-2 px-4 rounded-lg ${teamColor} font-semibold shadow-lg flex flex-col gap-2`}
        >
          <span className="font-bold">Role: {role}</span>
          <span className="font-bold">Team: {teamName}</span>
        </div>
      )}
    </>
  );
};

export default TeamRole;
