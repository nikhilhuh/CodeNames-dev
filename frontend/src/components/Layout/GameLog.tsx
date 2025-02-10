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
    <div className=" bg-white bg-opacity-75 tablet:rounded-xl tablet:min-h-[45vh]">
      <div className="text-center font-semibold text-[2.5vw] tablet:text-[1vw] font-sans">
        Game Log
      </div>
      <div className="flex flex-col gap-[2px] px-[1px] tablet:px-1 mt-[2px]">
        {gameLogs?.map((log, index) => (
          <div
            key={index}
            className={`flex justify-start items-center px-1 py-[2px] tablet:p-1 gap-[2px] tablet:gap-1 text-[1.5vw] tablet:text-[0.9vw]  ${
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

            <span className="text-[1.2vw] tablet:text-[0.8vw]">{log.log}</span>
            {log.clue && (
              <span className="font-semibold bg-gray-300 p-1 rounded-sm">
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
