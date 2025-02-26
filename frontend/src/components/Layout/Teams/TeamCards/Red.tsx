import React, { useEffect, useState } from "react";
import RedImg1 from "../../../../assets/images/red/red1.png";
import RedImg2 from "../../../../assets/images/red/red2.png";
import RedImg3 from "../../../../assets/images/red/red3.png";
import RedImg4 from "../../../../assets/images/red/red4.png";
import RedImg5 from "../../../../assets/images/red/red5.png";
import RedImg6 from "../../../../assets/images/red/red6.png";
import RedImg7 from "../../../../assets/images/red/red7.png";
import RedImg8 from "../../../../assets/images/red/red8.png";
import RedImg9 from "../../../../assets/images/red/red9.png";
import RedImgBack from "../../../../assets/images/red/red-back.png";

const RedFront = [
  RedImg1,
  RedImg2,
  RedImg3,
  RedImg4,
  RedImg5,
  RedImg6,
  RedImg7,
  RedImg8,
  RedImg9,
];

const Red: React.FC = () => {
  const [currentFrontImg, setCurrentFrontImg] = useState<string>("");

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * RedFront.length);
    setCurrentFrontImg(RedFront[randomIndex]);
  }, []);
  return (
    <div className="relative aspect-[17/11] mobile-tablet:w-[16vw] tablet:w-[10vw]">
      {/* Background Image */}
      <img
        src={RedImgBack}
        alt="Red Background"
        className={`rounded-lg object-contain h-full w-full`}
      />
      {/* Front Image (Blended) */}
      {currentFrontImg && (
        <img
          src={currentFrontImg}
          alt="Red Front"
          className={`absolute top-0 left-0 object-contain mix-blend-normal h-full w-full`}
        />
      )}
    </div>
  );
};

export default Red;
