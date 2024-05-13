import { useDispatch } from "react-redux";
import { StartQuiz } from "../redux/actions/actions";
import { TfiTimer } from "react-icons/tfi";
import { FaQuestion } from "react-icons/fa";
import { RiNumbersLine } from "react-icons/ri";
import listanswer from "../images/listanswer.gif";

function Start() {
  const dispatch = useDispatch();

  return (
    <section className=" bg-slate-800 text-white flex items-center max-[767px]:items-center max-[767px]:p-8  min-[767px]:h-screen ">
      <div className="container mx-auto px-6">
        <div className="flex flex-wrap justify-center items-center max-[767px]:flex-col-reverse	max-md:gap-8 ">
          {/* title and some info  */}
          <div className=" min-[767px]:basis-2/4 text-center">
            <h1 className=" text-4xl font-black tracking-wider text-center mb-8">
              Welcome To Quiz Game
            </h1>
            <ul className=" grid md:grid-cols-3 gap-3 text-center mb-10">
              <li className=" font-bold py-2 px-2 rounded-xl">
                <TfiTimer className=" inline-block text-2xl	" />
                <h2 className=" mt-3 text-1xl  font-normal ">5 Minutes</h2>
              </li>
              <li className=" font-bold py-2 px-2 rounded-xl">
                <FaQuestion className=" inline-block text-2xl	" />

                <h2 className=" mt-3 text-1xl font-normal">10 questions </h2>
              </li>
              <li className=" font-bold py-2 px-2 rounded-xl">
                <RiNumbersLine className=" inline-block text-2xl	" />

                <h2 className=" mt-3 text-1xl font-normal">100 degrees</h2>
              </li>
            </ul>
            <button
              onClick={() => {
                dispatch(StartQuiz(true));
              }}
              className="button-style text-black font-bold bg-[#ffc107]	"
            >
              Start
            </button>
          </div>
          {/* image for quiz */}
          <div className="min-[767px]:basis-2/4	">
            <img
              src={listanswer}
              alt="photo of gif about list and check some answer"
              className="rounded-xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Start;
