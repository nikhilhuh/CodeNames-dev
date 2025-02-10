import React, { useState, useEffect } from "react";
import { usePlayer } from "../../context/PlayerContext";
import { useRoom } from "../../context/RoomContext";

const HeadingArea: React.FC = () => {
  const { PlayerDetails } = usePlayer();
  const { room } = useRoom();

  const role = PlayerDetails?.role ?? null;
  const team = PlayerDetails?.team ?? null;
  const clueGiven = room?.clueGiven ?? false;
  const turn = room?.turn ?? "red";
  const winner = room?.winner ?? null;

  let heading = "";
  if (winner) {
    heading = `${winner.team === "red" ? "Red" : "Blue"} Team Wins.`;
  } else if (!clueGiven) {
    if (role === null && team === null) {
      heading = `${
        turn === "red" ? "Red" : "Blue"
      } spymaster is playing. (To play, you need to join a team)`;
    } else if (role === "spymaster" && team === turn) {
      heading = "Give your operatives a clue.";
    } else if (role === "operative" && team === turn) {
      heading = "Wait for your spymaster to give you a clue.";
    } else if (team !== turn) {
      heading = "The opponent spymaster is playing, wait for your turn.";
    }
  } else if (clueGiven) {
    if (role === null && team === null) {
      heading = `${
        turn === "red" ? "Red" : "Blue"
      } operatives are playing. (To play, you need to join a team)`;
    } else if (team === turn && role === "operative") {
      heading = "Try to guess a word.";
    } else if (team === turn && role === "spymaster") {
      heading = "Your operatives are guessing now...";
    } else if (team !== turn) {
      heading = "The opponent operatives are playing, wait for your turn.";
    }
  }

  const [displayedText, setDisplayedText] = useState<string>(heading);
  const [key, setKey] = useState(0);

  useEffect(() => {
    setDisplayedText("");
    setTimeout(() => {
      setDisplayedText(heading);
      setKey((prev) => prev + 1);
    }, 100);
  }, [heading]);

  if (!PlayerDetails || !room) return <></>;

  return (
    <div className="flex bg-transparent justify-center items-center">
      <div className="bg-white shadow-md text-black rounded-lg laptop-l:rounded-xl max-w-[95vw] tablet:max-w-[60vw] text-[2.5vw] tablet:text-[1.5vw] px-2 py-1 laptop-l:px-4 4k:py-2 text-center overflow-hidden">
        <span key={key} className="typewriter font-semibold">
          {displayedText.split("").map((char, index) => (
            <span key={index} style={{ animationDelay: `${index * 50}ms` }}>
              {char}
            </span>
          ))}
        </span>
      </div>
    </div>
  );
};

export default HeadingArea;
