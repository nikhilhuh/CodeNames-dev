import express from "express";
import cors from "cors";
import { mainRouter } from "./routes/mainRouter";

const app = express();

app.use(cors({origin: "*" , methods: ["GET","POST","PATCH"]}));
app.use(express.json());
app.use('/', mainRouter);

export { app };