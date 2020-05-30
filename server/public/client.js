$(document).ready(runTheseFunctions);

const calculationsArray = [];
const operationKeys = ['+', '-', 'x', 'X', '*', '/'];
// Only one "." can be entered per number on one side of the operator so if a "." is
// entered this will be set to false ("40.4" false, "40.4+" true "40.4-34.2" false).
let canEnterAnotherPeriod = true;

function runTheseFunctions() {
  // Check if the character the user is trying to enter are valid.
  $('#inputNumbersField').on('keydown', checkIfInputIsValid);
  $('#calculateButton').on('click', checkValidInputThenCalculate);
}

function checkIfInputIsValid(event) {
  // Array of the string values for allowed keys.
  const key = event.key;
  const allowedKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
    'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];
  if (key === 'Enter') {
    checkValidInputThenCalculate();
  // If the input is 'C' clear the box and calculations array.
  } else if (key === 'c' || key === 'C') {
    $('#inputNumbersField').val('');
    calculationsArray.length = 0;
    canEnterAnotherPeriod = true;
    event.preventDefault();
  // If the user deleted a period so allow them to enter it again.
  } else if (key === 'Backspace') {
    if (calculationsArray[calculationsArray.length - 1] === '.') {
      canEnterAnotherPeriod = true;
    }
    calculationsArray.pop();
  // The user may have entered '*', but treat it as if they entered 'x';
  } else if (key === '*' || key === 'x' || key === 'X') {
    $('#inputNumbersField').val($('#inputNumbersField').val() + 'x');
    calculationsArray.push('x');
    canEnterAnotherPeriod = false;
    event.preventDefault();
  // The user entered another operator (like +) so allow them to add another period.
  } else if (operationKeys.includes(key)) {
    canEnterAnotherPeriod = true;
    calculationsArray.push(key);
  // The user entered "." so prevent them from entering any more "."
  // (unless the enter an operator).
  } else if (key === '.') {
    if (canEnterAnotherPeriod === true) {
      canEnterAnotherPeriod = false;
      calculationsArray.push(key);
    } else {
      event.preventDefault();
    }
  } else {
    const enteredAValidKey = allowedKeys.concat(operationKeys).some(allowedKey => key === allowedKey);
    if (enteredAValidKey === false) {
      event.preventDefault();
    } else {
      calculationsArray.push(key);
    }
  }
}

function checkValidInputThenCalculate() {
  console.log(calculationsArray);
  const inputNumbersFieldVal = $('#inputNumbersField').val();
  // Confirm there's an operator to perform a calculation on.
  const includesAnOperator = operationKeys.some(operator => inputNumbersFieldVal.includes(operator));
  console.log(includesAnOperator);
  if (includesAnOperator === false) {
    console.log('Error, an operator must be entered for a calculation to be performed.');
  }
  const firstArgumentIsAnOperator = operationKeys[0].some(operator => inputNumbersFieldVal.includes(operator));
  const hasSecondArgument = operationKeys.concat('.').some(operator => inputNumbersFieldVal.includes(operator));
  console.log(hasFirstArgument);
  if () {

  }
}
