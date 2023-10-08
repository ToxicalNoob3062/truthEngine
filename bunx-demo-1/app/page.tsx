import TableComponent from "./components/table";
import Analyzer from "./engine/parenthesis";

const input = "((a&b)|(~c^d))>(e=f|g)";
const expression = new Analyzer(input);
// let key = "";
// for (let k in expression.variableHash) key += k;
// expression.solutionMap[key] = expression.inputSets;

export default function Home() {
  for (let key in expression.variableHash) {
    for (let elem of expression.inputSets) {
      const val = elem[expression.variableHash[key]];
      expression.solutionMap[key]
        ? expression.solutionMap[key].push(val)
        : (expression.solutionMap[key] = [val]);
    }
  }
  expression.createTruthTable();
  return (
    <div>
      <TableComponent data={expression.solutionMap as {}} />;
    </div>
  );
}
