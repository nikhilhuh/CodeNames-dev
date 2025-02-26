import React, { useState } from "react";
import { endGuessing } from "../../services/api/apiCalls/endGuessing";
import { usePlayer } from "../../context/PlayerContext";
import { useRoom } from "../../context/RoomContext";
import ErrorModal from "../Modals/ErrorModal";

const EndGuessingButton: React.FC = () => {
  const { PlayerDetails } = usePlayer();
  const { roomId } = useRoom();

  const [error, setError] = useState<string>("");
  const [showErrorModal, setShowErrorModal] = useState<boolean>(false);

  const handleErrorModal = () => {
    setShowErrorModal((prev) => !prev);
  };

  if (!roomId || !PlayerDetails) return <></>;

  const handleEndGuessing = async () => {
    try {
      const response = await endGuessing(roomId, PlayerDetails.nickname);
      if (response && !response.success) {
        setError(response.message || "An error ocuured while ending guesses");
        handleErrorModal();
      }
    } catch (error) {
      setError("An error ocuured while ending guesses");
      handleErrorModal();
    }
  };
  
  return (
    <>
      {showErrorModal && (
        <ErrorModal onClose={handleErrorModal} error={error} />
      )}
      <button
        onClick={handleEndGuessing}
        title="End Guessing"
        className="flex font-semibold text-[2.5vw] mobile-m:text-[2vw] tablet:text-[1vw] laptop-l:text-[0.8vw] gap-[1vw] tablet:gap-[0.5vw] items-center px-[2.5vw] py-[1vw] tablet:px-[1vw] tablet:py-[0.6vw] laptop-sm:py-[0.5vw] bg-yellow-400 rounded-full shadow-xl hover:bg-yellow-500 hover:scale-105 transition"
      >
        End Guessing
      </button>
    </>
  );
};

export default EndGuessingButton;
