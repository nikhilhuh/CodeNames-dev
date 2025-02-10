import {router as createRoomRouter} from "./roomRoutes/create-room";
import {router as joinRoomRouter} from "./roomRoutes/join-room";
import {router as getRoomDetailsRouter} from "./roomRoutes/room-details";
import {router as updatePlayerRouter} from "./roomRoutes/update-player";
import {router as cardRevealedRouter} from "./gameRoutes/reveal-card";
import {router as resetGameRouter} from "./gameRoutes/reset-game";
import {router as giveClueRouter} from "./gameRoutes/give-clue";
import {router as endGuessingRouter} from "./gameRoutes/end-guessing";
import {router as cardClickRouter} from "./gameRoutes/card-click";
import express from "express";

const mainRouter = express.Router();

// Middleware to log requests
mainRouter.use("/", createRoomRouter);
mainRouter.use("/", joinRoomRouter);
mainRouter.use("/", getRoomDetailsRouter);
mainRouter.use("/", updatePlayerRouter);
mainRouter.use("/", cardClickRouter);
mainRouter.use("/", cardRevealedRouter);
mainRouter.use("/", resetGameRouter);
mainRouter.use("/", giveClueRouter);
mainRouter.use("/", endGuessingRouter);

export { mainRouter };