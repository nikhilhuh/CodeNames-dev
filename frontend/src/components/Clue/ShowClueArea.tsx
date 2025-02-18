import React, { useEffect, useState } from "react";
import { useRoom } from "../../context/RoomContext";

const ShowClueArea: React.FC = () => {
  const { room } = useRoom();
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (room?.clue) {
      setIsAnimating(true);
      const timer = setTimeout(() => setIsAnimating(false), 1500);
      return () => clearTimeout(timer);
    }
  }, [room?.clue]);

  return (
    <div
      className={`flex items-center z-50 bg-blur justify-center font-bold text-[2.5vw] tablet:text-[1.2vw] transition-transform duration-1500 ease-in-out ${
          isAnimating ? "transform translate-y-[-20vh] scale-125" : "transform translate-y-0"
        }`}
    >
      <div
        className={`uppercase border-[0.3vw] rounded-md laptop-l:rounded-lg ${
          room?.turn === "red" ? "border-red-500" : "border-blue-500"
        } bg-white px-[1.2vw] py-[1vw] tablet:px-[0.4vw] tablet:py-[0.3vw]`}
      >
        {room?.clue?.clueWord}
      </div>
      <div
        className={`uppercase border-[0.3vw] rounded-md laptop-l:rounded-lg ${
          room?.turn === "red" ? "border-red-500" : "border-blue-500"
        } bg-white px-[1.2vw] py-[1vw] tablet:px-[0.4vw] tablet:py-[0.3vw]`}
      >
        {room?.clue?.clueNumber}
      </div>
    </div>
  );
};

export default ShowClueArea;
