import { ReactNode } from "react";
import { RoomProvider } from "./RoomContext";
import { PlayerProvider } from "./PlayerContext";

// Create an AppProvider that wraps RoomProvider and PlayerProvider
interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <RoomProvider>
      <PlayerProvider>{children}</PlayerProvider>
    </RoomProvider>
  );
};
