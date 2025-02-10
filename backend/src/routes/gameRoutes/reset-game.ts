import express, { Request, Response } from "express";
import { generateBoard } from "../../utils/generateBoard";
import cors from "cors";
import { io } from "../../socket/socketSetUp";
import { rooms } from "../../utils/room";
const router = express.Router();

router.use(cors({ origin: process.env.FRONTEND_URL, methods: ["POST"] }));

router.post("/reset-game", (req: Request, res: Response) => {
  const { roomId, nickname } = req.body;

  if (!roomId || !nickname) {
    res
      .status(400)
      .json({
        success: false,
        message: "RoomId and Player nickname is required",
      });
    return;
  }

  const room = rooms.get(roomId);

  if (!room) {
    res.status(404).json({ success: false, message: "Room not found" });
    return;
  }

  if (room.creator !== nickname) {
    res
      .status(403)
      .json({ success: false, message: "Only the creator can reset the game" });
    return;
  }

  room.board = generateBoard();
  room.turn = "red";
  room.clueGiven = false;
  room.winner = null;
  room.wordsRemaining.red = 9;
  room.wordsRemaining.blue = 8;
  room.players.forEach((p) => {
    p.role = null;
    p.team = null;
  });
  room.gameLog = [];

  io.to(roomId).emit("reset-game", roomId);

  res.json({ succes: true, message: "Game reset successfully" });
});

export { router };