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
        className="text-center font-mono font-semibold px-[1.2vw] py-[1vw] tablet:px-[0.4vw] tablet:py-[0.3vw] text-[2.5vw] tablet:text-[1.2vw]  bg-yellow-400 rounded-full shadow-md"
      >
        End Guessing
      </button>
    </>
  );
};

export default EndGuessingButton;
