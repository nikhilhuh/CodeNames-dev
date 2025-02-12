import React, { useState } from "react";
import { usePlayer } from "../../context/PlayerContext";
import BlueCharacterImg from "../../assets/images/blue/blue1.png";
import RedCharacterImg from "../../assets/images/red/red1.png";

const PlayerDropdown: React.FC = () => {
  const { PlayerDetails } = usePlayer();
  if (!PlayerDetails) return <></>;

  const [nickname , setNickname] = useState<string>(PlayerDetails.nickname)

  return (
    <div
      className="absolute top-[110%] right-1 z-50 rounded-xl w-[40vw] tablet:w-[35vw] laptop-sm:w-[25vw] text-[2vw] tablet:text-[1.2vw] laptop-sm:text-[1vw] laptop-l:text-[0.8vw]"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="bg-gray-100 p-2 tablet:p-4 rounded-tr-xl rounded-tl-xl border-b-2 border-b-gray-400 flex flex-col justify-center items-center">
        {!PlayerDetails.role && !PlayerDetails.team && (
          <div>Join a Team!</div>
        )}
        {PlayerDetails.role && PlayerDetails.team && (
          <button
            className={`${
              PlayerDetails.team === "red" ? "bg-blue-500" : "bg-red-600"
            } py-2 px-2 shadow-xl rounded-full flex gap-2 items-center justify-between`}
          >
            <img
              src={
                PlayerDetails.team === "red"
                  ? BlueCharacterImg
                  : RedCharacterImg
              }
              className="object-contain h-[4vw] tablet:h-[3vw] laptop-l:h-[2vw]"
            />
            <div>
              Switch to{" "}
              <span>{PlayerDetails.team === "red" ? "Blue" : "Red"}</span> Team
            </div>
          </button>
        )}
      </div>

      <div className="bg-gray-300 p-2 tablet:p-4 rounded-bl-xl rounded-br-xl flex flex-col gap-2">
        <div className="flex flex-col">
          <label htmlFor="nickname">Nickname</label>
          <input
            id="nickname"
            name="nickname"
            type="text"
            value={nickname}
            onChange={(e)=> setNickname(e.target.value)}
            className="text-center bg-transparent outline-none border-2 border-gray-700 mt-1 rounded-full p-2"
          />
        </div>
        <button
          title="Room Id"
          className="mt-1 p-2 bg-yellow-400 rounded-full shadow-md font-semibold"
        >
          Update Your Nickname
        </button>
      </div>
    </div>
  );
};

export default PlayerDropdown;
