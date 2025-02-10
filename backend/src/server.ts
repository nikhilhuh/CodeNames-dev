import * as dotenv from "dotenv";
import { setUpSocket } from "./socket/socketHandler";
import { io , server } from "./socket/socketSetUp";

// Load environment variables from the .env file
dotenv.config();

setUpSocket(io);

const PORT = process.env.PORT || 4000;

server.listen(PORT, () => {
  console.log(`Server running on PORT:${PORT}`);
});
