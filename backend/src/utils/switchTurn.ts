import { Card } from "../models/card";
import { Room } from "../models/room";

// Function to switch turn after revealing a card
export const switchTurn = (room: Room, card: Card) => {
  if (room.clue && room.guessedWords >= room.clue.clueNumber + 1) {
    // push the gameLog
    room.gameLog.push({
      log: "Guessing limit reached",
      turn: room.turn,
    });
    room.turn = room.turn === "red" ? "blue" : "red";
    room.clueGiven = false;
    room.clue = null;
    room.guessedWords = 0;
    room.board.forEach((card: Card) => (card.markedBy = undefined));
    return;
  }

  if (card.color === room.turn && card.markedBy) {
    card.markedBy = undefined;
  } else if (card.color !== room.turn) {
    room.board.forEach((card: Card) => {
      if (card.markedBy) card.markedBy = undefined;
    });
    room.turn = room.turn === "red" ? "blue" : "red";
    room.clueGiven = false;
    room.clue = null;
    room.guessedWords = 0;
    if (card.color === "black") {
      room.winner = {
        team: room.turn === "red" ? "blue" : "red",
        way: "assassin",
      };
    }
  }
};
