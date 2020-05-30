const express = require('express');

const bodyParser = require('body-parser');
// Let's create our server object
const app = express();
const port = 5001;
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('server/public'));

app.get('/calculation', (req, res) => {
  console.log('Sending response to /calculation');
  res.status(200).send({ solution: calculationHistory[0] });
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
function performMathOperation(mathArray) {
  const solution = eval(mathArray.join(''));
  calculationHistory.push(solution);
  return solution;
}
