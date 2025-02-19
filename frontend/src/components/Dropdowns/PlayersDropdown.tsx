import React, { useState } from "react";
import ErrorModal from "../Modals/ErrorModal";
import RoomIdShare from "./components/RoomIdShare";
import PlayersInRoom from "./components/PlayersInRoom";

const PlayersDropdown: React.FC = () => {
  const [error, setError] = useState<string>("");

  return (
    <div
      className="absolute top-[110%] left-1 z-50 rounded-xl w-[60vw] tablet:w-[35vw] laptop-sm:w-[25vw] laptop-l:w-[20vw] text-[2.2vw] tablet:text-[1.2vw] laptop-sm:text-[1vw] laptop-l:text-[0.8vw] 4k:text-[1vw]"
      onClick={(e) => e.stopPropagation()}
    >
      {error && <ErrorModal onClose={() => setError("")} error={error} />}
      <RoomIdShare setError={setError} />

      <div className="bg-gray-300 p-2 tablet:p-4 4k:p-6 rounded-bl-xl rounded-br-xl">
        <PlayersInRoom />
      </div>
    </div>
  );
};

export default PlayersDropdown;
