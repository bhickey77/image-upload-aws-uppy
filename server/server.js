
const express = require('express');
require('dotenv').config();

const app = express();
const bodyParser = require('body-parser');

// Route includes
const postRouter = require('./routes/post.router');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/post', postRouter);

// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
