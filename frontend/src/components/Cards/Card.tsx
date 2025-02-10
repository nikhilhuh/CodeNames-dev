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

interface CardProps {
  card: wordCard;
  setError: React.Dispatch<React.SetStateAction<string>>;
}

const Card: React.FC<CardProps> = ({ card, setError }) => {
  const { PlayerDetails } = usePlayer();
  const { room, roomId, reset, setReset } = useRoom();

  const [animate, setAnimate] = useState(true);

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
      !room.clueGiven
    )
      return;

    const response = await cardClick(roomId, card.word, PlayerDetails.nickname);
    if (response && !response.success) {
      setError(response.message || "An error occurred");
    }
  };

  const handleCardReveal = async () => {
    if (
      card.revealed ||
      !PlayerDetails.role ||
      !PlayerDetails.team ||
      PlayerDetails.role === "spymaster" ||
      PlayerDetails.team !== room.turn ||
      !room.clueGiven
    )
      return;

    const response = await revealCard(
      roomId,
      card.word,
      PlayerDetails.nickname
    );
    if (response && !response.success) {
      setError(response.message);
    }
  };

  return (
    <div
      key={reset ? "reset-true" : "reset-false"}
      className={`${
        animate ? "animate-card-appear" : ""
      }`}
      onClick={handleCardClick}
      onAnimationEnd={handleAnimationEnd}
    >
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

        <div className="absolute top-[10%] left-[8%] text-[0.3rem] mobile-m:text-[0.4rem] mobile-l:text-[0.5rem] tablet:text-[0.4rem] laptop-sm:text-[0.5rem] laptop-l:text-[0.6rem] 4k:text-[1.5rem] flex flex-wrap gap-1">
          {card.markedBy?.map((marker, index) => (
            <span className="bg-red-600 px-[2px]" key={index}>
              {marker}
            </span>
          ))}
        </div>

        {PlayerDetails.role === "operative" &&
          PlayerDetails.team === room.turn &&
          room.clueGiven &&
          !card.revealed && (
            <div
              onClick={handleCardReveal}
              className="absolute top-[2%] right-[2%] p-1 z-10 bg-yellow-400 rounded-full shadow-lg cursor-pointer"
            >
              <FaRegHandPointer className="text-[2vw]" />
            </div>
          )}

        {!card.revealed && (
          <div
            className={`absolute top-[59%] mobile-m:top-[60%] mobile-l:top-[61%] left-1/2 transform -translate-x-1/2 flex items-center justify-center text-center uppercase
            text-[0.4rem] laptop-sm:text-[0.6rem] laptop-l:text-[0.8rem] 4k:text-[1.4rem] font-bold ${
              card.color === "black" && PlayerDetails?.role === "spymaster"
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
