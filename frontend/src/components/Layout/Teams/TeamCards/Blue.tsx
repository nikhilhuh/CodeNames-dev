import React, { useEffect, useState } from "react";
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

const BlueFront = [
  BlueImg1,
  BlueImg2,
  BlueImg3,
  BlueImg4,
  BlueImg5,
  BlueImg6,
  BlueImg7,
  BlueImg8,
  BlueImg9,
];

const Blue: React.FC = () => {
  const [currentFrontImg, setCurrentFrontImg] = useState<string>("");

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * BlueFront.length);
    setCurrentFrontImg(BlueFront[randomIndex]);
  }, []);
  return (
    <div className="relative aspect-[17/11] mobile-tablet:w-[16vw] tablet:w-[10vw]">
      {/* Background Image */}
      <img
        src={BlueImgBack}
        alt="Blue Background"
        className={`rounded-lg object-contain h-full w-full`}
      />
      {/* Front Image (Blended) */}
      {currentFrontImg && (
        <img
          src={currentFrontImg}
          alt="Blue Front"
          className={`absolute top-0 left-0 object-contain  mix-blend-normal h-full w-full`}
        />
      )}
    </div>
  );
};

export default Blue;
