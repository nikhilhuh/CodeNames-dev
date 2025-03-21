import React, { useEffect, useState } from "react";
import HowToPlay from "../components/Room/HowToPlay";
import NickName from "../components/Room/NickName";
import CreateRoom from "../components/Room/CreateRoom";
import JoinRoom from "../components/Room/JoinRoom";
import { useRoom } from "../context/RoomContext";
import GridLoader from "../components/Loaders/GridLoader";
import ErrorModal from "../components/Modals/ErrorModal";

const Room: React.FC = () => {
  const [nickname, setNickName] = useState<string>("");
  const [error , setError] = useState<string>("");
  const { isLoading , setisLoading } = useRoom();

  useEffect(() => {
    if(error) setisLoading(false);
  } ,[error])

  return (
    <div className="bg-transparent h-full flex justify-center items-center px-2 py-2">
      {error && (
        <ErrorModal onClose={()=> setError("")} error={error} />
      )}
      {isLoading ? (
        <GridLoader />
      ) : (
        <div
          className={`bg-gray-200 bg-opacity-55 px-4 py-2 rounded-lg flex flex-col justify-center items-center gap-2`}
        >
          <h1 className="text-[5vw] tablet:text-[4vw] font-bold text-red-700 text-center font-serif">
            Welcomes to CodeNames
          </h1>
          <HowToPlay />
          <NickName nickname={nickname} setNickName={setNickName} />
          <div className="flex flex-col tablet:flex-row items-center">
            <CreateRoom nickname={nickname} setError={setError}/>
            <JoinRoom nickname={nickname} setError={setError}/>
          </div>
        </div>
      )}
    </div>
  );
};

export default Room;
