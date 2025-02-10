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
    <div className="flex gap-1 tablet:gap-2 4k:gap-6 justify-center items-center text-[3vw] tablet:text-[1.5vw]">
      <input
        id={`inputClue-${id}`}
        name={`inputClue-${id}`}
        type="text"
        onChange={(e) => setClueWord(e.target.value)}
        placeholder="TYPE YOUR CLUE HERE"
        className="uppercase outline-none rounded-lg 4k:rounded-xl 4k:px-4 laptop-sm:px-2 laptop-sm:py-1 p-1"
        aria-label="Enter your clue"
      />

      {/* Number Selector */}
      <div className="relative">
        <div
          className="flex justify-center items-center bg-white rounded-lg 4k:rounded-xl cursor-pointer 4k:px-4 laptop-sm:py-1 px-2 py-1"
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
        className="flex justify-center items-center bg-green-600 hover:bg-green-700 4k:px-4 laptop-sm:px-2 laptop-sm:py-1 p-1 rounded-lg 4k:rounded-xl font-semibold"
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
    <div className="absolute bottom-[120%] left-1/2 transform -translate-x-1/2 text-[3vw] tablet:text-[1.5vw] bg-white rounded-lg 4k:rounded-xl shadow-lg overflow-hidden z-10">
      <div className="flex laptop-sm:gap-2 laptop-l:gap-4 4k:gap-6 gap-1 laptop-sm:p-2 p-1">
        {Array.from({ length: 10 }, (_, index) => (
          <div
            key={`number-option-${index}`}
            onClick={() => onSelect(index)}
            className="lg:px-2 lg:py-1 p-1 cursor-pointer hover:bg-gray-200  text-center bg-gray-100 rounded-md"
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
