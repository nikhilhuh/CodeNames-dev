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
        className={`mt-1 text-[2.5vw] mobile-m:text-[2.2vw] tablet:text-[1.2vw] laptop-l:text-[1vw] font-thin ${
          team === "red" ? "text-red-400" : "text-blue-300"
        }`}
      >
        Operative(s)
      </div>
      <div className="text-gray-100 text-[1.8vw] mobile-m:text-[1.6vw] tablet:text-[0.9vw] laptop-l:text-[0.8vw] mt-0.5">
        {operatives.length > 0 ? (
          <div className="flex flex-wrap gap-1 tablet:gap-2">
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
            className="mt-0.5 flex gap-2 items-center text-[2vw] mobile-m:text-[1.8vw] tablet:text-[0.7vw] hover:scale-105 hover:bg-yellow-500 px-[2.5vw] py-[1vw] tablet:px-[1vw] tablet:py-[0.6vw] laptop-sm:py-[0.5vw] bg-yellow-400 rounded-full shadow-lg font-semibold text-black transition"
          >
            Join as Operative
          </button>
        )}
      </div>
    </>
  );
};

export default Operatives;
