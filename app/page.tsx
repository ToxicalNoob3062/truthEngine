"use client";

import { useState, useRef } from "react";
import TableComponent from "./components/table";
import Analyzer from "./engine/parenthesis";
import PopupComponent from "./components/popup";
import CardComponent from "./components/card";
import Checker from "./engine/checker";
import Alert from "./components/alert";

// utility function
function isNotEmptyObject(obj) {
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      return true;
    }
  }
  return false;
}

export default function Home() {
  const input = useRef(null);
  const [truthTable, setTable] = useState({});
  const [scanResults, setScanResults] = useState(new Checker(""));
  // let expression: Analyzer;

  function onGenerate() {
    const inputValue = input.current.value;
    const newScanResults = new Checker(inputValue);
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
      <h1 className="text-5xl text-center p-3 text-blue-800 font-serif font-semibold">
        The Truth Engine🔥
      </h1>
      <div className="w-full flex p-4">
        <input
          type="text"
          ref={input}
          placeholder="Enter expression"
          className="w-full p-2 rounded-l-md border border-gray-300 focus:outline-none focus:border-blue-500 font-bold"
        />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r-md"
          onClick={onGenerate}
          type="button"
        >
          Generate
        </button>
      </div>
      <PopupComponent />
      <Alert msg={scanResults.incorrectFor} state={scanResults.isCorrect} />
      {isNotEmptyObject(truthTable) ? (
        <TableComponent expression={truthTable as Analyzer} />
      ) : (
        <CardComponent />
      )}
    </div>
  );
}
