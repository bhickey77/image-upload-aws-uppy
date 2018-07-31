
const express = require('express');
require('dotenv').config();

const app = express();
const bodyParser = require('body-parser');
const sessionMiddleware = require('./modules/session-middleware');

const passport = require('./strategies/user.strategy');

// Route includes
const userRouter = require('./routes/user.router');
const imageRouter = require('./routes/image.router');
const personRouter = require('./routes/person.router');
const partnerRouter = require('./routes/partner.router');
const postRouter = require('./routes/post.router');
const mailRouter = require('./routes/mail.router');

// Body parser middleware

// const busboy = require('connect-busboy');
// const busboyBodyParser = require('busboy-body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(busboy());
// app.use(busboyBodyParser());

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/api/user', userRouter);
app.use('/api/person', personRouter);
app.use('/api/partner', partnerRouter);
app.use('/api/post', postRouter);
app.use('/api/mail', mailRouter);

// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
