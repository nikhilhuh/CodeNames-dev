export type Team = "red" | "blue" | null;

export type Player = {
  nickname: string;
  role: "operative" | "spymaster" | null;
  team: Team;
};

export type wordCard = {
  word: string;
  color: "red" | "blue" | "neutral" | "black";
  revealed: boolean;
  revealedFrontImage: string;
  markedBy?: string[];
};

export type clue = {
  clueWord: string;
  clueNumber: number;
};

export type gamelog = {
  nickname?: string;
  log: string;
  clue?: clue;
  word?: string;
  wordColor?: string;
  turn: "red" | "blue";
};

export interface Room {
  players: Player[];
  creator: string;
  turn: "red" | "blue";
  board: wordCard[];
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
}
