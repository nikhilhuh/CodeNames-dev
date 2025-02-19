import React, { useState } from "react";
import ErrorModal from "../Modals/ErrorModal";
import UpdateNickname from "./components/UpdateNickname";
import LeaveRoom from "./components/LeaveRoom";
import TeamRole from "./components/TeamRole";

const PlayerDropdown: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [error, setError] = useState<string>("");

  return (
    <div
      className="absolute top-[110%] right-1 z-50 rounded-xl w-[60vw] tablet:w-[35vw] laptop-sm:w-[25vw] laptop-l:w-[20vw] text-[2.2vw] tablet:text-[1.2vw] laptop-sm:text-[1vw] laptop-l:text-[0.8vw] 4k:text-[1vw]"
      onClick={(e) => e.stopPropagation()}
    >
      {error && <ErrorModal onClose={() => setError("")} error={error} />}
      <div className="bg-gray-100 p-2 tablet:p-4 4k:p-6 rounded-tr-xl rounded-tl-xl border-b-2 border-b-gray-400 flex flex-col justify-center items-center text-center">
        <TeamRole />
      </div>

      <div className="bg-gray-300 p-2 tablet:p-4 4k:p-6 rounded-bl-xl rounded-br-xl flex flex-col items-center gap-1 laptop-sm:gap-3">
        <UpdateNickname onClose={onClose} setError={setError} />
        <LeaveRoom onClose={onClose} setError={setError} />
      </div>
    </div>
  );
};

export default PlayerDropdown;
