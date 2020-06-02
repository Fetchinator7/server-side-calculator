const express = require('express');
const calculateResult = require('./calculate');
const calculationHistory = require('./public/calculations');

const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5001;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('server/public'));

// Change this to the most recent answer so the average user will never see this message.
let solution = 'This is supposed to be altered';

app.get('/answer', (req, res) => {
  console.log('Getting calculation result from /answer');
  res.status(200).send({ answer: solution });
});

app.get('/history', (req, res) => {
  // (The history is updated during the calculation.)
  console.log('Getting history array from /history');
  res.status(200).send(calculationHistory);
});

app.delete('/delete', (req, res) => {
  console.log('Emptying history array for /history');
  calculationHistory.length = 0;
  res.sendStatus(204);
});

app.post('/calculate', (req, res) => {
  console.log('The user is posting to /calculate');
  solution = calculateResult(req.body.operationsArray);
  // The user tried to divide by 0 so return an error code.
  if (solution === null) {
    res.sendStatus(400);
  } else {
    res.sendStatus(200);
  }
});

app.listen(port, () => {
  console.log(`listening on http://localhost:${port}`);
});
