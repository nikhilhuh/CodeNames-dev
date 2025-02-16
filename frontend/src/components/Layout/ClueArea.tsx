import InputClueArea from "../Clue/InputClueArea";
import ShowClueArea from "../Clue/ShowClueArea";
import { usePlayer } from "../../context/PlayerContext";
import EndGuessingButton from "../Clue/EndGuessingButton";
import { useRoom } from "../../context/RoomContext";

const ClueArea: React.FC = () => {
  const { PlayerDetails } = usePlayer();
  const { room } = useRoom();

  if (!room || !PlayerDetails) return <></>;

  return (
    <div className="flex flex-col gap-[1.5vw] tablet:gap-[0.7vw] mb-[1vw] tablet:mb-0 justify-center items-center min-h-[8vh] tablet:min-h-0">
      {!room.clueGiven &&
      PlayerDetails.role === "spymaster" &&
      room.turn === PlayerDetails.team ? (
        <InputClueArea />
      ) : room?.clueGiven ? (
        <ShowClueArea />
      ) : null}
      {room.clueGiven && PlayerDetails.role === "operative" && PlayerDetails.team === room.turn && ( 
        <EndGuessingButton />
      )}
    </div>
  );
};

export default ClueArea;
