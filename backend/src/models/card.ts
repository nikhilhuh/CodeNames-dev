export interface Card {
  word: string;
  color: "red" | "blue" | "neutral" | "black";
  revealed: boolean;
  revealedFrontImage: string;
  markedBy?: string[];
}
