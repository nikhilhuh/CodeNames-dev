import { RefObject, useEffect, useState } from "react";
import { usePlayer } from "../../../context/PlayerContext";
import { updatePlayerDetails } from "../../../services/api/apiCalls/updatePlayerDetails";
import Red from "./TeamCards/Red";
import Operatives from "./Roles/Operatives";
import SpyMasters from "./Roles/SpyMasters";
import { useRoom } from "../../../context/RoomContext";
import { Player } from "../../../utils/constants";

const RedTeam: React.FC = () => {
  const { PlayerDetails } = usePlayer();
  const { room, roomId } = useRoom();
  const [wordsRemaining, setWordsRemaining] = useState<number>(
    room?.wordsRemaining.red ?? 9
  );

  const handleJoin = async (chosenRole: Player["role"]) => {
    if (roomId) {
      try {
        const response = await updatePlayerDetails(
          roomId,
          PlayerDetails?.nickname || "",
          chosenRole,
          "red"
        );
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    if (room) setWordsRemaining(room.wordsRemaining.red);
  }, [room]);

  if (!room || !PlayerDetails || !roomId) return <></>;

  return (
    <div
      className={`bg-red-700 tablet:rounded-xl tablet:shadow-md tablet:py-2 tablet:px-4 p-2`}
    >
      <div className="flex gap-4 justify-between items-center">
        <Red />
        <div className="text-[5vw] text-gray-100 font-bold drop-shadow-md">
          {wordsRemaining}
        </div>
      </div>
      <div className="flex flex-col whitespace-break-spaces mt-2">
        <Operatives team="red" handleJoin={handleJoin} />
        <SpyMasters team="red" handleJoin={handleJoin} />
      </div>
    </div>
  );
};

export default RedTeam;
