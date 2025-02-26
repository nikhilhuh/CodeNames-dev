import React, { useEffect, useRef, useState } from "react";
import { usePlayer } from "../../context/PlayerContext";
import PlayerDropdown from "../Dropdowns/PlayerDropdown";
import { MdEmojiEmotions } from "react-icons/md";

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
        className="flex gap-[1vw] tablet:gap-[0.5vw] laptop-l:gap-[0.4vw] items-center px-[2.5vw] py-[1vw] tablet:px-[1vw] tablet:py-[0.6vw] laptop-sm:py-[0.5vw] bg-orange-400 rounded-full shadow-xl hover:bg-orange-500 hover:scale-105 transition"
      >
        <span>{PlayerDetails.nickname}</span>
        <MdEmojiEmotions className="text-white"/> 
      </button>
      {playerDropdown && <PlayerDropdown onClose={playerClick}/>}
    </div>
  );
};

export default PlayerMenu;
