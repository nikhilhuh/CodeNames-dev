import { useState } from "react";
import InputClueArea from "../Clue/InputClueArea";
import ShowClueArea from "../Clue/ShowClueArea";
import { usePlayer } from "../../context/PlayerContext";
import EndGuessingButton from "../Clue/EndGuessingButton";
import { useRoom } from "../../context/RoomContext";

const ClueArea: React.FC = () => {
  const { PlayerDetails } = usePlayer();
  const { room } = useRoom();
  const [isAnimating, setIsAnimating] = useState(false);

  if (!room || !PlayerDetails) return <></>;

  return (
    <>
      {/* Full-screen blur overlay, only shown during animation */}
      {room?.clueGiven && isAnimating && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-500"></div>
      )}

      <div className="relative flex flex-col gap-[1.5vw] tablet:gap-[0.7vw] mb-[1vw] tablet:mb-0 justify-center items-center min-h-[8vh] tablet:min-h-0 z-50">
        {!room.clueGiven &&
        PlayerDetails.role === "spymaster" &&
        room.turn === PlayerDetails.team ? (
          <InputClueArea />
        ) : room?.clueGiven ? (
          <ShowClueArea onAnimationEnd={() => setIsAnimating(false)} onAnimationStart={() => setIsAnimating(true)} />
        ) : null}

        {room.clueGiven &&
          PlayerDetails.role === "operative" &&
          PlayerDetails.team === room.turn && <EndGuessingButton />}
      </div>
    </>
  );
};

export default ClueArea;
