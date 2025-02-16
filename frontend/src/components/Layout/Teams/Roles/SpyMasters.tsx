import React, { useEffect, useState } from "react";
import { usePlayer } from "../../../../context/PlayerContext";
import { useRoom } from "../../../../context/RoomContext";
import { Player } from "../../../../utils/constants";

interface SpyMastersProps {
  team: Player['team'];
  handleJoin: (chosenRole: Player['role']) => void;
}

const SpyMasters: React.FC<SpyMastersProps> = ({ team, handleJoin }) => {
  const { PlayerDetails } = usePlayer();
  const { room } = useRoom();
  const [spymasters, setSpymasters] = useState<string[]>([]);

  useEffect(() => {
    if (room?.players) {
      setSpymasters(
        room.players
          .filter(
            (player) => player.role === "spymaster" && player.team === team
          )
          .map((player) => player.nickname)
      );
    }
  }, [room]);

  return (
    <>
      <div
        className={`mt-[2px] text-[2.5vw] tablet:text-[1.2vw] laptop-l:text-[1vw] font-thin ${
          team === "red" ? "text-red-400" : "text-blue-300"
        }`}
      >
        SpyMaster
      </div>
      <div className="text-gray-100 text-[1.8vw] tablet:text-[0.9vw] laptop-l:text-[0.8vw] mt-[2px]">
        {spymasters.length > 0 ? (
          <div className="flex flex-wrap gap-2 ">
            {spymasters.map((spymaster, index) => (
              <div
                key={index}
                className={`p-1 ${
                  team === "red" ? "border-red-600" : "border-blue-500"
                } border-2 w-max rounded-lg`}
              >
                {spymaster}
              </div>
            ))}
          </div>
        ) : (
          <>
          <div>-</div>
            {!PlayerDetails?.role && (
              <button
                onClick={() => handleJoin("spymaster")}
                className="mt-[2px] flex gap-2 items-center text-[2vw] tablet:text-[0.7vw] hover:bg-yellow-500 laptop-sm:px-4 laptop-sm:py-2 p-2 bg-yellow-400 rounded-full shadow-lg font-semibold text-black"
              >
                Join as Spymaster
              </button>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default SpyMasters;
