const express = require('express');
const math = require('mathjs');
// const calculationHistory = require('./public/calculations');

const bodyParser = require('body-parser');
// Let's create our server object
const app = express();
const port = 5001;
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('server/public'));

app.get('/answer', (req, res) => {
  console.log('Sending response to /answer');
  res.status(200).send({ answer: solution });
});

app.get('/history', (req, res) => {
  console.log('Sending response to /history');
  res.status(200).send({ history: calculationHistory });
});

app.post('/calculate', (req, res) => {
  console.log('The user is posting to /calculate');
  console.log(req.body.operationsArray);
  performMathOperation(req.body.operationsArray);
  res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`listening on http://localhost:${port}`);
});

const calculationHistory = [];
let solution = '';
function performMathOperation(mathArray) {
  const formattedString = mathArray.join(' ');
  let calculationFormattedString = mathArray.join('');
  // TODO format strings to have spaces around the operator.
  // ('0.4 - 0.2 / 0.1*7.0')
  // Loop and if the current character is an operaotr and a space infront of and behind it.
  if (formattedString.includes('x')) {
    console.log('It includes x');
    calculationFormattedString = formattedString.replace('x', '*');
  }
  console.log(`"${calculationFormattedString}`);
  solution = math.evaluate(calculationFormattedString);
  console.log(solution);
  calculationHistory.push(formattedString);
}
