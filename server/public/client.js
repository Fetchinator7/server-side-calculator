$(document).ready(runTheseFunctions);

const calculationsArray = [];
const operationKeys = ['+', '-', 'x', 'X', '*', '/'];
let canEnterAnotherPeriod = true;

function runTheseFunctions() {
  // Check if the character the user is trying to enter are valid.
  $('#inputNumbersField').on('keydown', checkIfInputIsValid);
  $('#calculateButton').on('click', calculate);
}

function checkIfInputIsValid(event) {
  console.log(event.key);
  // Array of the string values for allowed keys.
  const allowedKeys = ['.', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'Backspace',
    'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Enter'];
  // If the keyboard value matches any item in the allowedKeys array enteredAValidKey =
  // true.
  // If the input is 'C' run the clear the input.
  if (event.key === 'c' || event.key === 'C') {
    clearInputBox();
    calculationsArray.length = 0;
    canEnterAnotherPeriod = true;
    event.preventDefault();
  } else if (event.key === '*' || event.key === 'x' || event.key === 'X') {
    // The user may have entered '*', but treat it as if they entered 'x';
    $('#inputNumbersField').val($('#inputNumbersField').val() + 'x');
    calculationsArray.push('x');
    canEnterAnotherPeriod = false;
    event.preventDefault();
  // The user entered another operator (like +) so allow them to add another period.
  } else if (operationKeys.includes(event.key)) {
    canEnterAnotherPeriod = true;
  } else if (event.key === '.') {
    if (canEnterAnotherPeriod === true) {
      canEnterAnotherPeriod = false;
    } else {
      event.preventDefault();
    }
  } else {
    const enteredAValidKey = allowedKeys.concat(operationKeys).some(allowedKey => event.key === allowedKey);
    if (enteredAValidKey === false) {
      event.preventDefault();
    } else {
      calculationsArray.push(event.key);
    }
  }
}

function calculate() {
  console.log(calculationsArray);
  const includesAnOperator = operationKeys.includes($('#inputNumbersField').val());
  console.log(includesAnOperator);
}

function clearInputBox() {
  $('#inputNumbersField').val('');
}