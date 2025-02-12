import React, { useState } from "react";
import { useRoom } from "../../context/RoomContext";

const PlayersDropdown: React.FC = () => {
  const { room, roomId } = useRoom();
  if (!room || !roomId) return <></>;
  const { players } = room;
  const [buttontext, setButtontext] = useState<string>(
    "Copy Room Id to clipboard"
  );

  const handleRoomIdCopy = () => {
    if (roomId) {
      navigator.clipboard
        .writeText(roomId)
        .then(() => {
          setButtontext("✔️ Copied");
        })
        .catch(() => {
          setButtontext("Copy Room Id to clipboard");
        });
    }
  };
  return (
    <div
      className="absolute top-[110%] left-1 z-50 rounded-xl w-[40vw] tablet:w-[30vw] laptop-sm:w-[20vw] text-[2vw] tablet:text-[1.2vw] laptop-sm:text-[1vw] laptop-l:text-[0.8vw]"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="bg-gray-100 p-2 tablet:p-4 rounded-tr-xl rounded-tl-xl border-b-2 border-b-gray-400 flex flex-col items-center 4k:gap-2">
        <div>Invite other players by sending them this room id</div>
        <input
          type="text"
          readOnly
          value={roomId}
          className="text-center w-max bg-transparent outline-none border-2 border-gray-300 mt-1 rounded-full p-1 tablet:p-2"
        />
        <button
          onClick={handleRoomIdCopy}
          title="Room Id"
          className="mt-1 p-2 bg-yellow-400 rounded-full shadow-md font-semibold w-max"
        >
          {buttontext}
        </button>
      </div>

      <div className="bg-gray-300 p-2 tablet:p-4 rounded-bl-xl rounded-br-xl">
        <div>Players in Room</div>
        <div className="mt-2 flex flex-wrap gap-2">
          {players.map((player, index) => (
            <div
              key={index}
              className="bg-gray-200 px-2 py-1 rounded-lg"
            >
              {player.nickname}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlayersDropdown;
