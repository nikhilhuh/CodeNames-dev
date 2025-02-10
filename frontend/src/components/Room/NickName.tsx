import React from "react";

interface NickNameProps {
  nickname: string;
  setNickName: React.Dispatch<React.SetStateAction<string>>;
}

const NickName: React.FC<NickNameProps> = ({ nickname, setNickName }) => {
  return (
    <>
      <label
        htmlFor="inputNickName"
        className="font-mono text-[3vw] tablet:text-[2.5vw] laptop-l:text-[2vw]"
      >
        Enter your NickName
      </label>
      <input
        type="text"
        value={nickname}
        onChange={(e) => setNickName(e.target.value)}
        id="inputNickName"
        name="inputNickName"
        className="outline-none bg-gray-300 border-gray-300 border-2 rounded-full text-[2.5vw] tablet:text-[2.2vw] laptop-l:text-[1.9vw] px-4 py-1"
        required
      />
    </>
  );
};

export default NickName;
