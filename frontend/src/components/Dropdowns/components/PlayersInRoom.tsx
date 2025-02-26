import React from "react";
import { useRoom } from "../../../context/RoomContext";

const PlayersInRoom: React.FC = () => {
  const { room } = useRoom();
  if (!room) return <></>;
  const { players } = room;
  return (
    <>
      <div className="text-center">Players in Room</div>
      <div className="mt-2 flex flex-wrap gap-0.5 laptop-sm:gap-1 4k:gap-4">
        {players.map((player, index) => (
          <div key={index} className="bg-gray-200 px-2 py-1 rounded-lg">
            {player.nickname}
          </div>
        ))}
      </div>
    </>
  );
};

export default PlayersInRoom;
