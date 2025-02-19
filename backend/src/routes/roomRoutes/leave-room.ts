import express, { Request, Response } from "express";
import cors from "cors";
import { Player } from "../../models/player";
import { io } from "../../socket/socketSetUp";
import { rooms } from "../../utils/room";

const router = express.Router();
router.use(cors({ origin: process.env.FRONTEND_URL, methods: ["PATCH"] }));

router.patch("/leave-room", (req: Request, res: Response) => {
  const { roomId, nickname } = req.body;
  const room = rooms.get(roomId);
  if (!room) {
    res.status(404).json({ success: false, message: "Room not found" });
    return;
  }

  const playerIndex = room.players.findIndex(
    (player: Player) => player.nickname === nickname
  );
  if (playerIndex === -1) {
    res.status(404).json({ success: false, message: "Player not found in the room" });
    return;
  }

  const isCreator = room.creator === nickname;
  room.players.splice(playerIndex, 1); // Remove the player from the room

  // If the leaving player is the creator, assign a new creator randomly
  if (isCreator && room.players.length > 0) {
    const newCreator = room.players[Math.floor(Math.random() * room.players.length)].nickname;
    room.creator = newCreator;
  }

  io.to(roomId).emit("room-updated", roomId);

  res.json({
    success: true,
    message: "Player left room successfully"
  });
});

export { router };
