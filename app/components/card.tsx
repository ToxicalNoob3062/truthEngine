// CardComponent.tsx

import React from "react";

const CardComponent: React.FC = () => {
  return (
    <div className="bg-blue-200 p-4 w-[96%] sm:w-[75%] md:w-[50%] mx-auto rounded-lg shadow-md my-4">
      <h2 className="text-2xl text-black text-center font-semibold mb-2 underline">
        About Tool
      </h2>
      <p className="text-gray-700 text-justify">
        This tool is created by{" "}
        <span className="font-bold text-red-600">Rahat</span> to help you
        understand propositional logic easily. You can enter boolean expressions
        in the input field and click the "Generate" button to see the truth
        table.
        <br />
        <br />
        Use the following symbols:
      </p>
      <ul className="list-disc pl-6 mt-2">
        <li>
          <b>~</b> is not
        </li>
        <li>
          <b>&</b> is and
        </li>
        <li>
          <b>|</b> is or
        </li>
        <li>
          <b>^</b> is xor
        </li>
        <li>
          <b>&gt;</b> is implication
        </li>
        <li>
          <b>=</b> is bi-conditional or equivalence
        </li>
        <li>
          <b>()</b> for changing order of precedence
        </li>
      </ul>
      <ol className="list-decimal pl-6 mt-2">
        <li>
          Expression in <span className="font-bold">lowercase!</span>
        </li>
        <li>
          Use <span className="font-bold">T</span> and{" "}
          <span className="font-bold">F</span> as true and false!
        </li>
        <li>
          For extra column, wrap with <span className="font-bold">()</span>!
        </li>
      </ol>
    </div>
  );
};

export default CardComponent;
