let operator;
let num1;
let num2;

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

function operate(operator, num1, num2) {
  if (operator === "+") {
    return add(num1, num2);
  } else if (operator === "-") {
    return subtract(num1, num2);
  } else if (operator === "*") {
    return multiply(num1, num2);
  } else if (operator === "/") {
    return divide(num1, num2);
  } else {
    throw new Error("Unsupported operator");
  }
}

const display = document.querySelector(".display");
let currentValue = "";

function updateDisplay() {
  display.textContent = currentValue || "0";
}

function handleDigitClick(e) {
  const digit = e.target.textContent;
  currentValue += digit;
  updateDisplay();
}

function handleOperatorClick(e) {
  if (currentValue === "") return; // ignore if no number yet
  num1 = parseFloat(currentValue);
  operator = e.target.textContent;
  currentValue = ""; // reset for next number input
}

function handleEqualsClick() {
  if (currentValue === "" || operator == null || num1 == null) return;
  num2 = parseFloat(currentValue);
  let result = operate(operator, num1, num2);
  currentValue = result.toString();
  updateDisplay();
  // Reset stored values for next operations
  operator = null;
  num1 = null;
  num2 = null;
}

function handleClear() {
  currentValue = "";
  operator = null;
  num1 = null;
  num2 = null;
  updateDisplay();
}

// Attach event listener for all buttons
document.querySelectorAll(".buttons button").forEach((button) => {
  const value = button.textContent;
  if (/^[0-9.]$/.test(value)) {
    button.addEventListener("click", handleDigitClick);
  } else if (value === "Clear") {
    button.addEventListener("click", handleClear);
  } else if (value === "=") {
    button.addEventListener("click", handleEqualsClick);
  } else if (["+", "-", "*", "/"].includes(value)) {
    button.addEventListener("click", handleOperatorClick);
  }
});
