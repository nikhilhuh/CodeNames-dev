import express, { Request, Response } from "express";
import { generateBoard } from "../../utils/generateBoard";
import cors from "cors";
import { generateRoomCode } from "../../utils/generateRoomcode";
import { rooms } from "../../utils/room";
const router = express.Router();

router.use(cors({ origin: process.env.FRONTEND_URL, methods: ["POST"] }));

router.post("/create-room", (req: Request, res: Response) => {
  const { nickname } = req.body;

  if (!nickname) {
    res
      .status(400)
      .json({ success: false, message: "Player name is required" });
    return;
  }

  const roomId = generateRoomCode();
  rooms.set(roomId, {
    players: [{ nickname: nickname, role: null, team: null }],
    creator: nickname,
    board: generateBoard(),
    turn: "red",
    clueGiven: false,
    clue: null,
    gameLog: [],
    wordsRemaining: {
      red: 9,
      blue: 8
    },
    guessedWords: 0,
    winner: null
  });

  res.json({ succes: true, roomId });
});

export { router };
