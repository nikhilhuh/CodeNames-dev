import PlayersDetails from "../OptionsBar/PlayersDetails";
import ResetButton from "../OptionsBar/ResetButton";
import PlayerMenu from "../OptionsBar/PlayerMenu";
import Rules from "../OptionsBar/Rules";

const TopOptionsBar: React.FC = () => {
  return (
    <div className="w-full bg-transparent">
      <div className="flex justify-between items-center font-semibold text-[2.5vw] tablet:text-[1vw]">
        <PlayersDetails />
        <div className="flex gap-[1vw] tablet:gap-[0.5vw] items-center">
          <ResetButton />
          <Rules />
          <PlayerMenu />
        </div>
      </div>
    </div>
  );
};

export default TopOptionsBar;
