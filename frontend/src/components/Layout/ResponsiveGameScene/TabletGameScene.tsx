import React from "react";
import RedTeam from "../Teams/RedTeam";
import GameLog from "../GameLog";
import BlueTeam from "../Teams/BlueTeam";
import WinnerInfo from "../../Winner/WinnerInfo";
import ClueArea from "../ClueArea";
import CardGrid from "../../Cards/CardGrid";
import Developer from "../Developer";
import HeadingArea from "../HeadingArea";
import TopOptionsBar from "../TopOptionsBar";
import { useRoom } from "../../../context/RoomContext";

const TabletGameScene: React.FC = () => {
  const { room } = useRoom();

  return (
    <div className="h-full grid grid-rows-[auto_auto_1fr] grid-cols-[1fr_3fr_1fr] gap-x-[3vw] px-2 laptop-sm:px-[2vw] laptop-l:px-[4vw] py-2 4k:py-4">
      {/* Top Options Bar */}
      <div className="col-span-3">
        <TopOptionsBar />
      </div>

      {/* Heading */}
      <div className="col-span-3">
        <HeadingArea />
      </div>

      {/* Left Column for Tablet and Above */}
      <div className="flex flex-col gap-[2vw]">
        <RedTeam />
        <Developer />
      </div>

      {/* Middle Section (Board + Clue Area) */}
      <div className="relative">
        {/* ✅ Absolute Positioned Top Section */}
        <div className="absolute inset-x-0 top-0 flex flex-col items-center gap-[1vw]">
          <CardGrid />
          {room?.winner ? <WinnerInfo /> : <ClueArea />}
        </div>
      </div>

      {/* Right Column for Tablet and Above */}
      <div className="grid grid-rows-[auto_1fr] h-full gap-4 4k:gap-10">
        <BlueTeam />
        <GameLog />
      </div>
    </div>
  );
};

export default TabletGameScene;
