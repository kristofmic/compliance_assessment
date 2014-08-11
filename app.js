var
  config = require('./config'),
  express = require('express'),
  path = require('path'),
  app = express(),
  mongoose = require('mongoose'),
  main = require('./routes/index'),
  api = require('./routes/api');

mongoose.connect(process.env.DB_CONNECTION);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', main);
app.use('/api', api);

module.exports = app;
