import React, { useEffect, useState } from "react";
import { usePlayer } from "../../../../context/PlayerContext";
import { useRoom } from "../../../../context/RoomContext";
import { Player } from "../../../../utils/constants";

interface OperativesProps {
  team: Player['team'];
  handleJoin: (chosenRole: Player['role']) => void;
}

const Operatives: React.FC<OperativesProps> = ({ team, handleJoin }) => {
  const { PlayerDetails } = usePlayer();
  const { room } = useRoom();
  const [operatives, setOperatives] = useState<string[]>([]);

  useEffect(() => {
    if (room?.players) {
      setOperatives(
        room.players
          .filter(
            (player) => player.role === "operative" && player.team === team
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
        Operative(s)
      </div>
      <div className="text-gray-100 text-[1.8vw] tablet:text-[0.9vw] laptop-l:text-[0.8vw] mt-[2px]">
        {operatives.length > 0 ? (
          <div className="flex flex-wrap gap-2 ">
            {operatives.map((operative, index) => (
              <div
                key={index}
                className={`p-1 ${
                  team === "red" ? "border-red-600" : "border-blue-500"
                } border-2 w-max rounded-lg`}
              >
                {operative}
              </div>
            ))}
          </div>
        ) : (
          <div>-</div>
        )}
        {!PlayerDetails?.role && (
          <button
            onClick={() => handleJoin("operative")}
            className="mt-[2px] flex gap-2 items-center text-[2vw] tablet:text-[0.7vw] hover:bg-yellow-500 laptop-sm:px-4 laptop-sm:py-2 p-2 bg-yellow-400 rounded-full shadow-lg font-semibold text-black transition"
          >
            Join as Operative
          </button>
        )}
      </div>
    </>
  );
};

export default Operatives;
