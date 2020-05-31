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

function calculateResult(calculationRequestArray) {
  console.log('Calc is ', calculationRequestArray);
  calculationHistory.push(' something + something else');
  return 'answer';
}

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

module.exports = (calculateResult);
