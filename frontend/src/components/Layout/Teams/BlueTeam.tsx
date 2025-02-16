import { useEffect, useState } from "react";
import { usePlayer } from "../../../context/PlayerContext";
import { updatePlayerDetails } from "../../../services/api/apiCalls/updatePlayerDetails";
import Blue from "./TeamCards/Blue";
import Operatives from "./Roles/Operatives";
import SpyMasters from "./Roles/SpyMasters";
import { useRoom } from "../../../context/RoomContext";
import { Player } from "../../../utils/constants";

const BlueTeam: React.FC = () => {
  const { PlayerDetails } = usePlayer();
  const { room, roomId } = useRoom();
  const [wordsRemaining, setWordsRemaining] = useState<number>(
    room?.wordsRemaining.blue ?? 8
  );

  const handleJoin = async (chosenRole: Player["role"]) => {
    if (roomId) {
      try {
        const response = await updatePlayerDetails(
          roomId,
          PlayerDetails?.nickname || "",
          chosenRole,
          "blue"
        );
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    if (room) setWordsRemaining(room.wordsRemaining.blue);
  }, [room]);

  if (!room || !PlayerDetails || !roomId) return <></>;

  return (
    <div
      className={`bg-blue-600 tablet:rounded-xl laptop-l:rounded-2xl 4k:rounded-3xl tablet:shadow-md laptop-l:shadow-lg 4k:shadow-2xl p-2 laptop-sm:px-3 laptop-sm:py-2 laptop-l:px-4 4k:p-6`}
    >
      <div className="flex gap-[3vw] justify-end items-center">
        <div className="text-[5vw] tablet:text-[2.5vw] text-gray-100 font-bold drop-shadow-md">
          {wordsRemaining}
        </div>
        <Blue />
      </div>

      <div className="flex flex-col whitespace-break-spaces">
        <Operatives team="blue" handleJoin={handleJoin} />
        <SpyMasters team="blue" handleJoin={handleJoin} />
      </div>
    </div>
  );
};

export default BlueTeam;
