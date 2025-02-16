import React, { useEffect, useRef, useState } from "react";
import { usePlayer } from "../../context/PlayerContext";
import PlayerDropdown from "../Dropdowns/PlayerDropdown";

const PlayerMenu: React.FC = () => {
  const { PlayerDetails } = usePlayer();
  const [playerDropdown, setPlayerDropdown] = useState<boolean>(false);
  const playerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        playerRef.current &&
        !playerRef.current.contains(event.target as Node)
      ) {
        setPlayerDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (!PlayerDetails) return <></>;

  const playerClick = () => {
    setPlayerDropdown((prev) => !prev);
  };

  return (
    <div ref={playerRef} className="relative">
      <button
        onClick={playerClick}
        title="Your Nickname"
        className="flex gap-[1vw] tablet:gap-[0.5vw] items-center px-[1.5vw] py-[1vw] tablet:px-[0.6vw] tablet:py-[0.5vw]  bg-orange-400 rounded-full shadow-lg font-semibold"
      >
        {PlayerDetails.nickname}
      </button>
      {playerDropdown && <PlayerDropdown onClose={playerClick}/>}
    </div>
  );
};

export default PlayerMenu;
