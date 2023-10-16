import { useState } from "react";

const HistoryComponent: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [history, setHistory] = useState<string[]>([]);

  const togglePopup = () => {
    // Toggle the popup
    setIsOpen(!isOpen);

    // Fetch history from local storage when the popup is opened
    if (!isOpen) {
      const historyFromStorage = localStorage.getItem("history");
      if (historyFromStorage) {
        setHistory(JSON.parse(historyFromStorage));
      } else {
        const defaultItem = ["((a&b)|(~c^d))>(e=f|g)"];
        localStorage.setItem("history", JSON.stringify(defaultItem));
        setHistory(defaultItem);
      }
    }
  };

  // Handle button click
  const handleButtonClick = (item: string) => {
    const btnGenerate = document.querySelector(
      "#generate"
    ) as HTMLButtonElement;
    const btnClose = document.querySelector("#close_hist") as HTMLButtonElement;
    const inputTag = document.querySelector("input") as HTMLInputElement;
    inputTag.value = item;
    btnGenerate.click();
    btnClose.click();
  };

  const removeHistoryItem = (index: number) => {
    const updatedHistory = [...history];
    updatedHistory.splice(index, 1);
    setHistory(updatedHistory);
    if (updatedHistory.length == 0) localStorage.setItem("history", "");
    else localStorage.setItem("history", JSON.stringify(updatedHistory));
  };

  return (
    <>
      <button
        type="button"
        className="fixed bottom-20 right-1 p-3 rounded-full bg-orange-500 text-white hover:bg-blue-600 focus:outline-none"
        onClick={togglePopup}
      >
        #
      </button>
      {/* Popup Content */}
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
              id="close_hist"
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
            <h2 className="text-xl font-semibold mb-4 text-center">History:</h2>
            <div className="max-h-96 overflow-y-auto text-justify">
              {history.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center p-2 bg-orange-100  rounded-md mb-2 border-2 border-black"
                >
                  <button
                    className="text-left w-full font-bold  hover:underline focus:outline-none"
                    onClick={() => handleButtonClick(item)}
                  >
                    {item}
                  </button>
                  <button
                    className="border-2 rounded-md border-red-500 text-red-500 p-2 text-sm"
                    type="button"
                    onClick={() => removeHistoryItem(index)}
                  >
                    X
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default HistoryComponent;
