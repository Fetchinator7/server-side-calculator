const express = require('express');
// const calculationHistory = require('./public/calculations');
const calculateResult = require('./calculate');
const calculationHistory = require('./public/calculations');

const bodyParser = require('body-parser');
// Let's create our server object
const app = express();
const port = 5001;
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('server/public'));

let solution = 'This is supposed to be altered';

app.get('/answer', (req, res) => {
  console.log('Getting calculation result from /answer');
  res.status(200).send({ answer: solution });
});

app.get('/history', (req, res) => {
  console.log('Getting history array from /history');
  res.status(200).send(calculationHistory);
});

app.post('/calculate', (req, res) => {
  console.log('The user is posting to /calculate');
  solution = calculateResult(req.body.operationsArray);
  // performMathOperation();
  res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`listening on http://localhost:${port}`);
});
