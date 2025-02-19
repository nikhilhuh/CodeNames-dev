import React, { useState } from "react";
import { useRoom } from "../../../context/RoomContext";

const RoomIdShare: React.FC<{setError: React.Dispatch<React.SetStateAction<string>>}> = ({setError}) => {
  const { roomId } = useRoom();
  if (!roomId) return <></>;
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
        .catch((error) => {
          setError(error);
          setButtontext("Copy Room Id to clipboard");
        });
    }
  };
  
  return (
    <div className="bg-gray-100 p-2 tablet:p-4 4k:p-6 text-center rounded-tr-xl rounded-tl-xl border-b-2 border-b-gray-400 flex flex-col items-center 4k:gap-2">
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
        className="mt-1 p-2 4k:p-4 bg-yellow-400 rounded-full shadow-md font-semibold w-max"
      >
        {buttontext}
      </button>
    </div>
  );
};

export default RoomIdShare;
