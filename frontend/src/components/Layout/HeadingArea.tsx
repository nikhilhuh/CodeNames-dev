import React, { useState, useEffect } from "react";
import { usePlayer } from "../../context/PlayerContext";
import { useRoom } from "../../context/RoomContext";
import { heading } from "../../services/heading";

const HeadingArea: React.FC = () => {
  const { PlayerDetails } = usePlayer();
  const { room } = useRoom();

  const role = PlayerDetails?.role ?? null;
  const team = PlayerDetails?.team ?? null;
  const clueGiven = room?.clueGiven ?? false;
  const turn = room?.turn ?? "red";
  const winner = room?.winner ?? null;

  const Heading = heading(role, team, clueGiven, turn, winner);

  const [displayedText, setDisplayedText] = useState<string>(Heading);
  const [key, setKey] = useState(0);

  useEffect(() => {
    setDisplayedText("");
    setTimeout(() => {
      setDisplayedText(Heading);
      setKey((prev) => prev + 1);
    }, 100);
  }, [heading]);

  if (!PlayerDetails || !room) return <></>;

  return (
    <div className="flex bg-transparent justify-center items-center tablet:mt-[0.2vw] tablet:mb-[0.3vw]">
      <div className="bg-white shadow-md text-black rounded-lg laptop-l:rounded-xl max-w-[95vw] tablet:max-w-[60vw] text-[2.2vw] mobile-m:text-[2vw] tablet:text-[1.2vw] laptop-sm:text-[1.2vw] laptop-l:text-[1vw] px-[1.5vw] py-[1vw] tablet:px-[1vw] tablet:py-[0.5vw] laptop-l:px-[0.8vw] laptop-l:py-[0.3vw] text-center overflow-hidden flex flex-wrap justify-center items-center">
        <span key={key} className="typewriter font-semibold">
          {displayedText.split("").map((char, index) => (
            <span key={index} style={{ animationDelay: `${index * 50}ms` }}>
              {char}
            </span>
          ))}
        </span>
      </div>
    </div>
  );
};

export default HeadingArea;
