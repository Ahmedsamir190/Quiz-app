import { useDispatch, useSelector } from "react-redux";
import { FaRegFaceSmileBeam } from "react-icons/fa6";
import { State } from "../redux/reducer/Quizreducer";

function Results() {
  const data = useSelector((state: State) => state.questions);
  const collectuseranswer = useSelector(
    (state: State) => state.collectuseranswer
  );
  const result = useSelector((state: State) => state.result);

  const dispatch = useDispatch();

  // Create an array to store the results
  const results = [];

  // Loop through all questions
  for (let i = 0; i < data.length; i++) {
    const question = data[i];
    const userSelectedAnswerNumber = collectuseranswer[i];

    const userSelectedAnswerValue = userSelectedAnswerNumber
      ? question.choices?.[userSelectedAnswerNumber - 1]
      : "You didn't choose an answer";
    const quizCorrectChoice = question.choices[question.correct_choice - 1];

    // Check if user answer is wrong
    const isCorrect = userSelectedAnswerNumber === question.correct_choice;
    const allchoices = question.choices;

    const result = {
      question: question.question,
      userAnswer: userSelectedAnswerValue,
      correctAnswer: quizCorrectChoice,
      isCorrect: isCorrect,
      allchoices: allchoices,
    };

    // Add result to the results array
    results.push(result);
  }
  // handle button to start new quizz
  const reset = () => dispatch({ type: "RESET" });

  // Here i make a filter to arrive to for number of correct and incorrect answer
  const incorrectResults = results.filter((item) => !item.isCorrect);
  const correctResults = results.filter((item) => item.isCorrect);

  return (
    <section className="bg-slate-800  text-white p-5">
      <div className="container mx-auto sm:px-6 max-md:flex justify-center flex-wrap">
        <div className="border border-[white] p-3 md:p-8 rounded-xl	">
          {/* Bar of results and info */}
          <div>
            <ul className="flex justify-around md:bg-slate-600  p-2  md-p-4 max-md:gap-4 rounded-xl max-md:flex-col max-md:justify-center  max-md:items-center list-disc		">
              <li className=" font-black uppercase">Results :</li>
              <li className="text-[#ffc107] font-black">Score : {result}%</li>
              <li className="text-green-500">
                Correct Answers : {`${correctResults.length} / ${data.length}`}
              </li>
              <li className="text-red-500">
                Incorrect Answers :{" "}
                {`${incorrectResults.length} / ${data.length}`}
              </li>
            </ul>
          </div>
          {/* questions and user answers */}
          <div className="md:px-5 pt-12 pb-3">
            {results.map((result, index) => (
              <div
                key={index}
                className={`mb-8 ${
                  index !== 9 ? "border-b-2 border-slate-500" : ""
                } `}
              >
                <p className="mb-8 text-xl font-black	max-md:text-center">
                  {`${index + 1} -   ${result.question}`}
                </p>
                <ul>
                  {result.allchoices.map(
                    (choice: string, choiceIndex: number) => (
                      <li
                        key={choiceIndex}
                        className={`mb-8 border border-white rounded-xl py-3 px-5 ${
                          result.correctAnswer === choice
                            ? "bg-green-500"
                            : result.userAnswer === choice && "bg-red-500"
                        }`}
                      >
                        {choice}
                      </li>
                    )
                  )}
                </ul>
                <p className="mb-8">{`Your Answer : ${result.userAnswer}`}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-center m-7">
          <button
            className="button-style text-black font-bold bg-[#ffc107] flex items-center gap-3"
            onClick={reset}
          >
            Take a Quiz Again <FaRegFaceSmileBeam className=" text-2xl" />
          </button>
        </div>
      </div>
    </section>
  );
}

export default Results;
