import React, { useState } from "react";
import Analyzer from "../engine/parenthesis";
import DisplayComponent from "./display"; // Import the new PopupComponent
import PopupButton from "./popupButton";

interface ShowcaseComponentProps {
  cellValue: string;
  expression: Analyzer;
  columnHeading: string;
  inputSerial: number;
}

const ShowcaseComponent = ({
  cellValue,
  expression,
  columnHeading,
  inputSerial,
}: ShowcaseComponentProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [popupText, setPopupText] = useState("");

  const togglePopup = () => {
    expression.findStepsFor(columnHeading, inputSerial); // Generate text based on expression
    const someText = expression.stepsStorage;
    setPopupText(someText);
    setIsOpen(!isOpen);
  };

  return (
    <>
      <PopupButton cellValue={cellValue} onClick={togglePopup} />
      <DisplayComponent
        isOpen={isOpen}
        togglePopup={togglePopup}
        popupText={popupText}
      />
    </>
  );
};

export default ShowcaseComponent;
