interface AlertProps {
  state: boolean;
  msg: string;
}

const Alert: React.FC<AlertProps> = ({ state, msg }) => {
  return (
    <div
      className={`${
        state ? "bg-green-500" : "bg-red-500"
      } text-white text-center p-4  w-auto mx-auto border-y-4 border-black`}
    >
      {msg}
    </div>
  );
};

export default Alert;
