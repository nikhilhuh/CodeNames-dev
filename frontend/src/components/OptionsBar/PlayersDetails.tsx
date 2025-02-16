import React, { useEffect, useRef, useState } from "react";
import { useRoom } from "../../context/RoomContext";
import PlayersDropdown from "../Dropdowns/PlayersDropdown";
import { FaUser } from "react-icons/fa";

const PlayersDetails: React.FC = () => {
  const [playersDropdown, setPlayersDropdown] = useState<boolean>(false);
  const playersRef = useRef<HTMLDivElement>(null);
  const { room, roomId } = useRoom();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        playersRef.current &&
        !playersRef.current.contains(event.target as Node)
      ) {
        setPlayersDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (!room || !roomId) return <></>;

  const playersClick = () => {
    setPlayersDropdown((prev) => !prev);
  };

  return (
    <div ref={playersRef} className="relative">
      <button
        onClick={playersClick}
        title="Players in Room"
        className="flex gap-[1vw] tablet:gap-[0.5vw] items-center px-[1.5vw] py-[1vw] tablet:px-[0.6vw] tablet:py-[0.5vw] bg-yellow-400 rounded-full shadow-lg"
      >
        <span className="hidden tablet:inline-block">Players</span> <FaUser />{" "}
        {room?.players?.length}
      </button>
      {playersDropdown && <PlayersDropdown />}
    </div>
  );
};

export default PlayersDetails;
