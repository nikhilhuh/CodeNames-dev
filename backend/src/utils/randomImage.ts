import { RedFront } from "../revealedCardImages/RedRevealedFront";
import { BlueFront } from "../revealedCardImages/BlueRevealedFront";
import { NeutralFront } from "../revealedCardImages/NeutralRevealedFront";

export function getRandomRevaledFrontImage(color: string): string {
  if (color === "red") {
    return RedFront[Math.floor(Math.random() * RedFront.length)];
  } else if (color === "blue") {
    return BlueFront[Math.floor(Math.random() * BlueFront.length)];
  } else if (color === "neutral") {
    return NeutralFront[Math.floor(Math.random() * NeutralFront.length)];
  }
  return "BlackImg";
}
