// storing values
class Calculator {
  // where to place our display text
  constructor(previousOperandTextElement, currentOperandTExtElement) {
    this.previousOperandTextElement = previousOperandTextElement;
    this.currentOperandTExtElement = currentOperandTExtElement;
    // call clear all inputs to defalut
    this.clear();
  }

  clear() {
    // remove prevous, current, operation
    this.currentOperand = "";
    this.previousOperand = "";
    // no operatons selected when cleared
    this.operaton = undefined;
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }

  // when a number is clicked it will be added to the screen
  appendNumber(number) {
    if (number === "." && this.currentOperand.includes(".")) return;
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }

  //  when operation * - / s clicked
  chooseOperation(operaton) {
    if (this.currentOperand === "") return;
    if (this.previousOperand != "") {
      this.compute();
    }
    this.operaton = operaton;
    this.previousOperand = this.currentOperand;
    this.currentOperand = " ";
  }

  // take values and compute a single value to be displayed
  compute() {
    let computation;
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);
    if (isNaN(prev) || isNaN(current)) return;
    switch (this.operaton) {
      case "+":
        computation = prev + current;
        break;
      case "-":
        computation = prev - current;
        break;
      case "*":
        computation = prev * current;
        break;
      case "/":
        computation = prev / current;
        break;
      default:
        return;
    }
    this.currentOperand = computation;
    this.operaton = undefined;
    this.previousOperand = "";
  }

  // update or values inside output
  updateDisplay() {
    this.currentOperandTExtElement.innerText = this.currentOperand;
    this.previousOperandTextElement.innerText = this.previousOperand;
  }
}

const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[ data-operation]");
const equalsButtons = document.querySelector("[data-equals]");
const deleteButtons = document.querySelector("[data-delete]");
const allClearButtons = document.querySelector("[data-all-clear]");
const previousOperandTextElement = document.querySelector("[data-previous]");
const currentOperandTExtElement = document.querySelector("[data-current]");

// create a calculator
const calculator = new Calculator(
  previousOperandTextElement,
  currentOperandTExtElement
);

// loop thru btns and add click event. add number thats inside of button
numberButtons.forEach(button => {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});

// operation button
operationButtons.forEach(button => {
  button.addEventListener("click", () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  });
});

equalsButtons.addEventListener("click", button => {
  calculator.compute();
  calculator.updateDisplay();
});

allClearButtons.addEventListener("click", button => {
  calculator.clear();
  calculator.updateDisplay();
});
