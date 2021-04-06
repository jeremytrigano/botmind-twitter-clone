import bcrypt from 'bcryptjs';
import express from 'express';
import Joi from 'joi';
import db from '../db/connection';

const users = db.get('users');
users.createIndex('username', { unique: true });

const router = express.Router();

const schema = Joi.object().keys({
  username: Joi.string()
    .regex(/(^[a-zA-Z0-9_]+$)/)
    .min(2)
    .max(30)
    .required(),
  // tslint:disable-next-line: object-literal-sort-keys
  password: Joi.string().trim().min(10).required(),
});

router.get('/', (req, res) => {
  res.json({
    message: '🔐',
  });
});

router.post('/userid', (req, res, next) => {
  users
    .findOne({
      username: req.body.username,
    })
    .then((user) => {
      if (user) {
        res.json({ id: user._id });
      } else {
        const error = new Error('No user found');
        res.status(409);
        next(error);
      }
    });
});

router.post('/signup', (req, res, next) => {
  schema
    .validateAsync(req.body)
    .then((val) => {
      req.body = val;
      users
        .findOne({
          username: req.body.username,
        })
        .then((user) => {
          if (user) {
            const error = new Error(
              'That username is already used. Please choose another one.'
            );
            res.status(409);
            next(error);
          } else {
            bcrypt.hash(req.body.password.trim(), 12).then((hashedPassword) => {
              const newUser = {
                username: req.body.username,
                // tslint:disable-next-line: object-literal-sort-keys
                password: hashedPassword,
              };

              users.insert(newUser).then((insertedUser) => {
                res.status(200);
                res.json({
                  username: req.body.username,
                });
              });
            });
          }
        });
    })
    .catch(() => {
      respondError422(res, next);
    });
});

router.post('/login', (req, res, next) => {
  schema
    .validateAsync(req.body)
    .then((val) => {
      req.body = val;
      users
        .findOne({
          username: req.body.username,
        })
        .then((user) => {
          if (user) {
            bcrypt.compare(req.body.password, user.password).then((result) => {
              if (result) {
                res.status(200);
                res.json({
                  username: req.body.username,
                });
              } else {
                respondError422(res, next);
              }
            });
          } else {
            respondError422(res, next);
          }
        });
    })
    .catch(() => {
      respondError422(res, next);
    });
});

router.delete('/delete/:id', (req, res, next) => {
  users
    .remove({ _id: req.params.id })
    .then((val: any) => {
      if (val.deletedCount > 0) {
        res.status(200);
        res.json({
          message: 'Account deleted',
        });
      } else {
        const error = new Error('No user deleted');
        res.status(409);
        next(error);
      }
    })
    .catch(() => {
      respondError400(res, next);
    });
});

function respondError422(res, next) {
  res.status(422);
  const error = new Error('Unable to login.');
  next(error);
}

function respondError400(res, next) {
  res.status(400);
  const error = new Error('Unable to delete.');
  next(error);
}

export default router;
