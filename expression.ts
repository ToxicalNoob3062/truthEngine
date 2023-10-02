import PriorityQueue from "./priorityQueue";

//lets consider expression which are without brackets
export default class Expression {
  //will help us to evaluate expression for certain operation
  exp: string;
  variableHash: object;
  input: string;
  operatorsQueue: PriorityQueue<string>;

  //constructor function to solve a expression without bracket for single input set
  constructor(exp: string, hashes: object, input: string) {
    this.exp = exp;
    this.variableHash = hashes;
    this.input = input;
    this.arrangeOperators();
    this.solve();
  }

  private solve() {
    // console.log("Expression to solve: " + this.exp); //stating problem expression
    // console.log(`For case${i}:${this.inputSets[i]}`); //label for cases
    while (this.operatorsQueue.size() > 0) {
      const operator = this.operatorsQueue.dequeue();
      this.monsterOperator(operator as string);
    }
  }
  private monsterOperator(operator: string) {
    //let set to constant
    for (let ind = 0; ind < this.exp.length; ind++) {
      let char = this.exp[ind];
      if (char == operator) {
        const left = this.exp[ind - 1] ? this.exp[ind - 1] : "F";
        const right = this.exp[ind + 1] ? this.exp[ind + 1] : "F";
        const result = this.calculate(
          operator,
          this.searchValue(left),
          this.searchValue(right)
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
  private stringMutation(start: number, end: number, include: string) {
    let firstPart = this.exp.slice(0, start < 0 ? 0 : start);
    const lastPart = this.exp.slice(end + 1);
    return firstPart + include + lastPart;
  }
  private booleanToString(bool: boolean) {
    return bool ? "T" : "F";
  }
  private searchValue(variable: string) {
    if (variable == "T" || variable == "F") return variable;
    const variableValue = this.input[this.variableHash[variable]];
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
