import { Card } from "../models/card";
import { generateRoomCode } from "./generateRoomcode";
import { getRandomRevaledFrontImage } from "./randomImage";
import { getRandomWords } from "./randomWords";

export function generateBoard(): Card[] {
  const selectedWords = getRandomWords(25);
  const shuffledRoles: ("red" | "blue" | "neutral" | "black")[] = [
    ...Array(9).fill("red"),
    ...Array(8).fill("blue"),
    ...Array(7).fill("neutral"),
    "black",
  ].sort(() => Math.random() - 0.5);

  return selectedWords.map((word, index) => {
    const color = shuffledRoles[index];
    return {
      word,
      color,
      revealed: false,
      revealedFrontImage: getRandomRevaledFrontImage(color),
    };
  });
}
