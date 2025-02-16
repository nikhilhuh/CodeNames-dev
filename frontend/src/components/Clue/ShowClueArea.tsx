import React from "react";
import { useRoom } from "../../context/RoomContext";

const ShowClueArea: React.FC = () => {
  const { room } = useRoom();

  return (
    <div
      className={`flex items-center justify-center font-bold text-[2.5vw] tablet:text-[1.2vw]`}
    >
      <div className={`uppercase border-[0.3vw] rounded-md laptop-l:rounded-lg ${room?.turn === "red"? "border-red-500" : "border-blue-500"} bg-white px-[1.2vw] py-[1vw] tablet:px-[0.4vw] tablet:py-[0.3vw]`}>
        {room?.clue?.clueWord}
      </div>
      <div className={`uppercase border-[0.3vw] rounded-md laptop-l:rounded-lg ${room?.turn === "red"? "border-red-500" : "border-blue-500"} bg-white px-[1.2vw] py-[1vw] tablet:px-[0.4vw] tablet:py-[0.3vw]`}>
        {room?.clue?.clueNumber}
      </div>
    </div>
  );
};

export default ShowClueArea;
