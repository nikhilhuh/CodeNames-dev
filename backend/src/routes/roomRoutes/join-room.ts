import express, { Request, Response } from "express";
import cors from "cors";
import { rooms } from "../../utils/room";

const router = express.Router();

router.use(cors({ origin: process.env.FRONTEND_URL, methods: ["POST"] }));

router.post("/join-room", (req: Request, res: Response) => {
  const { roomId, nickname } = req.body;

  if (!roomId || !nickname) {
    res.status(400).json({
      success: false,
      message: "Room ID and player name are required",
    });
    return;
  }

  const room = rooms.get(roomId);
  
  if (!room) {
    res.status(404).json({ success: false, message: "Room not found" });
    return;
  }

  const playerExists = room.players.some((p) => p.nickname === nickname);
  if (playerExists) {
    res.status(400).json({ success: false, message: "Player already in the room" });
    return;
  }

  if (room.players.length >= 8) {
    res.status(400).json({ success: false, message: "Room is full" });
    return;
  }

  // Add the player to the room with default role and team
  room.players.push({ nickname: nickname, role: null, team: null });

  res.json({ success: true, message: "Player added successfully" });
});

export { router };
