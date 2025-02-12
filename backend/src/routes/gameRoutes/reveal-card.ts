import express, { Request, Response } from "express";
import cors from "cors";
import { io } from "../../socket/socketSetUp";
import { rooms } from "../../utils/room";
import { switchTurn } from "../../utils/switchTurn";
import { checkWinner } from "../../utils/checkWinner";
import { wordsRemaining } from "../../utils/wordsRemaining";
const router = express.Router();

router.use(cors({ origin: process.env.FRONTEND_URL, methods: ["POST"] }));

router.post("/reveal-card", (req: Request, res: Response) => {
  const { roomId, word, nickname } = req.body;

  if (!roomId || !nickname || !word) {
    res.status(400).json({
      success: false,
      message: "RoomId, word, and Player nickname are required",
    });
    return;
  }

  const room = rooms.get(roomId);
  if (!room) {
    res.status(404).json({ success: false, message: "Room not found" });
    return;
  }

  const player = room.players.find((p) => p.nickname === nickname);
  if (!player) {
    res.status(400).json({ success: false, message: "Player not found" });
    return;
  }

  if (player.role === "spymaster") {
    res
      .status(403)
      .json({ success: false, message: "Spymaster cannot reveal cards" });
    return;
  }

  if (!room.clueGiven) {
    res
      .status(403)
      .json({ success: false, message: "Wait for spymaster's clue" });
    return;
  }

  if (player.team !== room.turn) {
    res.status(403).json({ success: false, message: "Not your team's turn" });
    return;
  }

  const card = room.board.find((c) => c.word === word);
  if (!card || card.revealed) {
    res.status(400).json({ success: false, message: "Invalid word selection" });
    return;
  }

  // Reveal the card
  card.revealed = true;
  // increase the number of guesses for the round
  room.guessedWords += 1;

  // push the gameLog
  room.gameLog.push({
    nickname: nickname,
    log: "taps",
    turn: room.turn,
    word: card.word,
    wordColor: card.color,
  });

  // Decrease the words count if card is red or blue
  wordsRemaining(room, card);

  // winning condition check
  checkWinner(room , card);
  // Handle turn switching logic
  switchTurn(room, card);

  io.to(roomId).emit("reveal-card", roomId);

  // if there is any winner emit game-over
  if (room.winner) {
    room.gameLog.push({
      log: `${room.winner.team === "red"? "Red" : "Blue"} Team Wins`,
      turn: room.winner.team,
    });
    io.to(roomId).emit("game-over", roomId);
    res.json({ success: true, message: "Game Over" });
    return;
  }

  res.json({ success: true, message: "Card revealed and turn switched" });
});

export { router };
