"use client";

import { useState, useRef } from "react";
import TableComponent from "./components/table";
import Analyzer from "./engine/parenthesis";
import PopupComponent from "./components/popup";
import CardComponent from "./components/card";
import Checker from "./engine/checker";
import Alert from "./components/alert";
import HistoryComponent from "./components/history";

// utility function
function isNotEmptyObject(obj) {
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

export default function Home() {
  const input = useRef(null);
  const [truthTable, setTable] = useState({});
  const [scanResults, setScanResults] = useState(new Checker(""));
  // let expression: Analyzer;

  function onGenerate() {
    const inputValue = input.current.value;
    const newScanResults = new Checker(inputValue);
    addInHistory(newScanResults.exp);
    if (newScanResults.isCorrect) {
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
    <div className="w-full">
      <h1 className="text-5xl text-center p-3 text-blue-800 font-serif font-semibold drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
        The <span className="text-green-400">Truth</span> Engine🔥
      </h1>
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
      <PopupComponent />
      <HistoryComponent />
      <Alert msg={scanResults.incorrectFor} state={scanResults.isCorrect} />
      {isNotEmptyObject(truthTable) ? (
        <TableComponent expression={truthTable as Analyzer} />
      ) : (
        <CardComponent />
      )}
    </div>
  );
}
