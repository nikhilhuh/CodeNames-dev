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
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-100 z-50 w-[90vw] max-w-[90vw] h-[95%] max-h-[95%] overflow-hidden rounded-lg laptop-sm:rounded-2xl">
        {/* Header */}
        <div className="bg-gray-300 flex justify-between px-2 py-1 mobile-l:px-4 mobile-l:py-2 4k:px-6 4k:py-4">
          <div className="mx-auto bg-gray-100 px-2 py-1 mobile-l:px-4 mobile-l:py-2 4k:px-6 4k:py-4 rounded-lg flex items-center md:gap-4 gap-2 border-black border-2 cursor-pointer">
            <img
              src={CodeNamesBookImg}
              alt=""
              className="h-[12vw] mobile-l:h-[8vw] tablet:h-[6vw] laptop-sm:h-[5vw] laptop-l:h-[4vw] object-contain"
            />
            <div className="flex flex-col ">
              <div className="text-red-500 text-[4vw] mobile-l:text-[3vw] tablet:text-[2.5vw] laptop-sm:text-[2vw] laptop-l:text-[1.2vw] font-semibold">
                CodeNames
              </div>
              <p className="text-[3vw] mobile-l:text-[2vw] tablet:text-[1.8vw] laptop-sm:text-[1.5vw] laptop-l:text-[1vw]">
                Team vs Team , 2+ Players each team
              </p>
            </div>
          </div>
          <div
            className="text-[6vw] mobile-l:text-[5vw] tablet:text-[4vw] laptop-sm:text-[3vw] laptop-l:text-[2vw] cursor-pointer"
            onClick={onClose}
          >
            <IoCloseCircleSharp />
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="px-2 py-1 mobile-l:px-4 mobile-l:py-2 4k:px-6 4k:py-4 overflow-y-auto max-h-[90%] text-[3.5vw] mobile-l:text-[2.5vw] tablet:text-[1.8vw] laptop-sm:text-[1.5vw] laptop-l:text-[1.2vw] flex flex-col gap-[4vw] mobile-l:gap-[3vw] tablet:gap-[2vw] laptop-l:gap-[1.5vw]">
          {/* Main Paragraphs */}
          <div className="flex flex-col gap-2 laptop-l:gap-4">
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
            <p className="px-2 py-1 tablet:px-3 tablet:py-2 bg-cyan-200">
              <strong>Please note:</strong> Codenames is a tool that lets you
              play the game over the Internet, but it doesn’t enforce all the
              rules. Spymasters in particular need to know the rules so they can
              follow them.
            </p>
          </div>

          {/* Dividing into Teams */}
          <div>
            <h2 className="font-bold text-[5vw] mobile-l:text-[4vw] tablet:text-[3.5vw] laptop-sm:text-[2.5vw] laptop-l:text-[2vw]">
              Dividing into Teams
            </h2>
            <p>
              Divide all players into two teams,{" "}
              <span className="text-red-400">red</span> and{" "}
              <span className="text-blue-400">blue</span>.
            </p>
          </div>
          <div className="grid grid-cols-1 tablet:grid-cols-2 gap-4">
            <div className="flex flex-col justify-between gap-1 tablet:gap-2 4k:gap-4 h-full">
              <p>
                One player from each team should click on{" "}
                <span className="bg-yellow-400 px-1 mobile-l:px-2 mobile-l:py-0.5">
                  Join as Spymaster
                </span>
                . He/she will then see the colors of the cards.
              </p>
              <img src={Rule1GIF} alt="" className="w-full object-contain" />
            </div>

            <div className="flex flex-col justify-between gap-1 tablet:gap-2 4k:gap-4 h-full">
              <p>
                Everyone else should click on{" "}
                <span className="bg-yellow-400 px-1 mobile-l:px-2 mobile-l:py-0.5">
                  Join as Operative
                </span>
                . They do not see the colors of the cards.
              </p>
              <img src={Rule2GIF} alt="" className="w-full object-contain" />
            </div>
          </div>

          {/* Giving Clues */}
          <div>
            <h2 className="font-bold text-[5vw] mobile-l:text-[4vw] tablet:text-[3.5vw] laptop-sm:text-[2.5vw] laptop-l:text-[2vw]">
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

          {/* Black card warning */}
          <div className="flex items-center gap-4 laptop-l:gap-6 4k:gap-10">
            <img
              src={BlackCardImg}
              alt=""
              className="h-[15vw] mobile-l:h-[12vw] tablet:h-[6vw] laptop-sm:h-[5vw] laptop-l:h-[4vw] object-contain"
            />
            <p>
              Watch out for the black card – it’s an Assassin! Avoid clues that
              would lead to the assassin or to the other team's words.
            </p>
          </div>

          {/* Not allowed Clues */}
          <div>
            <p className="px-2 py-1 tablet:px-3 tablet:py-2 bg-cyan-200">
              <strong>Note:</strong> Some clues are not allowed, for example
              using any form of any word on the board.
            </p>
          </div>

          {/* Guessing */}
          <div>
            <h2 className="font-bold text-[5vw] mobile-l:text-[4vw] tablet:text-[3.5vw] laptop-sm:text-[2.5vw] laptop-l:text-[2vw]">
              Guessing
            </h2>
            <p>Operatives guess the words based on the Spymaster’s clue.</p>
          </div>
          <div className="grid grid-cols-1 tablet:grid-cols-2 gap-4">
            <div className="flex flex-col justify-between gap-1 tablet:gap-2 4k:gap-4 h-full">
              <p>
                You can discuss the clue with your teammates. You can also
                suggest a guess by tapping the card you think matches the clue.
              </p>
              <img src={Rule4GIF} alt="" className="w-full object-contain" />
            </div>

            <div className="flex flex-col justify-between gap-1 tablet:gap-2 4k:gap-4 h-full">
              <p>
                To make your guess official, tap the cursor button. The game
                will then reveal the color of the chosen word.
              </p>
              <img src={Rule5GIF} alt="" className="w-full object-contain" />
            </div>
          </div>
          <p>
            If you guess a word of your team's color, you may guess again.
            You'll want to guess as many words as your Spymaster indicated.
          </p>
          <p className="px-2 py-1 tablet:px-3 tablet:py-2 bg-cyan-200">
            <strong>Note:</strong> You can also guess unsolved clues from
            previous turns.
          </p>

          {/* End of turn */}
          <div>
            <h2 className="font-bold text-[5vw] mobile-l:text-[4vw] tablet:text-[3.5vw] laptop-sm:text-[2.5vw] laptop-l:text-[2vw]">
              End of Turn
            </h2>
            <p>Your turn can end in one of three ways:</p>
          </div>
          <div className="grid grid-cols-1 tablet:grid-cols-3 gap-4">
            <div className="flex flex-col justify-between gap-1 tablet:gap-2 4k:gap-4 h-full">
              <p>Guessing a word of the opponent's color or neutral color.</p>
              <img src={Rule6GIF} alt="" className="w-full object-contain" />
            </div>

            <div className="flex flex-col justify-between gap-1 tablet:gap-2 4k:gap-4 h-full">
              <p>Ending guessing manually by clicking the button.</p>
              <img src={Rule7GIF} alt="" className="w-full object-contain" />
            </div>

            <div className="flex flex-col justify-between gap-1 tablet:gap-2 4k:gap-4 h-full">
              <p>Reaching the maximum number of guesses (clue number + 1).</p>
              <img src={Rule8GIF} alt="" className="w-full object-contain" />
            </div>
          </div>

          {/* Winning and Losing */}
          <div className="pb-[2vw]">
            <h2 className="font-bold text-[5vw] mobile-l:text-[4vw] tablet:text-[3.5vw] laptop-sm:text-[2.5vw] laptop-l:text-[2vw]">
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
