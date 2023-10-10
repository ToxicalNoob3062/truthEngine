// CardComponent.tsx

import React from "react";

const CardComponent: React.FC = () => {
  return (
    <div className="bg-blue-200 p-4  md:w-[60%] sm:w-[90%]   mx-auto rounded-lg shadow-md my-4">
      <h2 className="text-2xl font-semibold mb-2">
        Welcome to Propositional Logic Tool
      </h2>
      <p className="text-gray-700">
        This tool is created by Rahat to help you understand propositional logic
        easily. You can enter boolean expressions in the input field and click
        the "Generate" button to see the truth table.
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
          <b>=</b> is bi-conditional or equivalence!
        </li>
        <li>
          <b>()</b> for changing order of precedence
        </li>
      </ul>
      <p className="text-gray-700">
        Rules for input: Type the boolean expression in lowercase with no spaces
        between the expression.
      </p>
    </div>
  );
};

export default CardComponent;
