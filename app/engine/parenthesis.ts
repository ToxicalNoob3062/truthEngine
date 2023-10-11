import { fstat } from "fs";
import Expression from "./expression";

export default class Analyzer {
  solutionMap: object = {};
  variableHash: object = {};
  inputSets: string[] = [];
  exp: string;

  constructor(exp: string) {
    if (exp == "") return;
    if (!this.expressionHasParenthesis(exp)) this.exp = "(" + exp + ")";
    else this.exp = exp;
    this.extractInput();
  }

  expressionHasParenthesis(exp: string) {
    const safeEnds = exp[0] == "(" && exp[exp.length - 1] == ")";
    if (!safeEnds) return false;

    let fCount = 0;
    let ind: number;
    for (ind = 0; ind < exp.length; ind++) {
      const char = exp[ind];
      if (char == "(") {
        fCount++;
      } else if (char == ")") {
        fCount--;
        if (fCount == 0) break;
      }
    }
    return ind + 1 == exp.length;
  }

  createTruthTable() {
    for (let inputIndex = 0; inputIndex < this.inputSets.length; inputIndex++) {
      this.inspectBrackets(this.exp, inputIndex);
    }
  }

  findStepsFor(exp: string, inputIndex: number) {
    this.inspectBrackets("(" + exp + ")", inputIndex, true);
  }

  private inspectBrackets(
    exp: string,
    inputIndex: number,
    withSteps: boolean = false
  ) {
    const stack: number[] = [];
    const stack2: number[] = [];
    const copy = exp;
    let ind2 = 0;
    for (let ind = 0; ind < exp.length; ind++) {
      const char = exp[ind];
      if (char === "(") {
        stack.push(ind);
        stack2.push(ind2);
      } else if (char == ")") {
        const start = stack.pop() as number;
        const content = exp.slice(start + 1, ind);
        const key = copy.slice((stack2.pop() as number) + 1, ind2);
        const result = this.inspectBrackets(content, inputIndex, withSteps);
        if (withSteps) {
          console.log(
            `Processing steps for: ${key} under input of: ${this.inputSets[inputIndex]}`
          );
        } else {
          const column = this.solutionMap[key];
          column ? column.push(result) : (this.solutionMap[key] = [result]);
        }
        exp = this.resolveBracket(start, ind, result, exp);
        ind -= ind - start;
      }
      ind2++;
    }

    const ans = new Expression(
      exp,
      this.variableHash,
      this.inputSets[inputIndex],
      withSteps
    ).exp;
    return ans;
  }

  private resolveBracket(
    start: number,
    end: number,
    include: string,
    exp: string
  ) {
    let firstPart = exp.slice(0, start);
    const lastPart = exp.slice(end + 1);
    return firstPart + include + lastPart;
  }

  private extractInput() {
    let serial = 0;
    for (let char of this.exp) {
      if (char.charCodeAt(0) >= 97 && char.charCodeAt(0) <= 122) {
        if (this.variableHash[char] === undefined) {
          this.variableHash[char] = serial++;
        }
      }
    }
    const findCombinations = (pathTrack: string = "", loopNo: number = 1) => {
      if (loopNo > serial) {
        this.inputSets.push(pathTrack);
        return;
      }
      findCombinations(pathTrack + "T", loopNo + 1);
      findCombinations(pathTrack + "F", loopNo + 1);
    };
    findCombinations();
  }
}

//___________testing__________
// const input = "((a&b)|(~c^d))>(e=f|g)";
// const expression = new Analyzer(input);
// expression.createTruthTable();
// expression.findStepsFor(input, 0);
// console.log(expression.solutionMap);
// let a = [0, 0];
// for (let char of expression.solutionMap[input]) {
//   char == "T" ? a[0]++ : a[1]++;
// }
// console.log(a);
