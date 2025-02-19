import React, { useState } from "react";
import { usePlayer } from "../../../context/PlayerContext";
import { useRoom } from "../../../context/RoomContext";
import { changeNickname } from "../../../services/api/apiCalls/changeNickname";

const UpdateNickname: React.FC<{
  setError: React.Dispatch<React.SetStateAction<string>>;
  onClose: () => void;
}> = ({ setError, onClose }) => {
  const { PlayerDetails } = usePlayer();
  const { roomId } = useRoom();
  if (!PlayerDetails || !roomId) return <></>;
  const [nickname, setNickname] = useState<string>(PlayerDetails.nickname);

  const handleUpdateNickname = async () => {
    if (nickname.trim() === "") {
      setError("Enter a valid Nickname to update");
      return;
    } else if (nickname.trim() === PlayerDetails.nickname) {
      setError("New nickname is same as old");
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
      }
    } catch (error) {
      setError("Error updating you nickname , please try again");
    } finally {
      onClose();
    }
  };
  return (
    <>
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
        className="w-full p-2 4k:p-4 bg-yellow-400 rounded-full shadow-md font-semibold hover:bg-yellow-500 transition"
      >
        Update Your Nickname
      </button>
    </>
  );
};

export default UpdateNickname;
