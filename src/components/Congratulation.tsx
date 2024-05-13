import { FaRegFaceSmileBeam } from "react-icons/fa6";
import { FaHandPointDown } from "react-icons/fa";

const Congratulation = () => {
  return (
    <div className="fixed text-white top-0 left-0 w-full h-full bg-[#00000066] flex justify-center items-center flex-col gap-9">
      <h1 className="flex items-center gap-6 text-xl font-black">
        End Questions Show Score <FaRegFaceSmileBeam className="text-3xl" />
      </h1>
      <FaHandPointDown className="text-3xl animate-bounce" />
    </div>
  );
};

export default Congratulation;
