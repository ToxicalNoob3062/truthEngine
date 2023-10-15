import { useRef, useState } from "react";
import Checker from "../engine/checker";
import Analyzer from "../engine/parenthesis";
import PopupComponent from "./popup";
import HistoryComponent from "./history";
import Alert from "./alert";
import CardComponent from "./card";
import TableComponent from "./table";
import { signOut } from "next-auth/react";

// utility function
function isNotEmptyObject(obj: Object) {
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      return true;
    }
  }
  return false;
}

function addInHistory(exp: string) {
  // Retrieve the existing history from local storage
  const jsonString = localStorage.getItem("history");
  const history = jsonString ? JSON.parse(jsonString) : [];

  // Check if the expression already exists in the history
  const index = history.indexOf(exp);

  if (index !== -1) {
    // If it exists, remove it from its current position
    history.splice(index, 1);
  }

  // Add the expression to the beginning of the history
  history.unshift(exp);

  // Ensure that the history array only contains the 10 most recent expressions
  if (history.length > 10) {
    history.pop(); // Remove the oldest expression
  }

  // Convert the history array to JSON
  const historyJSON = JSON.stringify(history);

  // Store the updated history in local storage
  localStorage.setItem("history", historyJSON);
}

export default function Software() {
  const input = useRef(null);
  // const { data: session } = useSession();
  const [truthTable, setTable] = useState({});
  const [scanResults, setScanResults] = useState(new Checker(""));

  // console.log(session);

  function onGenerate() {
    const inputValue = input.current.value;
    const newScanResults = new Checker(inputValue);
    if (newScanResults.isCorrect) {
      if (newScanResults.exp !== "") addInHistory(newScanResults.exp);
      const expression = new Analyzer(newScanResults.exp);
      for (let key in expression.variableHash) {
        for (let elem of expression.inputSets) {
          const val = elem[expression.variableHash[key]];
          expression.solutionMap[key]
            ? expression.solutionMap[key].push(val)
            : (expression.solutionMap[key] = [val]);
        }
      }
      expression.createTruthTable();
      setTable(expression);
    } else {
      setTable({});
    }
    setScanResults(newScanResults);
  }
  return (
    <>
      <div className="w-full flex p-4">
        <input
          type="text"
          ref={input}
          placeholder="Enter expression"
          className="w-full p-2 rounded-l-md border border-gray-300 focus:outline-none focus:border-blue-500 font-bold"
        />
        <button
          id="generate"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r-md"
          onClick={onGenerate}
          type="button"
        >
          Generate
        </button>
      </div>
      <button
        className="mx-auto absolute top-2 right-1"
        type="button"
        onClick={() => signOut()}
      >
        <img className="w-8" src="logOut.png" />
      </button>
      <PopupComponent />
      <HistoryComponent />
      <Alert msg={scanResults.incorrectFor} state={scanResults.isCorrect} />
      {isNotEmptyObject((truthTable as Analyzer)?.solutionMap) ? (
        <TableComponent expression={truthTable as Analyzer} />
      ) : (
        <CardComponent />
      )}
    </>
  );
}
