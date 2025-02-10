import express, { Request, Response } from "express";
import cors from "cors";
import { Player } from "../../models/player";
import { io } from "../../socket/socketSetUp";
import { rooms } from "../../utils/room";

const router = express.Router();
router.use(cors({ origin: process.env.FRONTEND_URL, methods: ["PATCH"] }));

router.patch("/update-player", (req: Request, res: Response) => {
  const { roomId, nickname, role, team } = req.body;
  const room = rooms.get(roomId);
  if (!room) {
    res.status(404).json({ success: false, message: "Room not found" });
    return;
  }
  const player = room.players.find(
    (player: Player) => player.nickname === nickname
  );
  if (!player) {
    res
      .status(404)
      .json({ success: false, message: "Player not found in the room" });
    return;
  }
  // Update player's information
  if (role && team) {
    // Check if the role is already taken for the team
    const teamPlayers = room.players.filter(
      (player: Player) => player.team === team
    );

    // Check for spymaster count for the team
    if (role === "spymaster" && teamPlayers.filter((player: Player) => player.role === "spymaster").length >= 1) {
      res.status(500).json({ success: false, message: "Only one spymaster allowed per team" });
      return;
    }

    // Update player's information
    player.role = role;
    player.team = team;
  }
  io.to(roomId).emit("room-updated", roomId);

  res.json({ success: true, message: "Player updated successfully"});
});

export { router };
