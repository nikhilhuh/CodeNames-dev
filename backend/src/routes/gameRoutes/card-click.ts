import express, { Request, Response } from "express";
import cors from "cors";
import { io } from "../../socket/socketSetUp";
import { rooms } from "../../utils/room";
const router = express.Router();

router.use(cors({ origin: process.env.FRONTEND_URL, methods: ["POST"] }));

router.post("/card-click", (req: Request, res: Response) => {
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
      .json({ success: false, message: "Spymaster cannot mark cards" });
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

  if (!card.markedBy) {
    card.markedBy = [];
  }

  if (card.markedBy.includes(nickname)) {
    // Remove player if already marked
    card.markedBy = card.markedBy.filter((name) => name !== nickname);
  } else {
    // Add the player to the markedBy array
    card.markedBy.push(nickname);
  }

  io.to(roomId).emit("card-click", roomId);

  res.json({ success: true, message: "Card revealed and turn switched" });
});

export { router };