import cors from 'cors';
import express from 'express';
import monk from 'monk';
import auth from './auth';

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

app.use('/auth', auth);

app.get('/beeps', (req, res) => {
  // tslint:disable-next-line: no-shadowed-variable
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
      content: req.body.content.toString(),
      created: new Date(),
      username: req.body.username.toString(),
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
