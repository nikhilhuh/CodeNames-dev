import { rooms } from "./room";

export function generateRoomCode(): string {
  let code: string;
  do {
    code = Math.random().toString(36).substr(2, 6).toUpperCase();
  } while (rooms.has(code));
  return code;
}