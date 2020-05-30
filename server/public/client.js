$(document).ready(runTheseFunctions);

const calculationsArray = [];

function runTheseFunctions() {
  // Check if the character the user is trying to enter are valid.
  $('#inputNumbersField').on('keydown', checkIfInputIsValid);
  $('#calculateButton').on('click', calculate);
}

function checkIfInputIsValid(event) {
  // Array of the string values for allowed keys.
  const allowedKeys = ['.', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'Backspace',
    'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Enter'];
  const operationKeys = ['+', '-', 'x', 'X', '*', '/'];
  // If the keyboard value matches any item in the allowedKeys array enteredAValidKey =
  // true.
  const enteredOperator = operationKeys.some(allowedKey => event.key === allowedKey);
  // If the input is 'C' run the clear the input.
  if (event.key === 'c' || event.key === 'C') {
    event.preventDefault();
    clearInputBox();
  } else if (event.key === 'x' || event.key === 'X') {
    calculationsArray.push('x');
  } else {
    const enteredAValidKey = allowedKeys.some(allowedKey => event.key === allowedKey);
    if (enteredAValidKey === false) {
      event.preventDefault();
    } else {
      calculationsArray.push(event.key);
    }
  }
}

function calculate() {
  console.log(calculationsArray);
  console.log();
}

function clearInputBox() {
  $('#inputNumbersField').val('');
}