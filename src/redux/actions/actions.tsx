import {
  QUIZDATA,
  QUESTIONINDEX,
  USERANSWER,
  TIMER,
  COLLECTUSERANSWER,
  RESULT,
  QUIZSTART,
  FINISHED,
} from "../actionstype";

export const QuizData = (payload: any) => {
  return {
    type: QUIZDATA,
    payload,
  };
};

export const CurrentQuestionIndex = (payload: number) => {
  return {
    type: QUESTIONINDEX,
    payload,
  };
};

export const UserAnswer = (payload: null) => {
  return {
    type: USERANSWER,
    payload,
  };
};

export const QuestionTimer = (payload: number) => {
  return {
    type: TIMER,
    payload,
  };
};

export const CollectUserAnswer = (payload: string) => {
  return {
    type: COLLECTUSERANSWER,
    payload,
  };
};

export const Result = (payload: number) => {
  return {
    type: RESULT,
    payload,
  };
};

export const StartQuiz = (payload: boolean) => {
  return {
    type: QUIZSTART,
    payload,
  };
};

export const Finished = (payload: boolean) => {
  return {
    type: FINISHED,
    payload,
  };
};
