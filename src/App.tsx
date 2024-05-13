import { useSelector } from "react-redux";
import MainPage from "./components/MainPage";
import Results from "./components/Results";
import Start from "./components/Start";
import { State } from "./redux/reducer/Quizreducer";

function App() {
  const startquiz = useSelector((state: State) => state.startquiz);
  const finished = useSelector((state: State) => state.finished);

  return <>{finished ? <Results /> : startquiz ? <MainPage /> : <Start />}</>;
}
export default App;
