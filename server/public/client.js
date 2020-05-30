$(document).ready(runTheseFunctions);

const calculationsArray = [];
const operationKeys = ['+', '-', 'x', 'X', '*', '/'];
// Only one "." can be entered per number on one side of the operator so if a "." is
// entered this will be set to false ("40.4" false, "40.4+" true "40.4-34.2" false).
let canEnterAnotherPeriod = true;

function runTheseFunctions() {
  // Check if the character the user is trying to enter are valid.
  $('#inputNumbersField').on('keydown', checkIfInputIsValid);
  $('#add').on('click', add);
  $('#subtract').on('click', subtract);
  $('#multiply').on('click', multiply);
  $('#divide').on('click', divide);
  $('#calculate').on('click', calculate);
  $('#clear').on('click', clearInput);
}

function clearInput() {
  $('#inputNumbersField').val('');
  calculationsArray.length = 0;
  canEnterAnotherPeriod = true;
}
function add() {
  checkValidMath('+');
}
function subtract() {
  checkValidMath('-');
}
function multiply() {
  checkValidMath('x');
}
function divide() {
  checkValidMath('/');
}

function checkIfInputIsValid(event) {
  const key = event.key;
  event.preventDefault();
  checkValidMath(key);
}

function checkValidMath(key) {
  let allowCharacter = true;
  let inputFieldValue = $('#inputNumbersField').val();
  // Array of the string values for allowed keys.
  const allowedNumbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  // The user pressed enter so run the calculation as if they had clicked the calculate button.
  if (key === 'Enter') {
    calculate();
    allowCharacter = false;
  // If the input is 'C' clear the box and calculations array.
  } else if (key === 'c' || key === 'C') {
    clearInput();
    allowCharacter = false;
  } else if (key === 'Backspace') {
    // The user deleted a period so allow them to enter one again.
    if (calculationsArray[calculationsArray.length - 1] === '.') {
      canEnterAnotherPeriod = true;
    }
    calculationsArray.pop();
    $('#inputNumbersField').val(inputFieldValue.slice(0, -1));
    allowCharacter = false;
  // The user may have entered '*', but treat it as if they entered 'x';
  } else if (key === '*' || key === 'x' || key === 'X') {
    $('#inputNumbersField').val(inputFieldValue + 'x');
    calculationsArray.push('x');
    canEnterAnotherPeriod = false;
    allowCharacter = false;
  // The user entered another operator (like +) so allow them to add another period.
  } else if (operationKeys.includes(key)) {
    canEnterAnotherPeriod = true;
    calculationsArray.push(key);
  // The user entered "." so prevent them from entering any more "."
  // (unless the enter an operator).
  } else if (key === '.') {
    // If the user enters a period after an operator precede it with a 0 (/. ==> /0.)
    const operatorPrecedesPeriod = operationKeys.some(allowedKey => allowedKey === inputFieldValue[inputFieldValue.length - 1]);
    console.log(operatorPrecedesPeriod);
    if (canEnterAnotherPeriod === true) {
      if (operatorPrecedesPeriod === true) {
        inputFieldValue += '0';
      }
      canEnterAnotherPeriod = false;
      calculationsArray.push('0', key);
    } else {
      allowCharacter = false;
    }
  } else {
    const enteredAValidKey = allowedNumbers.concat(operationKeys).some(allowedKey => key === allowedKey);
    if (enteredAValidKey === false) {
      allowCharacter = false;
    } else {
      calculationsArray.push(key);
    }
  }
  if (allowCharacter === true) {
    $('#inputNumbersField').val(inputFieldValue + key);
  }
  console.log(calculationsArray);
}

function calculate() {
  console.log(calculationsArray);
  console.log('calculating...');
  const inputNumbersFieldVal = $('#inputNumbersField').val();
  // Confirm there's an operator to perform a calculation on.
}
