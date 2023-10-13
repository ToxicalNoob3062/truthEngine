import Analyzer from "../engine/parenthesis";
import ShowcaseComponent from "./showcase";

interface TableComponentProps {
  expression: Analyzer;
}

const TableComponent: React.FC<TableComponentProps> = ({ expression }) => {
  const data = expression.solutionMap;
  const keys = Object.keys(data);
  const values = Object.values(data);

  return (
    <div className="w-full p-4 overflow-x-auto">
      <div className="max-w-screen-xl mx-auto">
        <div
          className="table-container"
          style={{ width: "100%", overflowX: "auto" }}
        >
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
              {values[0].map((_, rowIndex: number) => (
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
                      <ShowcaseComponent
                        expression={expression}
                        columnHeading={keys[colIndex]}
                        inputSerial={rowIndex}
                        cellValue={value[rowIndex]}
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TableComponent;
