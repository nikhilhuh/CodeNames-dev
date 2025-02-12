import React from "react";
import Card from "./Card";
import { wordCard } from "../../utils/constants";
import { useRoom } from "../../context/RoomContext";

interface CardGridProps {
  setError: React.Dispatch<React.SetStateAction<string>>;
}

const CardGrid: React.FC<CardGridProps> = ({ setError}) => {
  const { room } = useRoom();

  if (!room) return <></>;

  return (
    <div className="grid grid-cols-5 gap-[1px]">
      {room.board.map((card: wordCard, index: number) => (
        <Card key={`${index}`} card={card} setError={setError}/>
      ))}
    </div>
  );
};

export default CardGrid;
