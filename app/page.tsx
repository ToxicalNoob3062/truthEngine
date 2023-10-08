"use client";
import TableComponent from "./components/table";
import Analyzer from "./engine/parenthesis";
import { useState, useRef } from "react";

//utility function
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

  function onGenerate() {
    const expression = new Analyzer(input.current.value);
    for (let key in expression.variableHash) {
      for (let elem of expression.inputSets) {
        const val = elem[expression.variableHash[key]];
        expression.solutionMap[key]
          ? expression.solutionMap[key].push(val)
          : (expression.solutionMap[key] = [val]);
      }
    }
    expression.createTruthTable();
    setTable(expression.solutionMap);
  }
  return (
    <div>
      <div className="w-full flex p-4">
        <input
          type="text"
          ref={input}
          placeholder="Enter expression"
          className="w-full p-2 rounded-l-md border border-gray-300 focus:outline-none focus:border-blue-500"
        />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r-md"
          onClick={onGenerate}
        >
          Generate
        </button>
      </div>
      {isNotEmptyObject(truthTable) && (
        <TableComponent data={truthTable as {}} />
      )}
    </div>
  );
}
