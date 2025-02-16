import { useEffect, useState } from "react";
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
         await updatePlayerDetails(
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
      className={`bg-red-700 tablet:rounded-xl laptop-l:rounded-2xl 4k:rounded-3xl tablet:shadow-md laptop-l:shadow-lg 4k:shadow-2xl p-2 laptop-sm:px-3 laptop-sm:py-2 laptop-l:px-4 4k:p-6`}
    >
      <div className="flex gap-[3vw] items-center">
        <Red />
        <div className="text-[5vw] tablet:text-[2.5vw] text-gray-100 font-bold drop-shadow-md">
          {wordsRemaining}
        </div>
      </div>
      <div className="flex flex-col whitespace-break-spaces">
        <Operatives team="red" handleJoin={handleJoin} />
        <SpyMasters team="red" handleJoin={handleJoin} />
      </div>
    </div>
  );
};

export default RedTeam;
