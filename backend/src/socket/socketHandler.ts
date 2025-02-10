import { Server, Socket } from "socket.io";

const userRooms: Record<string, string> = {}; // Track user-room mapping

function setUpSocket(io: Server): void {
  io.on("connection", (socket: Socket) => {
    const userId = socket.handshake.query.userId as string;

    console.log(`User Connected: ${userId} (Socket ID: ${socket.id})`);

    // If the user was previously in a room, rejoin it
    if (userRooms[userId]) {
      socket.join(userRooms[userId]);
      io.to(userRooms[userId]).emit("room-updated", userRooms[userId]);
    }

    socket.on("create-room", (roomId: string) => {
      userRooms[userId] = roomId;
      socket.join(roomId);
      io.to(roomId).emit("room-updated", roomId);
    });

    socket.on("join-room", (roomId: string) => {
      userRooms[userId] = roomId;
      socket.join(roomId);
      io.to(roomId).emit("room-updated", roomId);
    });

    socket.on("disconnect", () => {
      console.log(`User Disconnected: ${userId} (Socket ID: ${socket.id})`);
      // Keep userRooms[userId] so they rejoin on reconnect
    });
  });
}

export { setUpSocket };
