import { useEffect } from "react";
import { socketListeners } from "../services/socketListeners";
import socket from "../services/socketSetup";
import { useRoom } from "../context/RoomContext";
import TabletGameScene from "../components/Layout/ResponsiveGameScene/TabletGameScene";
import MobileGameScene from "../components/Layout/ResponsiveGameScene/MobileGameScene";
import GridLoader from "../components/Loaders/GridLoader";

const MainGamePage = () => {
  const { setReset, room, isLoading, setisLoading } = useRoom();

  useEffect(() => {
    if (room) {
      setisLoading(false);
    }
  }, [room]);

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
      {isLoading ? (
        <GridLoader />
      ) : (
        <div className="h-full">
          <div className="hidden tablet:block h-full">
            <TabletGameScene />
          </div>
          <div className="tablet:hidden h-full">
            <MobileGameScene />
          </div>
        </div>
      )}
    </>
  );
};

export default MainGamePage;
