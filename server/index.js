const express = require('express');
const cors = require('cors');
const monk = require('monk');

const app = express();

const db = monk('localhost/bipper');

db.then(() => {
  console.log('Connected correctly to MongoDB server');
});

const beeps = db.get('beeps');

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: '-beep-01011100 🤖',
  });
});

app.get('/beeps', (req, res) => {
  beeps.find().then((beeps) => {
    res.json(beeps);
  });
});

function isValidBeep(beep) {
  return (
    beep.username &&
    beep.username.toString().trim() !== '' &&
    beep.content &&
    beep.content.toString().trim() !== ''
  );
}

app.post('/beeps', (req, res) => {
  if (isValidBeep(req.body)) {
    const beep = {
      username: req.body.username.toString(),
      content: req.body.content.toString(),
      created: new Date(),
    };

    beeps
      .insert(beep)
      .then((createdBeep) => {
        res.json(createdBeep);
      })
      .catch((err) => {
        console.log('An error happened while inserting', err);
      })
      .then(() => db.close());
  } else {
    res.status(422);
    res.json({
      message: 'Hey! Name and Content are required!',
    });
  }
});

app.listen(3000, () => {
  console.log('Listening on http://localhost:3000');
});
