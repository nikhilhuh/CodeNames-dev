import React from "react";
import BlueImg1 from "../../../../assets/images/blue/blue1.png";
import BlueImg2 from "../../../../assets/images/blue/blue2.png";
import BlueImg3 from "../../../../assets/images/blue/blue3.png";
import BlueImg4 from "../../../../assets/images/blue/blue4.png";
import BlueImg5 from "../../../../assets/images/blue/blue5.png";
import BlueImg6 from "../../../../assets/images/blue/blue6.png";
import BlueImg7 from "../../../../assets/images/blue/blue7.png";
import BlueImg8 from "../../../../assets/images/blue/blue8.png";
import BlueImg9 from "../../../../assets/images/blue/blue9.png";
import BlueImgBack from "../../../../assets/images/blue/blue-back.png";
import { wordCard } from "../../../../utils/constants";

interface BlueProps {
  card: wordCard;
}

const Blue: React.FC<BlueProps> = ({ card }) => {
  const frontImageSrc = {
    BlueImg1,
    BlueImg2,
    BlueImg3,
    BlueImg4,
    BlueImg5,
    BlueImg6,
    BlueImg7,
    BlueImg8,
    BlueImg9,
  }[card.revealedFrontImage];

  return (
    <div className="relative">
      {/* Background Image */}
      <img
        src={BlueImgBack}
        alt="blue Background"
        className={`rounded-lg object-contain h-full w-full`}
      />
      {/* Front Image (Blended) */}
      {frontImageSrc && (
        <img
          src={frontImageSrc}
          alt="blue Front"
          className={`absolute top-0 left-0 object-contain  mix-blend-normal h-full w-full`}
        />
      )}
    </div>
  );
};

export default Blue;
