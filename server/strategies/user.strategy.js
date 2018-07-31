const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  pool.query('SELECT id, username FROM person WHERE id = $1', [id]).then((result) => {
    // Handle Errors
    const user = result && result.rows && result.rows[0];

    if (!user) {
      // user not found
      done(null, false, { message: 'Incorrect credentials.' });
    } else {
      // user found
      done(null, user);
    }
  }).catch((err) => {
    console.log('query err ', err);
    done(err);
  });
});

// Does actual work of logging in
passport.use('local', new LocalStrategy({
  passReqToCallback: true,
  usernameField: 'username',
}, ((req, username, password, done) => {
    pool.query('SELECT * FROM person WHERE username = $1', [username])
      .then((result) => {
        const user = result && result.rows && result.rows[0];
        if (user && encryptLib.comparePassword(password, user.password)) {
          // all good! Passwords match!
          done(null, user);
        } else if (user) {
          // not good! Passwords don't match!
          done(null, false, { message: 'Incorrect credentials.' });
        } else {
          // not good! No user with that name
          done(null, false);
        }
      }).catch((err) => {
        console.log('error', err);
        done(null, {});
      });
  })));

module.exports = passport;
