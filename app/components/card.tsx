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
        in the input field and click the{" "}
        <span className="font-bold text-blue-600">Generate</span> button to see
        the <span className="font-bold text-green-600">Truth Table</span>.
      </p>
      <br />
      <p className="bg-purple-200 p-2 text-blue-950 rounded-md">
        You can see 👀 the usage instructions by clicking on the{" "}
        <span className="font-bold text-black">❓️</span> button!
      </p>
      <br />
      <p className="bg-yellow-200 p-2 rounded-md text-red-900">
        <span className="font-bold text-black">⚠️ Disclaimer:</span> If you find
        any bugs for a valid input then you can report me with the screen-shot
        of that specific bug via this{" "}
        <a
          href="https://forms.gle/yy1gD6uR6ix2zuH69"
          className="text-purple-800"
          target="_blank"
        >
          form
        </a>
        !
      </p>
    </div>
  );
};

export default CardComponent;
