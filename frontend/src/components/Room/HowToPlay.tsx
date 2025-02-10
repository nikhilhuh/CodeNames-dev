import React from "react";

const HowToPlay: React.FC = () => {
  return (
    <div className="bg-yellow-500 border-4 border-yellow-600 px-4 py-2 md:px-6 md:py-4 max-w-[90vw] md:max-w-[75vw] lg:max-w-[45vw] rounded-xl">
      <h2 className="text-[4.5vw] tablet:text-[3vw] font-bold">How To Play?</h2>
      <ul className="list-decimal list-inside font-mono text-[3.5vw] tablet:text-[2vw] ">
        <li>
          Click on the CREATE ROOM button or Enter the Room Code and then Click
          on the JOIN ROOM button.
        </li>
        <li>Connect with your friends in the game.</li>
        <li>Enjoy the game!</li>
      </ul>
    </div>
  );
};

export default HowToPlay;
