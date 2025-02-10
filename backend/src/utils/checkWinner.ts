import { Room } from "../models/room";

// Function to check if the game is won
export const checkWinner = (room: Room) => {
  if (room.wordsRemaining.red === 0) {
    room.winner = { team: "red", way: "words" };
  } else if (room.wordsRemaining.blue === 0) {
    room.winner = { team: "blue", way: "words" };
  }
};
