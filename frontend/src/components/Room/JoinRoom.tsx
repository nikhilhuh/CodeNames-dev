import React from "react";

interface JoinRoomProps {
  roomId: string;
  setRoomId: React.Dispatch<React.SetStateAction<string>>;
  handleJoinRoom: () => void;
}

const JoinRoom: React.FC<JoinRoomProps> = ({
  roomId,
  setRoomId,
  handleJoinRoom,
}) => {
  return (
    <div className="flex flex-col gap-1 px-4 py-2">
      <label
        htmlFor="joinRoomId"
        className="font-mono text-center text-[3vw] tablet:text-[2.5vw] laptop-l:text-[2vw]"
      >
        Enter Room ID
      </label>
      <input
        type="text"
        value={roomId}
        onChange={(e) => setRoomId(e.target.value)}
        id="joinRoomId"
        name="joinRoomId"
        className="outline-none bg-gray-300 border-gray-300 border-2 rounded-full text-[2.5vw] tablet:text-[2.2vw] laptop-l:text-[1.9vw] px-6 py-1"
      />
      <button
        onClick={handleJoinRoom}
        className="mt-2 p-2 bg-green-600 text-[3vw] tablet:text-[2.5vw] laptop-l:text-[2vw] font-semibold font-serif rounded-xl hover:bg-green-700"
      >
        Join Room
      </button>
    </div>
  );
};

export default JoinRoom;
