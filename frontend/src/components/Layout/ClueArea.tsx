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
    <div className="flex gap-2 laptop-sm:gap-4 laptop-l:gap-6 4k:gap-10 justify-center items-center">
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
