import Expression from "./expression";

export default class Analayzer {
  solutionMap: object = {};
  variableHash: object = {};
  inputSets: string[] = [];
  exp: string;

  constructor(exp: string) {
    this.exp = exp;
    this.extractInput();
    for (let inputIndex = 0; inputIndex < this.inputSets.length; inputIndex++) {
      this.inspectBrackets(this.exp, inputIndex);
    }
  }

  private inspectBrackets(exp: string, inputIndex: number) {
    const stack: number[] = [];
    const copy = exp;
    for (let ind = 0; ind < exp.length; ind++) {
      const char = exp[ind];
      if (char === "(") {
        stack.push(ind);
      } else if (char == ")") {
        const start = stack.pop() as number;
        const content = exp.slice(start + 1, ind);
        const result = this.inspectBrackets(content, inputIndex);
        exp = this.resolveBracket(start, ind, result, exp);
        ind -= ind - start;
      }
    }
    const ans = new Expression(
      exp,
      this.variableHash,
      this.inputSets[inputIndex]
    ).exp;
    const column = this.solutionMap[copy];
    column ? column.push(ans) : (this.solutionMap[copy] = [ans]);
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

const expression = new Analayzer("(p|q)&(~q|r&p)|~r");
console.log(expression.solutionMap);
