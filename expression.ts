import PriorityQueue from "./priorityQueue";

//lets consider expression which are without brackets
export default class Expression {
  //will help us to evaluate expression for certain operation
  exp: string;
  exp_copy: string;
  variableHash: object;
  inputSets: string[];
  operatorsQueue: PriorityQueue<string>;
  solveForCases: string[] = [];

  constructor(exp: string) {
    this.exp = this.exp_copy = exp;
    this.extractInput();
    this.arrangeOperators();
    this.solveExpression();
  }
  private solveExpression() {
    // console.log("Expression to solve: " + this.exp); //stating problem expression
    const priorityMultiple = this.operatorsQueue.size();
    for (let i = 0; i < this.inputSets.length; i++) {
      let repeatations: number = priorityMultiple;
      // console.log(`For case${i}:${this.inputSets[i]}`); //label for cases
      while (repeatations-- > 0) {
        const operator = this.operatorsQueue.dequeue();
        this.monsterOperator(i, operator as string);
        this.operatorsQueue.enqueue(
          operator as string,
          priorityMultiple + i + 1
        );
      }
      this.solveForCases.push(this.exp); //each is a value of the rows for a specific column!
      this.exp = this.exp_copy;
    }
  }
  private monsterOperator(setNo: number, operator: string) {
    //let set to constant
    for (let ind = 0; ind < this.exp.length; ind++) {
      let char = this.exp[ind];
      if (char == operator) {
        const left = this.exp[ind - 1] ? this.exp[ind - 1] : "F";
        const right = this.exp[ind + 1] ? this.exp[ind + 1] : "F";
        const result = this.calculate(
          operator,
          this.searchValue(left, setNo),
          this.searchValue(right, setNo)
        );
        this.exp = this.stringMutation(
          operator == "~" ? ind : ind - 1,
          ind + 1,
          result as string
        );
        operator == "~" ? (ind -= 1) : (ind -= 2);
        // console.log(this.exp); //for printing every step of a particular case!!
      }
    }
  }
  private arrangeOperators() {
    const scores = {
      "~": 1,
      "&": 2,
      "|": 3,
      "⊕": 4,
      "→": 5,
      "↔": 6,
    };
    const uniqueOperators = new Set<string>();
    for (let char of this.exp) {
      if (
        (char.charCodeAt(0) < 97 || char.charCodeAt(0) > 122) &&
        char !== "T" &&
        char !== "F"
      )
        uniqueOperators.add(char);
    }
    this.operatorsQueue = new PriorityQueue<string>();
    uniqueOperators.forEach((operator) =>
      this.operatorsQueue.enqueue(operator, scores[operator])
    );
  }
  private extractInput() {
    this.variableHash = {};
    this.inputSets = [];
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
  private stringMutation(start: number, end: number, include: string) {
    let firstPart = this.exp.slice(0, start < 0 ? 0 : start);
    const lastPart = this.exp.slice(end + 1);
    return firstPart + include + lastPart;
  }
  private booleanToString(bool: boolean) {
    return bool ? "T" : "F";
  }
  private searchValue(variable: string, setNo: number) {
    if (variable == "T" || variable == "F") return variable;
    const input = this.inputSets[setNo];
    const variableValue = input[this.variableHash[variable]];
    return variableValue;
  }
  private calculate(operator: string, left: string, right: string) {
    let leftValue: boolean = left == "T" ? true : false;
    let rightValue: boolean = right == "T" ? true : false;
    switch (operator) {
      case "~":
        return this.booleanToString(!rightValue);
      case "&":
        return this.booleanToString(leftValue && rightValue);
      case "|":
        return this.booleanToString(leftValue || rightValue);
      case "^":
        return this.booleanToString(
          (leftValue || rightValue) && !(leftValue && rightValue)
        );
      case "→":
        return this.booleanToString(!leftValue || rightValue);
      case "↔":
        return this.booleanToString(
          (leftValue && rightValue) || (!leftValue && !rightValue)
        );
    }
  }
}

const expression = new Expression("p&q&r|p");
// console.log(expression.solveForCases);
