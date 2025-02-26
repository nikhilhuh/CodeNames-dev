import { Player, Room } from "../utils/constants";

export const heading = (
  role: Player["role"],
  team: Player["team"],
  clueGiven: Room["clueGiven"],
  turn: Room["turn"],
  winner: Room["winner"]
): string => {
  let heading = "";
  if (winner) {
    heading = `${winner.team === "red" ? "Red" : "Blue"} Team Wins!`;
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
  return heading;
};
