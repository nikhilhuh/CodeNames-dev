import { FaUser } from "react-icons/fa";
import { IoIosRefresh } from "react-icons/io";
import { usePlayer } from "../../context/PlayerContext";
import { resetGame } from "../../services/api/apiCalls/resetGame";
import { useRoom } from "../../context/RoomContext";
import { useState } from "react";
import PlayersDropdown from "../Dropdowns/PlayersDropdown";
import PlayerDropdown from "../Dropdowns/PlayerDropdown";

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
  const { room, roomId } = useRoom();
  const [playersDropdown, setPlayersDropdown] = useState<boolean>(false);
  const [playerDropdown, setPlayerDropdown] = useState<boolean>(false);

  if (!roomId || !PlayerDetails || !room) return <></>;

  const handleResetGame = async () => {
    await resetGame(roomId, PlayerDetails.nickname);
  };

  const playersClick = () => {
    setPlayersDropdown((prev) => !prev);
  };
  const playerClick = () => {
    setPlayerDropdown((prev) => !prev);
  };

  return (
    <div className="w-full bg-transparent">
      <div className="flex justify-between items-center font-semibold text-[2.3vw] tablet:text-[1vw]">
        <div className="flex 4k:gap-4 gap-1 laptop-l:gap-2 items-center">
          <button
            onClick={playersClick}
            title="Players in Room"
            className="relative flex gap-1 tablet:gap-2 items-center p-2 bg-yellow-400 rounded-full shadow-md"
          >
            <span className="hidden tablet:inline-block">Players</span>{" "}
            <FaUser /> {room?.players?.length}
            {playersDropdown && <PlayersDropdown />}
          </button>
        </div>
        <div className="flex 4k:gap-4 gap-1 laptop-l:gap-2 items-center">
          {room?.creator === PlayerDetails.nickname && (
            <button
              title="Reset Board"
              onClick={handleResetGame}
              className="flex gap-2 items-center p-2 bg-yellow-400 rounded-full shadow-md"
            >
              {" "}
              <IoIosRefresh />{" "}
              <span className="hidden tablet:inline-block">Reset Game</span>
            </button>
          )}
          <button
            title="Game Rules"
            onClick={handleRulesClick}
            className="flex gap-2 items-center p-2 bg-yellow-400 rounded-full shadow-md"
          >
            Rules
          </button>
          <button
            onClick={playerClick}
            title="You Nickname"
            className="relative flex gap-2 items-center p-2 bg-orange-400 rounded-full shadow-md font-semibold"
          >
            {PlayerDetails.nickname}
            {playerDropdown && <PlayerDropdown/>}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopOptionsBar;
