import { io, Socket } from "socket.io-client";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "";

// Generate or retrieve user ID
function getUserId(): string {
  let userId = sessionStorage.getItem("userId");
  if (!userId) {
    userId = Math.random().toString(36).substr(2, 9);
    sessionStorage.setItem("userId", userId);
  }
  return userId;
}

const socket: Socket = io(BACKEND_URL, {
  autoConnect: true,
  reconnection: true,
  reconnectionAttempts: Infinity,
  reconnectionDelay: 2000,
  query: { userId: getUserId() },
});

export default socket;
