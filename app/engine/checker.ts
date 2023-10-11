export default class Checker {
  isCorrect: boolean = false;
  incorrectFor: string = "";
  exp: string;
  knownOperators = new Set(["~", "&", "|", "^", ">", "=", "(", ")"]);
  constructor(exp: string) {
    this.isCorrect = this.expressionScanner(exp);
  }
  expressionScanner(exp: string): boolean {
    //lets remove space!
    this.exp = exp.replace(/\s/g, "");
    let openBrackets = 0;
    for (let ind = 0; ind < this.exp.length; ind++) {
      const char = this.exp[ind];
      //checking if the char inside the expression is not invalid
      if (
        !this.knownOperators.has(char) &&
        !this.isVariable(char) &&
        !this.isDefault(char)
      ) {
        this.incorrectFor = `Unexpected char "${char}" inside expression!🫠`;
        return false;
      }
      //checking if varibales and operators are placed rightly inside the expression
      if (!this.characterPlacedRightly(ind)) return false;

      //resolving brackets by updating open brackets
      if (char == "(") openBrackets++;
      else if (char == ")") openBrackets--;
    }
    if (openBrackets !== 0) {
      this.incorrectFor =
        "Mismatched or misplaced brackets inside expression!😭";
      return false;
    }
    this.incorrectFor = exp
      ? "That was a digestable input! Yum!😋"
      : "I am hungry!🤤 Please feed me boolean Expressions!";
    return true;
  }
  isVariable(char: string) {
    const asci = char.charCodeAt(0);
    return asci >= 97 && asci <= 122;
  }
  isOperator(char: string) {
    return this.knownOperators.has(char) && char !== "(" && char !== ")";
  }
  isDefault(char: string) {
    return char == "T" || char == "F";
  }
  characterPlacedRightly(charInd: number): boolean {
    const char = this.exp[charInd];
    //check for operators validly placed
    if (this.isOperator(char)) {
      //for not operators
      if (char === "~") {
        const rightChar = this.exp[charInd + 1] ? this.exp[charInd + 1] : "";
        const valid =
          rightChar == "(" ||
          this.isDefault(rightChar) ||
          this.isVariable(rightChar);
        if (!valid) {
          this.incorrectFor = `After ~ operator you can't put "${rightChar}"🥹`;
          return false;
        }
        //for two input operators
      } else {
        const rightChar = this.exp[charInd + 1] ? this.exp[charInd + 1] : "";
        const leftChar = this.exp[charInd - 1] ? this.exp[charInd - 1] : "";
        const valid =
          (rightChar == "(" ||
            rightChar == "~" ||
            this.isDefault(rightChar) ||
            this.isVariable(rightChar)) &&
          (leftChar == ")" ||
            this.isDefault(leftChar) ||
            this.isVariable(leftChar));
        if (!valid) {
          this.incorrectFor = `Operator "${char}" can't have either "${rightChar}" or "${leftChar}" or both in it's both side!😿`;
          return false;
        }
      }
      //check for varibales rightly placed
    } else if (this.isVariable(char)) {
      const rightChar = this.exp[charInd + 1] ? this.exp[charInd + 1] : "";
      const leftChar = this.exp[charInd - 1] ? this.exp[charInd - 1] : "";
      const valid =
        (rightChar == ")" || rightChar == "" || this.isOperator(rightChar)) &&
        (leftChar == "(" || leftChar == "" || this.isOperator(leftChar));
      if (!valid) {
        this.incorrectFor = `Variable "${char}" can't have either "${rightChar}" or "${leftChar}" or both in it's both side!😿`;
        return false;
      }
    }
    return true;
  }
}
