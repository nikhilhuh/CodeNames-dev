import { Card } from "../models/card";
import { Room } from "../models/room";

export const wordsRemaining = (room: Room, card: Card) => {
  if (card.color === "red") room.wordsRemaining.red -= 1;
  else if (card.color === "blue") room.wordsRemaining.blue -= 1;
};
