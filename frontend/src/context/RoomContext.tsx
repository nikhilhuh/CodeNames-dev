import {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";
import { Room } from "../utils/constants";
import { decryptData } from "../services/encryptAndDecrypt";

interface RoomContextType {
  room: Room | null;
  roomId: string | null;
  reset: boolean;
  setReset: React.Dispatch<React.SetStateAction<boolean>>;
}
const defaultRoomContext: RoomContextType = {
  room: null,
  roomId: null,
  reset: false,
  setReset: () => {},
};

const RoomContext = createContext<RoomContextType>(defaultRoomContext);

// Define a custom hook to use room context
export const useRoom = (): RoomContextType => {
  const context = useContext(RoomContext);
  if (!context) {
    throw new Error("useRoom must be used within a RoomProvider");
  }
  return context;
};

// Create a provider component
interface RoomProviderProps {
  children: ReactNode;
}

export const RoomProvider = ({ children }: RoomProviderProps) => {
  const [room, setRoom] = useState<Room | null>(null);
  const [roomId, setRoomId] = useState<string | null>(null);
  const [reset, setReset] = useState<boolean>(false);

  useEffect(() => {
    const updateFromStorage = () => {
      const storedRoomId = localStorage.getItem("roomId");
      if (storedRoomId) setRoomId(storedRoomId);

      const storedRoomDetails = localStorage.getItem("roomDetails");
      if (storedRoomDetails) {
        try {
          const decryptedRoomDetails = decryptData(storedRoomDetails);
          setRoom(JSON.parse(decryptedRoomDetails));
        } catch (error) {
          console.error("Error parsing stored room details:", error);
          setRoom(null);
        }
      }
    };

    updateFromStorage();
    window.addEventListener("storage", updateFromStorage);

    return () => {
      window.removeEventListener("storage", updateFromStorage);
    };
  }, []);

  return (
    <RoomContext.Provider
      value={{
        room,
        roomId,
        reset,
        setReset,
      }}
    >
      {children}
    </RoomContext.Provider>
  );
};
