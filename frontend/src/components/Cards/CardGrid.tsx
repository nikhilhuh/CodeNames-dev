import React from "react";
import Card from "./Card";
import { wordCard } from "../../utils/constants";
import { useRoom } from "../../context/RoomContext";

const CardGrid: React.FC = () => {
  const { room } = useRoom();

  if (!room) return <></>;

  return (
    <div className="grid grid-cols-5 gap-[2px] w-full h-full">
      {room.board.map((card: wordCard, index: number) => (
        <Card key={`${index}`} card={card} />
      ))}
    </div>
  );
};

export default CardGrid;
