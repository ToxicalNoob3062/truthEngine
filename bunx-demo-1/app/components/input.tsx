export default function UserInput() {
  return (
    <div className="w-full flex p-4">
      <input
        type="text"
        placeholder="Enter expression"
        className="w-full p-2 rounded-l-md border border-gray-300 focus:outline-none focus:border-blue-500"
      />
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r-md"
        onClick={() => console.log()}
      >
        Generate
      </button>
    </div>
  );
}
