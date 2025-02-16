import React, { useId, useState } from "react";
import { usePlayer } from "../../context/PlayerContext";
import { giveClue } from "../../services/api/apiCalls/giveClue";
import { useRoom } from "../../context/RoomContext";

const InputClueArea: React.FC = () => {
  const id = useId();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [clueNumber, setClueNumber] = useState<number | null>(null);
  const [clueWord, setClueWord] = useState("");
  const { PlayerDetails } = usePlayer();
  const { roomId } = useRoom();

  const handleOptionClick = (number: number) => {
    setClueNumber(number);
    setIsDropdownOpen(false);
  };

  const handleSubmit = async () => {
    if (!clueWord.trim() || !clueNumber || !roomId || !PlayerDetails) return;

    await giveClue(roomId, PlayerDetails.nickname, clueWord, clueNumber);
  };

  return (
    <div className="flex gap-[1vw] tablet:gap-[0.5vw] justify-center items-center text-[3vw] tablet:text-[1.3vw]">
      <input
        id={`inputClue-${id}`}
        name={`inputClue-${id}`}
        type="text"
        onChange={(e) => setClueWord(e.target.value)}
        placeholder="TYPE YOUR CLUE HERE"
        className="uppercase outline-none rounded-lg 4k:rounded-xl px-[1.5vw] py-[1vw] tablet:px-[0.5vw] tablet:py-[0.3vw]"
        aria-label="Enter your clue"
      />

      {/* Number Selector */}
      <div className="relative">
        <div
          className="flex justify-center items-center bg-white rounded-lg 4k:rounded-xl cursor-pointer px-[1.5vw] py-[1vw] tablet:px-[0.5vw] tablet:py-[0.3vw]"
          onClick={() => setIsDropdownOpen((prev) => !prev)}
          role="button"
          tabIndex={0}
          aria-haspopup="listbox"
          aria-expanded={isDropdownOpen}
        >
          {clueNumber ? clueNumber
          : "-"
          }
        </div>
        {isDropdownOpen && <NumberDropdown onSelect={handleOptionClick} />}
      </div>

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        className="flex justify-center items-center bg-green-600 hover:bg-green-700 px-[1.5vw] py-[1vw] tablet:px-[0.5vw] tablet:py-[0.3vw] rounded-lg 4k:rounded-xl font-semibold"
        aria-label="Submit your clue"
      >
        Give Clue
      </button>
    </div>
  );
};

/* Number Dropdown Component */
const NumberDropdown: React.FC<{ onSelect: (num: number) => void }> = ({
  onSelect,
}) => {
  return (
    <div className="absolute bottom-[120%] left-1/2 transform -translate-x-1/2 text-[3vw] tablet:text-[1.3vw] bg-white rounded-lg 4k:rounded-xl shadow-lg overflow-hidden z-10">
      <div className="flex gap-[0.5vw] px-[0.5vw] py-[0.3vw]">
        {Array.from({ length: 10 }, (_, index) => (
          <div
            key={`number-option-${index}`}
            onClick={() => onSelect(index)}
            className="px-[1.5vw] py-[1vw] tablet:px-[0.4vw] tablet:py-[0.2vw] cursor-pointer hover:bg-gray-200  text-center bg-gray-100 rounded-md"
            role="option"
          >
            {index}
          </div>
        ))}
      </div>
    </div>
  );
};

export default InputClueArea;
