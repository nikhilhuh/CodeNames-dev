import { Player } from "./player";
import { Card } from "./card";
import { clue } from "./clue";
import { gamelog } from "./gamelog";

export interface Room {
  players: Player[];
  creator: string;
  turn: "red" | "blue";
  board: Card[];
  clueGiven: boolean;
  clue: clue | null;
  gameLog: gamelog[];
  wordsRemaining: {
    red: number;
    blue: number;
  };
  guessedWords: number;
  winner: {
    team: "red" | "blue";
    way: "assassin" | "words";
  } | null;
};
