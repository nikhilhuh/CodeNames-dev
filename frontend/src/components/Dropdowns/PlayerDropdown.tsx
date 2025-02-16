import React, { useState } from "react";
import { usePlayer } from "../../context/PlayerContext";
import { changeNickname } from "../../services/api/apiCalls/changeNickname";
import { useRoom } from "../../context/RoomContext";
import ErrorModal from "../Modals/ErrorModal";

const PlayerDropdown: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { PlayerDetails } = usePlayer();
  const { roomId } = useRoom();
  if (!PlayerDetails || !roomId) return <></>;

  const [error, setError] = useState<string>("");
  const [showErrorModal, setShowErrorModal] = useState<boolean>(false);

  const [nickname, setNickname] = useState<string>(PlayerDetails.nickname);

  const handleUpdateNickname = async () => {
    if (nickname.trim() === "") {
      setError("Enter a valid Nickname to update");
      handleErrorModal();
      return;
    }
    try {
      const response = await changeNickname(
        roomId,
        PlayerDetails.nickname,
        nickname
      );
      if (response && !response.success) {
        setError(
          response.message || "Error updating you nickname , please try again"
        );
        handleErrorModal();
      }
    } catch (error) {
      setError("Error updating you nickname , please try again");
    }
    onClose();
  };

  const handleErrorModal = () => {
    setShowErrorModal((prev) => !prev);
  };

  const role =
    PlayerDetails.role === "spymaster" ? "🎩 Spymaster" : "🕵️ Operative";
  const teamColor =
    PlayerDetails.team === "red"
      ? "bg-red-400 text-white"
      : "bg-blue-500 text-white";
  const teamName = PlayerDetails.team === "red" ? "Red 🔴" : "Blue 🔵";

  return (
    <div
      className="absolute top-[110%] right-1 z-50 rounded-xl w-[40vw] tablet:w-[35vw] laptop-sm:w-[25vw] laptop-l:w-[20vw] text-[2.2vw] tablet:text-[1.2vw] laptop-sm:text-[1vw] laptop-l:text-[0.8vw] 4k:text-[1vw]"
      onClick={(e) => e.stopPropagation()}
    >
      {showErrorModal && (
        <ErrorModal onClose={handleErrorModal} error={error} />
      )}
      <div className="bg-gray-100 p-4 4k:p-6 rounded-tr-xl rounded-tl-xl border-b-2 border-b-gray-400 flex flex-col justify-center items-center text-center">
        {!PlayerDetails.role && !PlayerDetails.team ? (
          <div className="text-gray-600">Join a Team!</div>
        ) : (
          <div
            className={`py-2 px-4 rounded-lg ${teamColor} font-semibold shadow-lg flex flex-col gap-2`}
          >
            <span className="font-bold">Role: {role}</span>
            <span className="font-bold">Team: {teamName}</span>
          </div>
        )}
      </div>

      <div className="bg-gray-300 p-4 4k:p-6 rounded-bl-xl rounded-br-xl flex flex-col items-center gap-3">
        <div className="flex flex-col w-full text-center">
          <label htmlFor="nickname" className="font-medium text-gray-700">
            Nickname
          </label>
          <input
            id="nickname"
            name="nickname"
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            className="text-center w-full bg-white outline-none border-2 border-gray-700 mt-1 rounded-full p-2 shadow-sm focus:border-yellow-500"
          />
        </div>
        <button
          onClick={handleUpdateNickname}
          title="Update Nickname"
          className="mt-1 w-full p-2 4k:p-4 bg-yellow-400 rounded-full shadow-md font-semibold hover:bg-yellow-500 transition"
        >
          Update Your Nickname
        </button>
      </div>
    </div>
  );
};

export default PlayerDropdown;
