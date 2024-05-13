import { createStore } from "redux";
import { DataReducer } from "./reducer/Quizreducer";

export const store = createStore(DataReducer);
