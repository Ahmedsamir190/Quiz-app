import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  CollectUserAnswer,
  CurrentQuestionIndex,
  QuestionTimer,
  UserAnswer,
  Result,
  Finished,
} from "../redux/actions/actions";
import { TbTimeDuration30 } from "react-icons/tb";
import Congratulation from "./Congratulation";
import { State } from "../redux/reducer/Quizreducer";

export default function MainPage() {
  const data = useSelector((state: State) => state.questions);
  const currentquestionindex = useSelector(
    (state: State) => state.questionindex
  );
  const useranswer = useSelector((state: State) => state.useranswer);
  const questiontime = useSelector((state: State) => state.questionTimer);
  const collectuseranswer = useSelector(
    (state: State) => state.collectuseranswer
  );
  const result = useSelector((state: State) => state.result);

  const questions = data[currentquestionindex];
  const questionsnumber = `${currentquestionindex + 1} / ${data.length}`;

  const dispatch = useDispatch();

  // This state to reach to last question and clearInterval
  const [lastQuestion, setLastQuestion] = useState(false);

  //Here i Handle collect answer and handle question timer and move to next question
  const HandleNextQuesion = () => {
    if (currentquestionindex < data.length - 1) {
      dispatch(CollectUserAnswer(useranswer));
      dispatch(CurrentQuestionIndex(currentquestionindex + 1));
      dispatch(UserAnswer(null));
      dispatch(QuestionTimer(30));
    } else {
      dispatch(CollectUserAnswer(useranswer));
    }
  };
  // To Know index of user choice
  const HandleUserAnswerIndex = (e: any) => {
    const useranswer = parseInt(e.target.dataset.index);
    dispatch(UserAnswer(useranswer));
  };

  useEffect(() => {
    const timer = setInterval(() => {
      let count = 30;
      if (questiontime === 0) {
        clearInterval(timer);
        dispatch(CurrentQuestionIndex(currentquestionindex + 1));
        dispatch(QuestionTimer(questiontime + count));
      } else if (currentquestionindex === 9 && questiontime === 1) {
        clearInterval(timer);
        // Here i try to react to last question
      } else if (lastQuestion === true) {
        clearInterval(timer);
      } else {
        dispatch(QuestionTimer(questiontime - 1));
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [dispatch, questiontime]);

  /*Handle score */
  const Score = () => {
    let NewScore = result;
    {
      useranswer === questions.correct_choice &&
        dispatch(Result(NewScore + 10));
    }
  };

  return (
    <main className="flex items-center min-[380px]:h-screen bg-slate-800 overflow-hidden">
      <div className="container mx-auto px-6 flex justify-center ">
        <div className=" pt-20 pb-5 md:px-5 rounded-xl text-white ">
          {/* timer */}
          <div className="flex justify-end ">
            {/* Here i make condition to control bg for the timer and change color  */}
            <span
              className={`bg-black ${
                questiontime === 30
                  ? "bg-black"
                  : questiontime < 10
                  ? "bg-red-800"
                  : "bg-green-700"
              }   py-2 px-2 flex items-center gap-1 rounded-md `}
            >
              {/* Here the way to show time and handle some case */}
              <TbTimeDuration30 className="text-4xl  text-white" />
              {currentquestionindex === 9 && questiontime === 1
                ? "00:00"
                : questiontime <= 9
                ? `00:0${questiontime}`
                : `00:${questiontime}`}
            </span>
          </div>
          <h3 className="text-3xl font-normal text-center mt-7 ">
            {questions.question}
          </h3>
          {/* questions index and data length */}
          <div className=" m-7 text-center">
            <span className=" font-light">{questionsnumber}</span>
          </div>
          {/*line of timer */}
          <div
            className="h-1 gradient rounded-xl -mb-1"
            style={
              currentquestionindex === 9 && questiontime === 1
                ? { width: "0%" }
                : { width: `${(questiontime / 30) * 100}%` }
            }
          ></div>
          {/* display choices */}
          <div className=" all-choice text-black ">
            {questions.choices.map((choice, index) => {
              const UserChoice = index + 1 === useranswer;
              return (
                <label
                  key={index}
                  htmlFor={`chioce-${index}`}
                  className={`border border-[#00000026] rounded-xl py-2 px-4 w-4/5 text-center bg-slate-100 ${
                    UserChoice && " gradient text-white font-bold  "
                  } cursor-pointer border-[#dcdcdc54]`}
                >
                  <input
                    id={`chioce-${index}`}
                    type={"radio"}
                    value={choice}
                    name="answer"
                    onChange={HandleUserAnswerIndex}
                    data-index={index + 1}
                    checked={UserChoice}
                    className="mr-1"
                  />
                  {choice}
                </label>
              );
            })}
          </div>
          {/* buttons */}
          <div className=" mt-10 max-[991px]:mt-8 mb-8 text-center h-6 ">
            {currentquestionindex === 9 && questiontime === 1 ? (
              // Here i make this condition for show score and display component for results
              <>
                <Congratulation />
                <button
                  onClick={() => {
                    dispatch(Finished(true));
                  }}
                  className="py-2 px-6 relative capitalize cursor-pointer text-black font-bold bg-[#ffc107] rounded-xl"
                >
                  Show Score
                </button>
              </>
            ) : (
              <>
                {useranswer === null ? (
                  // Here for first show or if the user dont choose any choices
                  <span className="  capitalize ">make a choice</span>
                ) : collectuseranswer.length === 10 ? (
                  //Here to check length for collectanswer to show user the results component
                  <>
                    <Congratulation />
                    <button
                      className="py-2 px-6 relative capitalize cursor-pointer text-black font-bold bg-[#ffc107] rounded-xl"
                      onClick={() => {
                        dispatch(Finished(true));
                      }}
                    >
                      Show Score
                    </button>
                  </>
                ) : currentquestionindex === 9 ? (
                  //here i try tp reach for last question by index to control timer if user choose a answer end timer and show end
                  <button
                    onClick={() => {
                      HandleNextQuesion();
                      Score();
                      setLastQuestion(true);
                    }}
                    className="py-2 px-8 rounded-lg text-black font-bold bg-[#ffc107] hover:bg-white hover:text-black delay-75"
                  >
                    Next
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      HandleNextQuesion();
                      Score();
                    }}
                    className="py-2 px-8 rounded-lg text-black font-bold bg-[#ffc107] hover:bg-white hover:text-black delay-75"
                  >
                    Next
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
