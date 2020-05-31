const express = require('express');

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
  performMathOperation(req.body.operationsArray);
  res.sendStatus(200);
});

// app.post('/player', (req, res) => {
//   console.log('User is trying to POST a player');
//   console.log(req.body);

//   // validate the player
//   if ((req.body.born !== undefined)) {
//     addAPlayer(req.body);
//     // tennisPlayersArray.push(req.body);
//     res.sendStatus(201); // OK! GREAT! CREATED! THANKS!
//   } else {
//     res.sendStatus(400); // BAD REQUEST
//   }
// });

app.listen(port, () => {
  console.log(`listening on http://localhost:${port}`);
});

const calculationHistory = [];
let solution = '';
function performMathOperation(mathArray) {
  const sol = eval(mathArray.join(''));
  calculationHistory.push(sol);
  solution = sol;
}
