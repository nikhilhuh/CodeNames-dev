import Rule1GIF from "../../assets/rules/rule1.gif";
import Rule2GIF from "../../assets/rules/rule2.gif";
import Rule3GIF from "../../assets/rules/rule3.gif";
import Rule4GIF from "../../assets/rules/rule4.gif";
import Rule5GIF from "../../assets/rules/rule5.gif";
import Rule6GIF from "../../assets/rules/rule6.gif";
import Rule7GIF from "../../assets/rules/rule7.gif";
import Rule8GIF from "../../assets/rules/rule8.gif";
import BlackCardImg from "../../assets/images/cards/black-card.png";
import CodeNamesBookImg from "../../assets/images/miscellaneous/codenamesBook.png";
import { IoCloseCircleSharp } from "react-icons/io5";

interface RulesModalProps {
  onClose: () => void;
}

const RulesModal: React.FC<RulesModalProps> = ({ onClose }) => {
  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity duration-300 ease-in-out opacity-100 pointer-events-auto`}
    >
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-100 z-50 w-[80vw]  max-w-[80vw] max-h-[90vh] overflow-hidden rounded-2xl">
        {/* Header */}
        <div className="bg-gray-300 flex justify-between px-4 py-2">
          <div className="mx-auto bg-gray-100 px-4 py-2 rounded-lg flex items-center md:gap-4 gap-2 border-black border-2 cursor-pointer">
            <img
              src={CodeNamesBookImg}
              alt=""
              className="h-[50px] md:h-[60px] xl:h-[80px] object-contain"
            />
            <div className="flex flex-col ">
              <div className="text-red-500 3xl:text-[3rem] xl:text-[2rem] lg:text-[1.5rem] md:text-[1.2rem] text-[1rem] font-semibold">
                CodeNames
              </div>
              <p className="3xl:text-[2.5rem] xl:text-[1.8rem] lg:text-[1.4rem] md:text-[1rem] text-[0.9rem]">
                Team vs Team , 2+ Players each team
              </p>
            </div>
          </div>
          <div
            className="lg:text-[2.5rem] md:text-[2rem] text-[1.5rem] cursor-pointer"
            onClick={onClose}
          >
            <IoCloseCircleSharp />
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="md:px-4 px-2 pt-2 overflow-y-auto max-h-[70vh] 3xl:text-[2.5rem] xl:text-[1.8rem] lg:text-[1.4rem] md:text-[1rem] text-[0.9rem] flex flex-col xl:gap-12 lg:gap-10 md:gap-8 gap-5">
          <div className="flex flex-col gap-4">
            <p>
              Codenames is a game for two teams. There is a grid of 25 words.
              Some of them are secretly assigned to the{" "}
              <strong className="text-red-500">Red Team</strong>, some to the{" "}
              <strong className="text-blue-500">Blue Team</strong>. One player
              from each team is the Spymaster, and only Spymasters see which
              words belong to which team. Spymasters take turns giving clues to
              their teammates (Operatives), trying to lead them to guessing
              their team's words. The team that guesses all their words first
              wins the game.
            </p>
            <p className="px-2 py-2 bg-cyan-200">
              <strong>Please note:</strong> Codenames is a tool that lets you
              play the game over the Internet, but it doesn’t enforce all the
              rules. Spymasters in particular need to know the rules so they can
              follow them.
            </p>
          </div>

          <div>
            <h2 className="font-semibold 3xl:text-[3.5rem] xl:text-[2.5rem] lg:text-[2rem] md:text-[1.8rem] text-[1.5rem]">
              Dividing into Teams
            </h2>
            <p>
              Divide all players into two teams,{" "}
              <span className="text-red-400">red</span> and{" "}
              <span className="text-blue-400">blue</span>.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <p>
              One player from each team should click on{" "}
              <span className="bg-yellow-400 px-2 py-1">Join as Spymaster</span>
              . He/she will then see the colors of the cards.
            </p>
            <p>
              Everyone else should click on{" "}
              <span className="bg-yellow-400 px-2 py-1">Join as Operative</span>
              . They do not see the colors of the cards.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img src={Rule1GIF} alt="" className="w-full object-contain" />
            <img src={Rule2GIF} alt="" className="w-full object-contain" />
          </div>

          <div>
            <h2 className="font-semibold 3xl:text-[3.5rem] xl:text-[2.5rem] lg:text-[2rem] md:text-[1.8rem] text-[1.5rem]">
              Giving Clues
            </h2>
            <p>
              Spymasters give clues. When it’s your turn to give a clue, tap
              some words in your color that you want to give a clue for. Then
              type in a one word clue that relates to all selected words. Your
              Operatives will only see the clue and the number of marked cards
            </p>
          </div>
          <div className="grid grid-cols-2 justify-between">
            <p className="text-start">When you give a clue ...</p>
            <p className="text-end">
              ... your Operatives only see the word and the number.
            </p>
          </div>
          <div>
            <img src={Rule3GIF} alt="" className="object-contain w-full" />
          </div>

          <div className="flex items-center gap-6">
            <img
              src={BlackCardImg}
              alt=""
              className="h-[50px] md:h-[60px] xl:h-[80px] object-contain"
            />
            <p>
              Watch out for the black card – it’s an Assassin! Avoid clues that
              would lead to the assassin or to the other team's words.
            </p>
          </div>

          <div>
            <p className="px-2 py-2 bg-cyan-200">
              <strong>Note:</strong> Some clues are not allowed, for example
              using any form of any word on the board.
            </p>
          </div>

          <div>
            <h2 className="font-semibold 3xl:text-[3.5rem] xl:text-[2.5rem] lg:text-[2rem] md:text-[1.8rem] text-[1.5rem]">
              Guessing
            </h2>
            <p>Operatives guess the words based on the Spymaster’s clue.</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <p>
              You can discuss the clue with your teammates. You can also suggest
              a guess by tapping the card you think matches the clue.
            </p>
            <p>
              To make your guess official, tap the cursor button. The game will
              then reveal the color of the chosen word.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img src={Rule4GIF} alt="" className="w-full object-contain" />
            <img src={Rule5GIF} alt="" className="w-full object-contain" />
          </div>
          <p>
            If you guess a word of your team's color, you may guess again.
            You'll want to guess as many words as your Spymaster indicated.
          </p>
          <p className="px-2 py-2 bg-cyan-200">
            <strong>Note:</strong>You can also guess unsolved clues from
            previous turns.
          </p>

          <div>
            <h2 className="font-semibold 3xl:text-[3.5rem] xl:text-[2.5rem] lg:text-[2rem] md:text-[1.8rem] text-[1.5rem]">
              End of Turn
            </h2>
            <p>Your turn can end in one of three ways:</p>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <p>Guessing a word of the opponent's color or neutral color.</p>
            <p>Ending guessing manually by clicking the button.</p>
            <p>Reaching the maximum number of guesses (clue number + 1).</p>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <img src={Rule6GIF} alt="" className="w-full object-contain" />
            <img src={Rule7GIF} alt="" className="w-full object-contain" />
            <img src={Rule8GIF} alt="" className="w-full object-contain" />
          </div>

          <div className="mb-2">
            <h2 className="font-semibold 3xl:text-[3.5rem] xl:text-[2.5rem] lg:text-[2rem] md:text-[1.8rem] text-[1.5rem]">
              Winning and Losing
            </h2>
            <p>
              Teams alternate turns. A team wins once all their words have been
              guessed. They lose if they guess the Assassin!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RulesModal;
