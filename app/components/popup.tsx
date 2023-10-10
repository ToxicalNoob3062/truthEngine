// PopupComponent.tsx

import React, { useState } from "react";

const PopupComponent: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Question button */}
      <button
        type="button"
        className="fixed bottom-4 right-4 p-3 rounded-full bg-blue-500 text-white hover:bg-blue-600 focus:outline-none"
        onClick={togglePopup}
      >
        ?
      </button>

      {/* Popup */}
      {isOpen && (
        <div className="fixed inset-0 flex justify-center items-center z-50">
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black opacity-50"
            onClick={togglePopup}
          ></div>

          {/* Popup Content */}
          <div
            className={`p-4 bg-white rounded-lg shadow-lg absolute top-2/4 left-2/4 transform -translate-x-2/4 -translate-y-2/4 ${
              isOpen ? "block" : "hidden"
            }`}
          >
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
              onClick={togglePopup}
            >
              <svg
                className="w-8 h-8"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
            <h2 className="text-2xl font-semibold mb-4">
              Product Usage Instructions
            </h2>
            <p className="text-gray-700">
              Here are the product usage instructions:
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
                  <b>{">"}</b> is implication
                </li>
                <li>
                  <b>=</b> is bi-conditional or equivalence!
                </li>
                <li>
                  <b>()</b> parenthesis for changing order of precedence
                </li>
              </ul>
              <br />
              Rules for input: Type the boolean expression in lowercase with no
              spaces between the expression.
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default PopupComponent;
