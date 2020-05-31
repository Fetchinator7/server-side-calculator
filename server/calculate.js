// const express = require('express');
// const math = require('mathjs');
// // const calculationHistory = require('./public/calculations');

// const bodyParser = require('body-parser');
// // Let's create our server object
// const app = express();
// const port = 5001;
// app.use(bodyParser.urlencoded({ extended: true }));

// app.use(express.static('server/public'));

// app.get('/answer', (req, res) => {
//   console.log('Sending response to /answer');
//   res.status(200).send({ answer: solution });
// });

// app.get('/history', (req, res) => {
//   console.log('Sending response to /history');
//   res.status(200).send({ history: calculationHistory });
// });

// app.post('/calculate', (req, res) => {
//   console.log('The user is posting to /calculate');
//   console.log(req.body.operationsArray);
//   performMathOperation(req.body.operationsArray);
//   res.sendStatus(200);
// });

// app.listen(port, () => {
//   console.log(`listening on http://localhost:${port}`);
// });

// const calculationHistory = [];
// let solution = '';
// function performMathOperation(mathArray) {
//   const formattedString = mathArray.join(' ');
//   let calculationFormattedString = mathArray.join('');
//   if (calculationFormattedString === '42') {
//     solution = 'The Meaning Of Life!';
//     return true;
//   }
//   // TODO format strings to have spaces around the operator.
//   // ('0.4 - 0.2 / 0.1 * 7.0')
//   // Loop and if the current character is an operator and a space in front of and behind it.
//   if (formattedString.includes('x')) {
//     console.log('It includes x');
//     calculationFormattedString = formattedString.replace('x', '*');
//   }
//   console.log(`"${calculationFormattedString}`);
//   solution = math.evaluate('0.4 - 0.2 / 0.1 * 7.0');
//   console.log(solution);
//   calculationHistory.push(formattedString);
// }

const math = require('mathjs');
const calculationHistory = require('./public/calculations');
const operators = require('./operators');

function calculateResult(calculationRequestArray) {
  if (typeof calculationRequestArray !== 'string') {
    console.log(`Error, the calculation to perform must be a string input, not "${calculationRequestArray}"`);
    return null;
  }
  if (calculationRequestArray.join('') === '42') {
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
    if (solution === Infinity) {
      return 'Error';
    } else {
      return solution;
    }
  }
}

module.exports = calculateResult;
