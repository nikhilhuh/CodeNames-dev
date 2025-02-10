import express, { Request, Response } from "express";
import cors from "cors";
import { io } from "../../socket/socketSetUp";
import { rooms } from "../../utils/room";
const router = express.Router();

router.use(cors({ origin: process.env.FRONTEND_URL, methods: ["POST"] }));

router.post("/give-clue", (req: Request, res: Response) => {
  const { roomId, nickname , clueWord, clueNumber } = req.body;

  if (!roomId || !nickname || !clueWord || clueNumber == null) {
    res
      .status(400)
      .json({ success: false, message: "All fields are required" });
    return;
  }

  const room = rooms.get(roomId);
  if (!room) {
    res.status(404).json({ success: false, message: "Room not found" });
    return;
  }

  const player = room.players.find((p) => p.nickname === nickname);
  if (!player || player.role !== "spymaster" || player.team !== room.turn) {
    res
      .status(403)
      .json({
        success: false,
        message: "Only the spymaster of the current turn can give clues",
      });
    return;
  }

  room.clueGiven = true;
  room.clue = {
    clueWord: clueWord,
    clueNumber: clueNumber
  }
  room.gameLog.push({
    nickname: nickname ,
    log: "gives clue",
    clue: {
      clueWord: clueWord,
      clueNumber: clueNumber
    },
    turn: room.turn,
   });

  io.to(roomId).emit("clue-given", roomId);
  res.json({ success: true, message: "Clue given" });
});

export { router };