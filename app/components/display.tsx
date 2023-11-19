import React from "react";

interface DisplayComponentProps {
  isOpen: boolean;
  togglePopup: () => void;
  popupText: string;
}

const DisplayComponent: React.FC<DisplayComponentProps> = ({
  isOpen,
  togglePopup,
  popupText,
}) => {
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex justify-center items-center z-50">
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black opacity-50"
            onClick={togglePopup}
          ></div>

          {/* Popup Content */}
          <div className="p-4 bg-white w-[96%] sm:w-[65%] md:w-[40%] lg:w-[30%] rounded-lg shadow-lg absolute top-2/4 left-2/4 transform -translate-x-2/4 -translate-y-2/4">
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
            <h2 className="text-xl font-semibold mb-4">Solve Steps: </h2>
            <div
              className="max-h-96 overflow-y-auto text-justify" // Adjust the max-h value to set the maximum height before scrolling
              style={{ whiteSpace: "pre-line" }}
            >
              <p className="text-gray-700">{popupText}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DisplayComponent;
