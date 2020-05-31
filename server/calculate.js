const math = require('mathjs');
const calculationHistory = require('./public/calculations');
const operators = require('./operators');

function calculateResult(calculationRequestArray) {
  // if (typeof calculationRequestArray !== 'string') {
  //   console.log(`Error, the calculation to perform must be a string input, not "${calculationRequestArray}"`);
  //   return null;
  // }
  if (calculationRequestArray.join('') === '42') {
    calculationHistory.push(calculationRequestArray.join(''));
    return 'The Meaning Of Life!';
  } else {
    // Example input: ['2', '+', '2'];
    // The input won't have any spaces in it, but to calculate correctly math.js needs
    // spaces around operators so loop through the input array and if it's an operator
    // add spaces around it ['2', '+', '2'] ==> ['2',  ' + ', '2']
    const historyFormattedArray = [];
    calculationRequestArray.map(calcArg => {
      if (operators.some(op => op === calcArg)) {
        historyFormattedArray.push(` ${calcArg} `);
      } else {
        historyFormattedArray.push(calcArg);
      }
    });
    // Since I wanted to use "x" instead of "*" loop through and change any "x" to a "*"
    // so it can calculate the answer.
    let calculationFormattedArray = [];
    if (historyFormattedArray.some(elem => elem === ' x ') === true) {
      historyFormattedArray.map(element => {
        if (element === ' x ') {
          calculationFormattedArray.push(' * ');
        } else {
          calculationFormattedArray.push(element);
        }
      });
    } else {
      calculationFormattedArray = historyFormattedArray;
    }
    // Push in x's instead of *'s to the history.
    calculationHistory.push(historyFormattedArray.join(''));
    const calculationFormattedString = calculationFormattedArray.join('');
    const solution = math.evaluate(calculationFormattedString);
    // Don't divide by 0!
    if (solution === Infinity || solution === -Infinity) {
      return 'Error';
    } else {
      return solution;
    }
  }
}

module.exports = calculateResult;
