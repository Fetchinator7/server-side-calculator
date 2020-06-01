$(document).ready(initializeQuery);

const operationKeys = ['+', '-', 'x', '/', '^'];
// const operationKeys = require('../operators');
const calculationsArray = [];
let mathOperationText = '';

function initializeQuery() {
  $('#inputNumbersField').on('keydown', checkIfInputIsValid);
  $('#add').on('click', add);
  $('#subtract').on('click', subtract);
  $('#multiply').on('click', multiply);
  $('#divide').on('click', divide);
  $('#exponent').on('click', exponent);
  $('#calculate').on('click', calculate);
  $('#clear').on('click', clearInput);
  $('#deleteHistory').on('click', deleteHistory);
  $('main').on('click', '.numberButton', checkNumber);
  $('#pastCalculations').on('click', '.solution', reRunCalculation);
}

function checkNumber(event) {
  checkValidMath(event.target.id);
}

function reRunCalculation(event) {
  const previousCalculation = $(event.target).text();
  // Remove any whitespace so it's correctly formatted to run again.
  mathOperationText = previousCalculation.replace(/\s+/g, '');
  // Append all of the characters for the previous calculation.
  for (const char of mathOperationText) {
    calculationsArray.push(char);
  }
  calculate();
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
function exponent() {
  checkValidMath('^');
}

function checkIfInputIsValid(event) {
  const key = event.key;
  // Prevent what the input is from going through and add it again if it's valid.
  event.preventDefault();
  checkValidMath(key);
}

// Only one "." can be entered per number on one side of the operator so if a "." is
// entered this will be set to false ("40.4" false, "40.4+34" true "40.4-34.2" false).
let canEnterAnotherPeriod = true;
function checkValidMath(key) {
  // Default to allow the current key to be entered.
  let allowCharacter = true;
  let inputFieldValue = $('#inputNumbersField').val();
  // Array of the string values for allowed keys.
  const allowedNumbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  // The end has an operator and the user entered a new operator so add a 0 between them.
  // e.g., if the end value is a "+" and a "-" is entered convert that to "+0-"
  const operatorPrecedesInput = operationKeys.some(allowedKey => allowedKey === inputFieldValue[inputFieldValue.length - 1]);
  if (inputFieldValue.length === 0 && key === 'Enter') {
    allowCharacter = false;
  // If it's an operator so (potentially) add a leading 0 (3.- ==> 3.0-).
  } else if (operationKeys.includes(key) === true) {
    canEnterAnotherPeriod = true;
    if (operatorPrecedesInput === true || inputFieldValue.length === 0 || calculationsArray[calculationsArray.length - 1] === '.') {
      inputFieldValue += '0';
      calculationsArray.push('0', key);
    } else {
      calculationsArray.push(key);
    }
  // The user pressed enter so run the calculation as if they had clicked the calculate button.
  } else if (key === 'Enter') {
    allowCharacter = false;
    // Set the string of the operation(s) to perform the value of the input field.
    mathOperationText = $('#inputNumbersField').val();
    calculate();
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
  // The user entered another operator (like +) so allow them to add another period.
  } else if (operationKeys.includes(key)) {
    canEnterAnotherPeriod = true;
    calculationsArray.push(key);
  // The user entered "." so prevent them from entering any more "."
  // (unless the enter an operator).
  } else if (key === '.') {
    if (canEnterAnotherPeriod === true) {
      // If the user enters a period after an operator precede it with a 0 (/. ==> /0.)
      if (operatorPrecedesInput === true || inputFieldValue.length === 0) {
        inputFieldValue += '0';
        calculationsArray.push('0', key);
      } else {
        calculationsArray.push(key);
      }
      canEnterAnotherPeriod = false;
    } else {
      allowCharacter = false;
    }
  } else {
    // If it's none of these special characters and just a plain old number allow it,
    // otherwise don't allow whatever the input was.
    const enteredAValidKey = allowedNumbers.some(allowedKey => key === allowedKey);
    if (enteredAValidKey === false) {
      allowCharacter = false;
    } else {
      calculationsArray.push(key);
    }
  }
  if (allowCharacter === true) {
    $('#inputNumbersField').val(inputFieldValue + key);
  }
  // Always set the mathOperationText value to the text on the input filed since the value
  // of the input field was altered.
  mathOperationText = $('#inputNumbersField').val();
}

function calculate() {
  // If the end doesn't have a number (because it's an operator) add a 0 (34+ ==> 34+0).
  const lastCharacter = mathOperationText[mathOperationText.length - 1];
  const theEndHasAnOperator = operationKeys.some(allowedKey => allowedKey === lastCharacter);
  if (theEndHasAnOperator === true || lastCharacter === '.') {
    calculationsArray.push('0');
    $('#inputNumbersField').val(mathOperationText + '0');
  }
  $.ajax({
    method: 'POST',
    url: '/calculate',
    data: { operationsArray: calculationsArray }
  }).then(function (response) {
    // If the calculation was successful reset everything.
    getResult();
    updatePastCalculations();
    clearInput();
  }).catch(function (response) {
    alert('Oh no, that calculation was rejected :(');
  });
}

function getResult() {
  $.ajax({
    type: 'GET',
    url: '/answer'
  }).then(function (response) {
    $('h1').html(`<h2>${response.answer}</h2>`);
  });
}

function updatePastCalculations() {
  $.ajax({
    type: 'GET',
    url: '/history'
  }).then(function (response) {
    $('#pastCalculations').empty();
    // Add a button for each past calculation (in reverse order so the most recent
    // calculation is at the top instead of being at the bottom.)
    response.reverse().map(pastCalc => $('#pastCalculations').append(`<ul><button class="solution">${pastCalc}</ul></button>`));
  });
}

function deleteHistory() {
  $.ajax({
    // I know this should be a DELETE and not a POST, but I didn't have the time to research it.
    method: 'POST',
    url: '/delete'
  }).then(function (response) {
    updatePastCalculations();
    $('h1').empty();
  }).catch(function (response) {
    alert('Oh no, that calculation was rejected :(');
  });
}
