import express, { Request, Response } from "express";
import cors from "cors";
import { io } from "../../socket/socketSetUp";
import { rooms } from "../../utils/room";
import { Card } from "../../models/card";
const router = express.Router();

router.use(cors({ origin: process.env.FRONTEND_URL, methods: ["POST"] }));

router.post("/end-guessing", (req: Request, res: Response) => {
  const { roomId, nickname } = req.body;

  if (!roomId || !nickname) {
    res.status(400).json({
      success: false,
      message: "RoomId and Player nickname are required",
    });
    return;
  }

  const room = rooms.get(roomId);
  if (!room) {
    res.status(404).json({ success: false, message: "Room not found" });
    return;
  }

  if (room.winner) {
    res.status(403).json({ success: false, message: "Game is already over" });
    return;
  }

  const player = room.players.find((p) => p.nickname === nickname);
  if (!player) {
    res.status(400).json({ success: false, message: "Player not found" });
    return;
  }

  if (player.role === "spymaster" || player.team !== room.turn) {
    res
      .status(403)
      .json({
        success: false,
        message: "Only operatives of the turn team can end guessing",
      });
    return;
  }

  if (!room.clueGiven) {
    res
      .status(403)
      .json({ success: false, message: "Wait for spymaster's clue" });
    return;
  }

  room.gameLog.push({
    nickname: nickname,
    log: "ends Guessing",
    turn: room.turn,
  });
  room.turn = room.turn === "red" ? "blue" : "red";
  room.clueGiven = false;
  room.clue = null;
  room.guessedWords = 0;
  room.board.forEach((card: Card) => (card.markedBy = undefined));

  io.to(roomId).emit("end-guessing", roomId);

  res.json({ success: true, message: "Guessing ended" });
});

export { router };
