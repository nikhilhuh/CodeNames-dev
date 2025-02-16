import {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";
import { Player } from "../utils/constants";
import { useRoom } from "./RoomContext";

interface PlayerContextType {
  PlayerDetails: Player | null;
}

const defaultPlayerContext: PlayerContextType = {
  PlayerDetails: null,
};

const PlayerContext = createContext<PlayerContextType>(defaultPlayerContext);

// Define a custom hook to use player context
export const usePlayer = (): PlayerContextType => {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error("usePlayers must be used within a PlayerProvider");
  }
  return context;
};

// Create a provider component
interface PlayerProviderProps {
  children: ReactNode;
}

export const PlayerProvider = ({ children }: PlayerProviderProps) => {
  const [, setNickname] = useState<string | null>(null);
  const [PlayerDetails, setPlayerDetails] = useState<Player | null>(null);
  const { room } = useRoom();

  useEffect(() => {
    const updateFromStorage = () => {
      const storedNickname = localStorage.getItem("nickname");
      if (storedNickname) setNickname(storedNickname);

      const player = room?.players.find((player)=> player.nickname === storedNickname)
      setPlayerDetails(player || null);
    };

    updateFromStorage();
    window.addEventListener("storage", updateFromStorage);

    return () => {
      window.removeEventListener("storage", updateFromStorage);
    };
  }, [room]);

  return (
    <PlayerContext.Provider
      value={{
        PlayerDetails
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};
