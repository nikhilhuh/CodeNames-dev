import NikhilImg from "../../assets/images/miscellaneous/nikhil.jpg";
import GithubLogo from "../../assets/images/miscellaneous/github.png";
import LinkedinLogo from "../../assets/images/miscellaneous/linkedin.png";

const Developer = () => {
  return (
    <div className="py-1 px-2 bg-white bg-opacity-55 rounded-xl">
      <div className="font-bold text-center tablet:text-[1.4vw]">Developer</div>
      <div className="flex flex-col justify-center items-center mt-2">
        <img src={NikhilImg} alt="NikhilImg" className="h-[12vw] rounded-xl" />
        <div className="text-center font-semibold tablet:text-[1.2vw]">Nikhil Tiwari</div>
        <div className="flex items-center justify-center">
          <a href="https://github.com/nikhilhuh" target="_blank">
            <img src={GithubLogo} alt="Github Logo" className="h-[3vw] rounded-full mix-blend-color-burn hover:scale-110"/>
          </a>
          <a href="https://www.linkedin.com/in/nikhilhuh?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank">
            <img src={LinkedinLogo} alt="Github Logo" className="h-[4vw] rounded-full hover:scale-110"/>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Developer;
