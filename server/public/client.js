$(document).ready(runTheseFunctions);

// ['+', '-', 'x', 'X', '*', '/']
const operationKeys = ['+', '-', 'x', '/'];
// const operationKeys = require('../operators');
const calculationsArray = [];

function runTheseFunctions() {
  // Check if the character the user is trying to enter are valid.
  $('#inputNumbersField').on('keydown', checkIfInputIsValid);
  $('#add').on('click', add);
  $('#subtract').on('click', subtract);
  $('#multiply').on('click', multiply);
  $('#divide').on('click', divide);
  $('#calculate').on('click', calculate);
  $('#clear').on('click', clearInput);
  $('#deleteHistory').on('click', deleteHistory);
  $('main').on('click', '.numberButton', checkNumber);
}

function checkNumber(event) {
  checkValidMath(event.target.id);
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

// Only one "." can be entered per number on one side of the operator so if a "." is
// entered this will be set to false ("40.4" false, "40.4+" true "40.4-34.2" false).
let canEnterAnotherPeriod = true;
function checkValidMath(key) {
  let allowCharacter = true;
  let inputFieldValue = $('#inputNumbersField').val();
  // Array of the string values for allowed keys.
  const allowedNumbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  // The end has an operator and the user entered a new operator so add a 0 between them.
  const operatorPrecedesInput = operationKeys.some(allowedKey => allowedKey === inputFieldValue[inputFieldValue.length - 1]);
  if (inputFieldValue.length === 0 && key === 'Enter') {
    allowCharacter = false;
  // If it's an operator (potentially) add a lead 0 (3.- ==> 3.0-).
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
  // The user entered another operator (like +) so allow them to add another period.
  } else if (operationKeys.includes(key)) {
    canEnterAnotherPeriod = true;
    calculationsArray.push(key);
  // The user entered "." so prevent them from entering any more "."
  // (unless the enter an operator).
  } else if (key === '.') {
    // If the user enters a period after an operator precede it with a 0 (/. ==> /0.)
    if (canEnterAnotherPeriod === true) {
      if (operatorPrecedesInput === true || inputFieldValue.length === 0) {
        inputFieldValue += '0';
        calculationsArray.push('0', key);
        // console.log('Hit 1');
      } else {
        calculationsArray.push(key);
        // console.log('Hit 2');
      }
      canEnterAnotherPeriod = false;
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
}

function calculate() {
  const inputFieldValue = $('#inputNumbersField').val();
  // If the end doesn't have a number (because it's an operator) add a 0 (34+ ==> 34+0).
  const lastCharacter = inputFieldValue[inputFieldValue.length - 1];
  const theEndHasAnOperator = operationKeys.some(allowedKey => allowedKey === lastCharacter);
  if (theEndHasAnOperator === true || lastCharacter === '.') {
    calculationsArray.push('0');
    $('#inputNumbersField').val(inputFieldValue + '0');
  }
  $.ajax({
    method: 'POST',
    url: '/calculate', // HTTP POST to http://localhost:5001/calculate
    // this MUST be an object -- make it here, or use one
    // that already exists!
    data: { operationsArray: calculationsArray }
  }).then(function (response) {
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
    // append data to the DOM
    $('h1').html(`<h2>${response.answer}</h2>`);
  });
}

function updatePastCalculations() {
  $.ajax({
    type: 'GET',
    url: '/history'
  }).then(function (response) {
    // append data to the DOM
    $('#pastCalculations').empty();
    response.reverse().map(pastCalc => $('#pastCalculations').append(`<ul>${pastCalc}</ul>`));
  });
}

function deleteHistory() {
  $.ajax({
    method: 'POST',
    url: '/delete'
  }).then(function (response) {
    updatePastCalculations();
  }).catch(function (response) {
    alert('Oh no, that calculation was rejected :(');
  });
}
