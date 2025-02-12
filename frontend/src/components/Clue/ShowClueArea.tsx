import React from "react";
import { useRoom } from "../../context/RoomContext";

const ShowClueArea: React.FC = () => {
  const { room } = useRoom();

  return (
    <div
      className={`flex items-center justify-center font-bold text-[2.5vw] tablet:text-[1.5vw]`}
    >
      <div className={`4k:border-6 laptop-sm:border-4 uppercase border-2 rounded-md tablet:rounded-lg ${room?.turn === "red"? "border-red-500" : "border-blue-500"} 4k:p-4 laptop-sm:p-2 p-1 bg-white`}>
        {room?.clue?.clueWord}
      </div>
      <div className={`4k:border-6 laptop-sm:border-4 uppercase border-2 rounded-md tablet:rounded-lg ${room?.turn === "red"? "border-red-500" : "border-blue-500"} 4k:p-4 laptop-sm:p-2 p-1 bg-white`}>
        {room?.clue?.clueNumber}
      </div>
    </div>
  );
};

export default ShowClueArea;
