import React, { useEffect, useState } from "react";
import BlackImg from "../../assets/images/cards/black-back.png";
import Neutral from "./CardImages/Revealed/Neutral";
import Blue from "./CardImages/Revealed/Blue";
import Red from "./CardImages/Revealed/Red";
import NonRevealed from "./CardImages/NonRevealed";
import { usePlayer } from "../../context/PlayerContext";
import { wordCard } from "../../utils/constants";
import { cardClick } from "../../services/api/apiCalls/cardClick";
import { revealCard } from "../../services/api/apiCalls/revealCard";
import { FaRegHandPointer } from "react-icons/fa";
import { useRoom } from "../../context/RoomContext";
import ErrorModal from "../Modals/ErrorModal";

const Card: React.FC<{ card: wordCard }> = ({ card }) => {
  const { PlayerDetails } = usePlayer();
  const { room, roomId, reset, setReset } = useRoom();

  const [animate, setAnimate] = useState(true);
  const [error, setError] = useState<string>("");
  const [showErrorModal, setShowErrorModal] = useState<boolean>(false);

  useEffect(() => {
    if (reset) {
      setAnimate(true);
    }
  }, [reset]);

  if (!PlayerDetails || !room || !roomId || !card) return <></>;

  const handleAnimationEnd = () => {
    setAnimate(false);
    setReset(false);
  };

  const handleCardClick = async () => {
    if (
      card.revealed ||
      !PlayerDetails.role ||
      !PlayerDetails.team ||
      PlayerDetails.role === "spymaster" ||
      PlayerDetails.team !== room.turn ||
      !room.clueGiven ||
      room.winner !== null
    )
      return;

    try {
      const response = await cardClick(
        roomId,
        card.word,
        PlayerDetails.nickname
      );
      if (response && !response.success) {
        setError(response.message || "An error occured while marking the card");
        handleErrorModal();
      }
    } catch (error) {
      setError("An error occured while marking the card");
      handleErrorModal();
    }
  };

  const handleCardReveal = async (event: React.MouseEvent) => {
    event.stopPropagation();
    if (
      card.revealed ||
      !PlayerDetails.role ||
      !PlayerDetails.team ||
      PlayerDetails.role === "spymaster" ||
      PlayerDetails.team !== room.turn ||
      !room.clueGiven ||
      room.winner !== null
    )
      return;

    try {
      const response = await revealCard(
        roomId,
        card.word,
        PlayerDetails.nickname
      );
      if (response && !response.success) {
        setError(
          response.message || "An error ocuured while revealing the card"
        );
        handleErrorModal();
      }
    } catch (error) {
      setError("An error ocuured while revealing the card");
      handleErrorModal();
    }
  };

  const handleErrorModal = () => {
    setShowErrorModal((prev) => !prev);
  };

  return (
    <div
      key={reset ? "reset-true" : "reset-false"}
      className={`${animate ? "animate-card-appear" : ""}`}
      onClick={handleCardClick}
      onAnimationEnd={handleAnimationEnd}
    >
      {showErrorModal && (
        <ErrorModal onClose={handleErrorModal} error={error} />
      )}
      <div className="relative aspect-[17/11] overflow-hidden cursor-pointer">
        {card.revealed ? (
          card.color === "black" ? (
            <img
              src={BlackImg}
              alt="Black card"
              className="rounded-lg object-contain h-full w-full"
            />
          ) : card.color === "blue" ? (
            <Blue card={card} />
          ) : card.color === "red" ? (
            <Red card={card} />
          ) : (
            <Neutral card={card} />
          )
        ) : (
          <NonRevealed card={card} />
        )}

        <div className="absolute top-[8%] left-[7%] text-[1.5vw] mobile-m:text-[0.4rem] mobile-l:text-[0.5rem] tablet:text-[0.4rem] laptop-sm:text-[0.5rem] laptop-l:text-[0.7rem] 4k:text-[1.5rem] flex flex-wrap gap-y-[0.2vw] gap-x-[0.5vw] laptop-sm:gap-[0.3vw] max-w-[80%] z-30">
          {card.markedBy?.map((marker, index) => (
            <span className="bg-red-600 px-[2px]" key={index}>
              {marker}
            </span>
          ))}
        </div>

        {PlayerDetails.role === "operative" &&
          PlayerDetails.team === room.turn &&
          room.clueGiven &&
          !card.revealed &&
          room.winner === null && (
            <div
              onClick={(event) => handleCardReveal(event)}
              title="Reveal Card"
              className="absolute top-[2%] right-[2%] p-1 z-30 bg-yellow-400 rounded-full shadow-lg cursor-pointer hover:scale-105"
            >
              <FaRegHandPointer className="text-[3vw] mobile-l:text-[2.5vw] tablet:text-[1.5vw]" />
            </div>
          )}

        {!card.revealed && (
          <div
            className={`absolute top-[59%] mobile-m:top-[60%] mobile-l:top-[60%] left-1/2 transform -translate-x-1/2 flex items-center justify-center text-center uppercase
            text-[2vw] tablet:text-[1vw] font-bold ${
              card.color === "black" &&
              (PlayerDetails?.role === "spymaster" || room.winner)
                ? "text-white"
                : "text-black"
            }`}
          >
            {card.word}
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;
