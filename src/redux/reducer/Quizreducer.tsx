import {
  COLLECTUSERANSWER,
  QUESTIONINDEX,
  QUIZDATA,
  QUIZSTART,
  RESULT,
  FINISHED,
  TIMER,
  USERANSWER,
} from "../actionstype";
import data from "../../data/data.json";

export type State = {
  questions: any;
  questionindex: number;
  useranswer: null;
  questionTimer: number;
  collectuseranswer: never[];
  result: number;
  startquiz: boolean;
  finished: boolean;
};
//  questions: {
//     question: string;
//     degree: number;
//     correct_choice: number;
//     choices: string[];
//   }[];
const intialstate = {
  questions: data.questions,
  questionindex: 0,
  useranswer: null,
  questionTimer: 30,
  collectuseranswer: [],
  result: 0,
  startquiz: false,
  finished: false,
};

export const DataReducer = (
  state: State = intialstate,
  action: { type: any; payload: any }
) => {
  switch (action.type) {
    case QUIZSTART:
      return { ...state, startquiz: action.payload };
    case QUIZDATA:
      return state.questions;
    case QUESTIONINDEX:
      return { ...state, questionindex: action.payload };
    case USERANSWER:
      return { ...state, useranswer: action.payload };
    case TIMER:
      return { ...state, questionTimer: action.payload };
    case COLLECTUSERANSWER:
      return {
        ...state,
        useranswer: action.payload,
        collectuseranswer: [...state.collectuseranswer, action.payload],
      };
    case RESULT:
      return { ...state, result: action.payload };
    case FINISHED:
      return { ...state, finished: action.payload };
    case "RESET":
      return intialstate;
    default:
      return state;
  }
};
