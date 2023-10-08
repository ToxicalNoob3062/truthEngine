import React from "react";

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
    <div className="w-full overflow-x-auto">
      <table className="min-w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 p-2">#</th>{" "}
            {/* Serial Number Column */}
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
              className={rowIndex % 2 === 0 ? "bg-gray-50" : "bg-white"}
            >
              <td className="border border-gray-300 p-2">{rowIndex + 1}</td>{" "}
              {/* Serial Number */}
              {values.map((value, colIndex) => (
                <td key={colIndex} className="border border-gray-300 p-2">
                  {value[rowIndex]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableComponent;
