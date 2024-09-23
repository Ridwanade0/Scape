let view = document.getElementById("view");
let input = [];

function createOperation(value) {
  let lastValue = input[input.length - 1];

  let operators = ["+", "-", "*", "/", "%"];
  if (input.includes(value) && operators.includes(lastValue)) {
    return;
  }
  if (value === "-" && (input.length === 0 || operators.includes(lastValue))) {
    input.push(value);
  } else if (!operators.includes(value) || !operators.includes(lastValue)) {
    input.push(value);
  }

  let operationValues = input.join("");
  view.innerText = operationValues;
}

function calculateResult(expression) {
  let numbers = [];
  let operators = [];
  let currentNumber = "";

  for (i = 0; i < expression.length; i++) {
    let char = expression[i];

    if (!isNaN(char) || char === ".") {
      currentNumber = char;
    } else {
      if (currentNumber) {
        numbers.push(parseFloat(currentNumber));
        currentNumber = "";
      }
      if (char === "-" && (i === 0 || operators.includes(expression[i - 1]))) {
        currentNumber = "-";
      } else {
        operators.push(char);
      }
    }
  }

  if (currentNumber) {
    numbers.push(parseFloat(currentNumber));
  }

  let index = 0;
  while (index < operators.length) {
    let operator = operators[index];
    if (operator === "*" || operator === "/") {
      let result =
        operator === "*"
          ? numbers[index] * numbers[index + 1]
          : numbers[index] / numbers[index + 1];
      numbers.splice(index, 2, result);
      operators.splice(index, 1);
    } else {
      index++;
    }
  }

  index = 0;
  while (index < operators.length) {
    let operator = operators[index];
    let result =
      operator === "+"
        ? numbers[index] + numbers[index + 1]
        : numbers[index] - numbers[index + 1];
    numbers.splice(index, 2, result);
    operators.splice(index, 1);
  }
  return numbers[0];
}

document.getElementById("=").addEventListener("click", () => {
  let operationValues = input.join("");
  try {
    let result = calculateResult(operationValues);
    view.innerText = result;
    input = [result];
  } catch {
    view.innerText = "Error";
  }
});

document.querySelectorAll(".controls").forEach((control) => {
  control.addEventListener("click", () => {
    createOperation(control.innerText);
  });
});
document.getElementById("clear").addEventListener("click", (e) => {
  input = [];
  view.innerText = "";
});
document.getElementById("delete").addEventListener("click", (e) => {
  input.pop();
  view.innerText = input.join("");
});
