import React, { useEffect, useState } from "react";
import { useRoom } from "../../context/RoomContext";
import { gamelog } from "../../utils/constants";

const GameLog: React.FC = () => {
  const { room } = useRoom();
  const [gameLogs, setGameLogs] = useState<gamelog[]>([]);

  useEffect(() => {
    if (room) setGameLogs(room.gameLog ?? []);
  }, [room]);

  if (!room) return <></>;

  return (
    <div className="bg-white bg-opacity-75 tablet:rounded-xl h-full pb-[2px] flex flex-col pt-[2px]">
      {/* Fixed Heading */}
      <div className="text-center font-semibold text-[2.5vw] tablet:text-[1vw] font-sans">
        Game Log
      </div>

      {/* Scrollable Logs Container */}
      <div className="flex flex-col gap-[2px] tablet:px-[0.1vw] mt-[2px] overflow-y-auto flex-1">
        {gameLogs?.map((log, index) => (
          <div
            key={index}
            className={`flex ${
              log.nickname ? "justify-start" : "justify-center"
            } items-baseline px-[1vw] py-[0.8vw] tablet:px-[0.2vw] tablet:py-[0.2vw] tablet:gap-[0.3vw] gap-[0.5vw] text-[2vw] tablet:text-[0.9vw] ${
              log.turn === "red" ? "bg-red-300" : "bg-blue-300"
            }`}
          >
            {log.nickname && (
              <span
                className={`font-bold ${
                  log.turn === "red" ? "text-red-700" : "text-blue-700"
                }`}
              >
                {log.nickname}
              </span>
            )}
            <span className={`text-[1.8vw] tablet:text-[0.8vw]`}>
              {log.log}
            </span>
            {log.clue && (
              <span className="font-semibold bg-gray-300 p-[0.4vw] tablet:p-[0.1vw] rounded-sm uppercase">
                {log.clue.clueWord} {log.clue.clueNumber}
              </span>
            )}
            {log.word && (
              <span
                className={`font-semibold uppercase ${
                  log.wordColor === "red"
                    ? "text-red-700"
                    : log.wordColor === "blue"
                    ? "text-blue-700"
                    : log.wordColor === "neutral"
                    ? "text-orange-400"
                    : "text-black"
                }`}
              >
                {log.word}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameLog;
