/* eslint no-console: 0 */

const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const chalk = require('chalk');

const app = express();

app.use(morgan('common')); // Logging
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('public'));
// app.use('/', require('./routes/index'));
app.use('/api', require('./routes/api'));

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  if (!err.status || err.status >= 500) {
    console.log(chalk.red(err));
  }
  res.json({ success: false, error: err.message });
});

module.exports = app;

