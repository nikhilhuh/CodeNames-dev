import React from "react";
import RedTeam from "../Teams/RedTeam";
import GameLog from "../GameLog";
import BlueTeam from "../Teams/BlueTeam";
import WinnerInfo from "../../Winner/WinnerInfo";
import ClueArea from "../ClueArea";
import CardGrid from "../../Cards/CardGrid";
import HeadingArea from "../HeadingArea";
import TopOptionsBar from "../TopOptionsBar";
import { useRoom } from "../../../context/RoomContext";

const MobileGameScene: React.FC = () => {
  const { room } = useRoom();

  return (
    <div className="h-screen grid grid-rows-[auto_auto_auto_1fr] grid-cols-1">
      {/* Top Options Bar */}
      <div className="col-span-1 p-1">
        <TopOptionsBar />
      </div>

      {/* Heading */}
      <div className="col-span-1">
        <HeadingArea />
      </div>

      {/* Board + Clue Area */}
      <div className="flex flex-col items-center gap-[2.5vw] p-1">
        <CardGrid />
        {room?.winner ? <WinnerInfo /> : <ClueArea />}
      </div>

      {/* Teams and Game Log */}
      <div className="grid grid-cols-3">
        <RedTeam />
        <GameLog />
        <BlueTeam />
      </div>
    </div>
  );
};

export default MobileGameScene;
