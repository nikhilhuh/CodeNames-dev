import { useEffect, useState } from "react";
import { socketListeners } from "../services/socketListeners";
import TopOptionsBar from "../components/Layout/TopOptionsBar";
import HeadingArea from "../components/Layout/HeadingArea";
import RedTeam from "../components/Layout/Teams/RedTeam";
import Developer from "../components/Layout/Developer";
import CardGrid from "../components/Cards/CardGrid";
import ClueArea from "../components/Layout/ClueArea";
import BlueTeam from "../components/Layout/Teams/BlueTeam";
import GameLog from "../components/Layout/GameLog";
import RulesModal from "../components/Modals/RulesModal";
import InfoModal from "../components/Modals/InfoModal";
import socket from "../services/socketSetup";
import ErrorModal from "../components/Modals/ErrorModal";
import WinnerInfo from "../components/Winner/WinnerInfo";
import { useRoom } from "../context/RoomContext";

const MainGamePage = () => {
  const { setReset, room } = useRoom();
  const [showRulesModal, setShowRulesModal] = useState<boolean>(false);
  const [showInfoModal, setShowInfoModal] = useState<boolean>(false);
  const [showErrorModal, setShowErrorModal] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [info, setInfo] = useState<string>("");

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

  const handleRulesClick = () => {
    setShowRulesModal((prev) => !prev);
  };
  const handleInfoClose = () => {
    setShowInfoModal(false);
  };
  const handleErrorClose = () => {
    setShowErrorModal(false);
  };
  return (
    <>
      {showErrorModal && (
        <ErrorModal onClose={handleErrorClose} error={error} />
      )}
      {showRulesModal && <RulesModal onClose={handleRulesClick} />}
      {showInfoModal && <InfoModal onClose={handleInfoClose} info={info} />}
      <div className="h-screen max-h-screen overflow-hidden flex flex-col relative p-1 laptop-l:p-2 4k:p-4">
        {/* Top Options Bar */}
        <div>
          <TopOptionsBar
            handleRulesClick={handleRulesClick}
            setShowInfoModal={setShowInfoModal}
            setInfo={setInfo}
          />
        </div>

        {/* Heading */}
        <div className="4k:mt-2 4k:mb-2 mt-1 mb-0">
          <HeadingArea />
        </div>

        {/* Desktop Layout */}
        <div className="hidden tablet:grid grid-cols-[1fr_3fr_1fr] gap-2 laptop-l:gap-3 4k:gap-4 p-1">
          {/* Left Column */}
          <div className="flex flex-col tablet:gap-6 4k:gap-10">
            <RedTeam />
            <Developer />
          </div>

          {/* Center Column (Takes most width) */}
          <div className="w-full flex flex-col  tablet:gap-2 laptop-sm:gap-4 4k:gap-8">            
            <CardGrid setError={setError} />
            {room?.winner ? <WinnerInfo /> : <ClueArea />}
          </div>

          {/* Right Column */}
          <div className="flex flex-col tablet:gap-6 4k:gap-10">
            <BlueTeam />
            <GameLog />
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="tablet:hidden flex flex-col">
          {/* Main Game Area */}
          <div className="p-1 flex flex-col gap-2 flex-1">
            <CardGrid setError={setError} />
            <div className="flex justify-center">
              {room?.winner ? <WinnerInfo /> : <ClueArea />}
            </div>
          </div>

          {/* Bottom Section: Teams & Game Log */}
          <div className="grid grid-cols-3 h-[52vh] mobile-m:h-[48vh] mobile-l:h-[41vh] mobile-tablet:h-[32vh] w-full absolute bottom-0 left-0 bg-white">
            <RedTeam />
            <GameLog />
            <BlueTeam />
          </div>
        </div>
      </div>
    </>
  );
};

export default MainGamePage;
