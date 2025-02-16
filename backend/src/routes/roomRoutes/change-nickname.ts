import express, { Request, Response } from "express";
import cors from "cors";
import { Player } from "../../models/player";
import { io } from "../../socket/socketSetUp";
import { rooms } from "../../utils/room";

const router = express.Router();
router.use(cors({ origin: process.env.FRONTEND_URL, methods: ["PATCH"] }));

router.patch("/change-nickname", (req: Request, res: Response) => {
  const { roomId, oldnickname, newnickname } = req.body;
  const room = rooms.get(roomId);
  if (!room) {
    res.status(404).json({ success: false, message: "Room not found" });
    return;
  }
  const player = room.players.find(
    (player: Player) => player.nickname === oldnickname
  );
  if (!player) {
    res
      .status(404)
      .json({ success: false, message: "Player not found in the room" });
    return;
  }

  if (newnickname) {
    const playerExists = room.players.find(
      (player: Player) => player.nickname === newnickname
    );
    if (playerExists) {
      res
        .status(403)
        .json({
          success: false,
          message: "Player with same name already exists in the room",
        });
      return;
    } else player.nickname = newnickname;
  }

  io.to(roomId).emit("room-updated", roomId);

  res.json({ success: true, message: "Player's Nickname updated successfully" });
});

export { router };
