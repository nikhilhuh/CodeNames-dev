import { FaUser } from "react-icons/fa";
import { IoIosRefresh } from "react-icons/io";
import { usePlayer } from "../../context/PlayerContext";
import { resetGame } from "../../services/api/apiCalls/resetGame";
import { useRoom } from "../../context/RoomContext";

interface TopOptionsBarProps {
  handleRulesClick: () => void;
  setShowInfoModal: React.Dispatch<React.SetStateAction<boolean>>;
  setInfo: React.Dispatch<React.SetStateAction<string>>;
}
const TopOptionsBar: React.FC<TopOptionsBarProps> = ({
  handleRulesClick,
  setShowInfoModal,
  setInfo,
}) => {
  const { PlayerDetails } = usePlayer();
  const { room , roomId } = useRoom();
  
  if (!roomId || !PlayerDetails || !room) return <></>;

  const handleRoomIdCopy = () => {
    if (roomId) {
      navigator.clipboard
        .writeText(roomId)
        .then(() => {
          setInfo("Room ID copied to clipboard!");
        })
        .catch(() => {
          setInfo("Failed to copy Room ID");
        });
      setShowInfoModal(true);
    }
  };

  const handleResetGame = async () => {
    await resetGame(roomId, PlayerDetails.nickname);
  };

  return (
    <div className="w-full bg-transparent">
      <div className="flex justify-between items-center font-semibold text-[2.3vw] tablet:text-[1.2vw]">
        <div className="flex 4k:gap-4 gap-1 laptop-l:gap-2 items-center">
          <button
            title="Players in Room"
            className="flex gap-1 tablet:gap-2 items-center laptop-sm:px-4 laptop-sm:py-2 p-2 bg-yellow-400 rounded-full shadow-md"
          >
            <span className="hidden tablet:inline-block">Players</span> <FaUser />{" "}
            {room?.players?.length}
          </button>
          <button
            onClick={handleRoomIdCopy}
            title="Room Id"
            className="flex gap-2 items-center laptop-sm:px-4 laptop-sm:py-2 p-2 bg-yellow-400 rounded-full shadow-md font-semibold"
          >
            {roomId}
          </button>
        </div>
        <div className="flex 4k:gap-4 gap-1 laptop-l:gap-2 items-center">
          {room?.creator === PlayerDetails.nickname && (
            <button
              title="Reset Board"
              onClick={handleResetGame}
              className="flex gap-2 items-center laptop-sm:px-4 laptop-sm:py-2 p-2 bg-yellow-400 rounded-full shadow-md"
            >
              {" "}
              <IoIosRefresh />{" "}
              <span className="hidden tablet:inline-block">Reset Game</span>
            </button>
          )}
          <button
            title="Game Rules"
            onClick={handleRulesClick}
            className="flex gap-2 items-center laptop-sm:px-4 laptop-sm:py-2 p-2 bg-yellow-400 rounded-full shadow-md"
          >
            Rules
          </button>
          <button
            title="You Nickname"
            className="flex gap-2 items-center laptop-sm:px-4 laptop-sm:py-2 p-2 bg-orange-400 rounded-full shadow-md font-semibold"
          >
            {PlayerDetails.nickname}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopOptionsBar;
