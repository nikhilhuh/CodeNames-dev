import React, { useState } from "react";
import ErrorModal from "../Modals/ErrorModal";
import { createRoom } from "../../services/api/apiCalls/createRoom";
import { useNavigate } from "react-router-dom";

const CreateRoom: React.FC<{ nickname: string }> = ({ nickname }) => {
  const navigate = useNavigate();
  const [showErrorModal, setShowErrorModal] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleErrorModal = () => {
    setShowErrorModal((prev) => !prev);
  };

  const handleCreateRoom = async () => {
    if (nickname.trim() === "") {
      setError("Enter your Nickname to continue");
      handleErrorModal();
      return;
    }
    try {
      const response = await createRoom(nickname);
      if (response && response.success && "roomId" in response) {
        const newRoomId = response.roomId;
        navigate(`/games/${newRoomId}`);
      } else {
        setError(response?.message || "Error creating room , please try again");
        handleErrorModal();
      }
    } catch (error) {
      setError("Error creating room , please try again");
      handleErrorModal();
    }
  };

  return (
    <div className="border-b-2 tablet:border-r-2 tablet:border-b-0 border-black px-4 py-2">
      {showErrorModal && (
        <ErrorModal onClose={handleErrorModal} error={error} />
      )}
      <button
        onClick={handleCreateRoom}
        className="p-4 bg-green-600 text-[3vw] tablet:text-[2.5vw] laptop-l:text-[2vw] font-semibold font-serif rounded-xl hover:bg-green-700"
      >
        Create Room
      </button>
    </div>
  );
};

export default CreateRoom;
