import React from "react";

interface CreateRoomProps {
  handleCreateRoom: () => void;
}

const CreateRoom: React.FC<CreateRoomProps> = ({ handleCreateRoom }) => {
  return (
    <div className="border-b-2 tablet:border-r-2 tablet:border-b-0 border-black px-4 py-2">
      <button
        onClick={handleCreateRoom}
        className="p-4 bg-green-600 text-[3vw] tablet:text-[2.5vw] laptop-l:text-[2vw] font-semibold font-serif rounded-xl hover:bg-green-700"
      >
        Create Room
      </button>
    </div>
  );
};

export default CreateRoom;
