import React, { useState } from "react";
import { createRoom } from "../services/api/apiCalls/createRoom";
import { joinRoom } from "../services/api/apiCalls/joinRoom";
import { useNavigate } from "react-router-dom";
import ErrorModal from "../components/Modals/ErrorModal";
import HowToPlay from "../components/Room/HowToPlay";
import NickName from "../components/Room/NickName";
import CreateRoom from "../components/Room/CreateRoom";
import JoinRoom from "../components/Room/JoinRoom";

const Room: React.FC = () => {
  const [nickname, setNickName] = useState<string>("");
  const [roomId, setRoomId] = useState<string>("");
  const [errorModal, setErrorModal] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const handleErrorModal = () => {
    setErrorModal((prev) => !prev);
  };

  const handleCreateRoom = async () => {
    if (nickname.trim() === "") {
      setError("Enter your Nickname to continue");
      handleErrorModal();
      return;
    }
    try {
      const response = await createRoom(nickname);
      if (response && response.success && 'roomId' in response) {
        const newRoomId = response.roomId;
        navigate(`/games?roomId=${newRoomId}`);
      } else {
        setError(response?.message || "Error creating room , please try again");
        handleErrorModal();
      }
    } catch (error) {
      setError("Error creating room , please try again");
      handleErrorModal();
    }
  };

  const handleJoinRoom = async () => {
    if (roomId.trim() === "") {
      setError("Enter Room ID to join");
      handleErrorModal();
      return;
    }
    if (nickname.trim() === "") {
      setError("Enter your Nickname to continue");
      handleErrorModal();
      return;
    }
    try {
      const response = await joinRoom(roomId, nickname);

      if (response?.success) {
        navigate(`/games?roomId=${roomId}`);
      } else {
        setError(
          response?.message ||
            "Failed to join the room. Please check the Room ID and try again."
        );
        handleErrorModal();
      }
    } catch (error) {
      setError(`Error joining room , please try again`);
      handleErrorModal();
    }
  };

  return (
    <>
      {errorModal && <ErrorModal onClose={handleErrorModal} error={error} />}
      <div className="bg-transparent h-screen flex justify-center items-center px-2 py-2">
        <div className="bg-gray-200 bg-opacity-55 px-4 py-2 rounded-lg flex flex-col justify-center items-center gap-2">
          <h1 className="text-[5vw] tablet:text-[4vw] font-bold text-red-700 text-center font-serif">
            Welcomes to CodeNames
          </h1>

          <HowToPlay />

          <NickName nickname={nickname} setNickName={setNickName} />

          <div className="flex flex-col tablet:flex-row items-center">
            <CreateRoom handleCreateRoom={handleCreateRoom} />

            <JoinRoom
              roomId={roomId}
              setRoomId={setRoomId}
              handleJoinRoom={handleJoinRoom}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Room;
