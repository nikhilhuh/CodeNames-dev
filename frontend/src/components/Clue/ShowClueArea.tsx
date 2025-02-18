import React, { useEffect, useState } from "react";
import { useRoom } from "../../context/RoomContext";

interface ShowClueAreaProps {
  onAnimationEnd: () => void;
  onAnimationStart: () => void;
}

const ShowClueArea: React.FC<ShowClueAreaProps> = ({
  onAnimationEnd,
  onAnimationStart,
}) => {
  const { room } = useRoom();
  const [isAnimating, setIsAnimating] = useState(false);
  const [prevClue, setPrevClue] = useState<string | null>(null); // Track previous clue

  useEffect(() => {
    if (room?.clue?.clueWord && room?.clue?.clueWord !== prevClue) {
      // Only animate if the clue changes
      setIsAnimating(true);
      onAnimationStart();
      setPrevClue(room.clue.clueWord);

      const timer = setTimeout(() => {
        setIsAnimating(false);
        onAnimationEnd();
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [room?.clue?.clueWord]);

  return (
    <div
      className={`flex items-center z-50 justify-center font-bold text-[2.5vw] tablet:text-[1.2vw] transition-transform duration-[1500ms] ease-in-out ${
        isAnimating
          ? "translate-y-[-15vh] mobile-m:translate-y-[-18vh] mobile-l:translate-y-[-20vh] tablet:translate-y-[-15vh] laptop-sm:translate-y-[-30vh] laptop-l:trasnlate-y-[-35vh] scale-125 opacity-100"
          : "translate-y-0 opacity-100"
      }`}
    >
      <div
        className={`uppercase border-[0.3vw] rounded-md laptop-l:rounded-lg ${
          room?.turn === "red" ? "border-red-200" : "border-blue-200"
        } bg-white px-[1.2vw] py-[1vw] tablet:px-[0.4vw] tablet:py-[0.3vw]`}
      >
        {room?.clue?.clueWord}
      </div>
      <div
        className={`uppercase border-[0.3vw] rounded-md laptop-l:rounded-lg ${
          room?.turn === "red" ? "border-red-200" : "border-blue-200"
        } bg-white px-[1.2vw] py-[1vw] tablet:px-[0.4vw] tablet:py-[0.3vw]`}
      >
        {room?.clue?.clueNumber}
      </div>
    </div>
  );
};

export default ShowClueArea;
