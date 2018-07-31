const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

// Handles Ajax request for user information if user is authenticated
router.get('/', rejectUnauthenticated, (req, res) => {
  // Send back user object from database
  res.send(req.user);
});

// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted
router.post('/register', (req, res, next) => {
  body = req.body;
  console.log('req: ', body);
  
  // const username = req.body.username;
//   const password = encryptLib.encryptPassword(req.body.password);

//   const queryText = `INSERT INTO person
//                      (username, first_name, last_name, date_created, date_updated, partner_id, is_verified, user_type, password)
//                      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id`;

//   const values = [body.username, body.first_name, body.last_name, body.date_created, body.date_updated, partner_id, true, 'partner', password];
  
//   pool.query(queryText, values)
//     .then(() => { res.sendStatus(201); })
//     .catch((err) => { next(err); });
});

// Handles login form authenticate/login POST
// userStrategy.authenticate('local') is middleware that we run on this route
// this middleware will run our POST if successful
// this middleware will send a 404 if not successful
router.post('/login', userStrategy.authenticate('local'), (req, res) => {
  res.sendStatus(200);
});

// clear all server session information about this user
router.get('/logout', (req, res) => {
  // Use passport's built-in method to log out the user
  req.logout();
  res.sendStatus(200);
});

module.exports = router;
