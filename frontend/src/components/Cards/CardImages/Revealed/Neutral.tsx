import React from "react";
import NeutralImg1 from "../../../../assets/images/neutral/neutral1.png";
import NeutralImg2 from "../../../../assets/images/neutral/neutral2.png";
import NeutralImg3 from "../../../../assets/images/neutral/neutral3.png";
import NeutralImg4 from "../../../../assets/images/neutral/neutral4.png";
import NeutralImg5 from "../../../../assets/images/neutral/neutral5.png";
import NeutralImg6 from "../../../../assets/images/neutral/neutral6.png";
import NeutralImgBack from "../../../../assets/images/neutral/neutral-back.png";
import { wordCard } from "../../../../utils/constants";

interface NeutralProps {
  card: wordCard;
}
const Neutral: React.FC<NeutralProps> = ({ card }) => {
  const frontImageSrc = {
    NeutralImg1,
    NeutralImg2,
    NeutralImg3,
    NeutralImg4,
    NeutralImg5,
    NeutralImg6,
  }[card.revealedFrontImage];

  return (
    <div className="relative">
      {/* Background Image */}
      <img
        src={NeutralImgBack}
        alt="neutral Background"
        className={`rounded-lg object-contain h-full w-full`}
      />
      {/* Front Image (Blended) */}
      {frontImageSrc && (
        <img
          src={frontImageSrc}
          alt="neutral Front"
          className={`absolute top-0 left-0 object-contain mix-blend-normal h-full w-full`}
        />
      )}
    </div>
  );
};

export default Neutral;
