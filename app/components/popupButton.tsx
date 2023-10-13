const PopupButton = ({ cellValue, onClick }) => {
  return (
    <button
      type="button"
      className={`p-2 cursor-pointer border-none ${
        cellValue === "T" ? "text-green-500" : "text-red-500"
      } w-full`}
      onClick={onClick}
    >
      {cellValue}
    </button>
  );
};

export default PopupButton;
