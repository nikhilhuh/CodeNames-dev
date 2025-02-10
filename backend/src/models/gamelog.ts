import { clue } from "./clue";

export type gamelog = {
  nickname?: string;
  log: string;
  clue?: clue;
  word?: string;
  wordColor?: string;
  turn: "red" | "blue";
};
