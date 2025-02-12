import React from "react";
import { usePlayer } from "../../../context/PlayerContext";
import { wordCard } from "../../../utils/constants";
import NeutralImgBack from "../../../assets/images/cards/neutral-card.png";
import BlueImgBack from "../../../assets/images/cards/blue-card.png";
import RedImgBack from "../../../assets/images/cards/red-card.png";
import BlackImgBack from "../../../assets/images/cards/black-card.png";
import { useRoom } from "../../../context/RoomContext";

const NonRevealed: React.FC<{ card: wordCard }> = ({ card }) => {
  const { PlayerDetails } = usePlayer();
  const { room } = useRoom();

  const nonRevealedImage = () => {
    if (PlayerDetails?.role === "spymaster" || room?.winner) {
      if (card.color === "red") return RedImgBack;
      if (card.color === "blue") return BlueImgBack;
      if (card.color === "black") return BlackImgBack;
    }
    return NeutralImgBack;
  };

  return (
    <img
      src={nonRevealedImage()}
      alt="Card background"
      className="absolute h-full w-full object-contain"
    />
  );
};

export default NonRevealed;
