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
        className="flex gap-[1vw] tablet:gap-[0.5vw] items-center px-[1.5vw] py-[1vw] tablet:px-[0.6vw] tablet:py-[0.5vw] bg-yellow-400 rounded-full shadow-lg"
      >
        Rules
      </button>
    </>
  );
};

export default Rules;
