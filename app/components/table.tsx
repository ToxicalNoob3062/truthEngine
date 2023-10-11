interface TableData {
  [key: string]: string[];
}
interface TableComponentProps {
  data: TableData;
}

const TableComponent: React.FC<TableComponentProps> = ({ data }) => {
  const keys = Object.keys(data);
  const values = Object.values(data);

  return (
    <div className="w-full overflow-x-auto p-4">
      <div className="max-w-5xl mx-auto">
        <table className="min-w-full border border-gray-300 bg-white shadow-md rounded-lg">
          <thead>
            <tr className="bg-white text-black">
              <th className="border border-gray-300 p-2">#</th>
              {keys.map((key) => (
                <th key={key} className="border border-gray-300 p-2">
                  {key}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {values[0].map((_, rowIndex) => (
              <tr
                key={rowIndex}
                className={rowIndex % 2 === 0 ? "bg-gray-100" : "bg-gray-200"}
              >
                <td className="border border-gray-300 p-2">{rowIndex + 1}</td>
                {values.map((value, colIndex) => (
                  <td
                    key={colIndex}
                    className="border border-gray-300 p-2 text-center"
                  >
                    <span
                      className={
                        value[rowIndex] === "T"
                          ? "text-green-500"
                          : value[rowIndex] === "F"
                          ? "text-red-500"
                          : ""
                      }
                    >
                      {value[rowIndex]}
                    </span>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableComponent;
