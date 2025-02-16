import { useEffect } from "react";
import { socketListeners } from "../services/socketListeners";
import socket from "../services/socketSetup";
import { useRoom } from "../context/RoomContext";
import TabletGameScene from "../components/Layout/ResponsiveGameScene/TabletGameScene";
import MobileGameScene from "../components/Layout/ResponsiveGameScene/MobileGameScene";

const MainGamePage = () => {
  const { setReset } = useRoom();

  useEffect(() => {
    socketListeners(socket, setReset);
    return () => {
      socket.off("room-updated");
      socket.off("clue-given");
      socket.off("card-click");
      socket.off("reveal-card");
      socket.off("end-guessing");
      socket.off("game-over");
      socket.off("reset-game");
    };
  }, []);

  return (
    <>
      <div className="hidden tablet:block">
        <TabletGameScene />
      </div>
      <div className="tablet:hidden">
        <MobileGameScene />
      </div>
    </>
  );
};

export default MainGamePage;
