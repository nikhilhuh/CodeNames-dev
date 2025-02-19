import React, { useState } from "react";
import RulesModal from "../Modals/RulesModal";

const Rules: React.FC = () => {
  const [showRulesModal, setShowRulesModal] = useState<boolean>(false);

  const handleRulesModal = () => {
    setShowRulesModal((prev) => !prev);
  };
  
  return (
    <>
      {showRulesModal && <RulesModal onClose={handleRulesModal} />}
      <button
        title="Game Rules"
        onClick={handleRulesModal}
        className="flex gap-[1vw] tablet:gap-[0.5vw] items-center px-[2.5vw] py-[1vw] tablet:px-[1vw] tablet:py-[0.8vw] bg-yellow-400 rounded-full shadow-xl hover:bg-yellow-500 hover:scale-105 transition"
      >
        Rules
      </button>
    </>
  );
};

export default Rules;
