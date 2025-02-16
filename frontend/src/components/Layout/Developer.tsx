import NikhilImg from "../../assets/images/miscellaneous/nikhil.jpg"

const Developer = () => {
  return (
    <div className="p-[1vw] bg-white bg-opacity-55 rounded-xl tablet:text-[1.5vw]">
        <div className="font-bold text-center">Developer</div>
        <div className="flex flex-col justify-center items-center mt-2">
            <img src={NikhilImg} alt="" className="h-[15vw] rounded-xl"/>
            <div className="text-center font-semibold">
                Nikhil Tiwari
            </div>
        </div>
    </div>
  )
}

export default Developer