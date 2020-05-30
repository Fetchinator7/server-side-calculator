const express = require('express');

const bodyParser = require('body-parser');
// Let's create our server object
const app = express();
const port = 5001;
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('server/public'));

app.get('/players', (req, res) => {
  res.send(200);
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
