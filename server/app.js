const debug = require('debug')('app:startup');

const express = require('express');
const fs = require('fs');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const expressMongoDb = require('express-mongo-db');

const auth = require('./auth');
const dbApi = require('./routes/db-api');

const app = express();
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(expressMongoDb(process.env.DB_URI));

app.use('/api/db', dbApi);

// react routing (production)
var reactBase = path.resolve(__dirname, '../web/build')
if (!fs.existsSync(reactBase)) {
  throw 'missing build dir; to fix: run `npm run build` in web dir'
}

// react static files (production)
app.use('/static', express.static(path.join(reactBase, 'static')));

// by default, serve index.html (production)
var indexFile = path.join(reactBase, 'index.html')
app.use(function(req, res, next) {
  res.sendFile(indexFile, function(err) {
    next(err);
  });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  console.error(err);

  // render error json
  const status = err.status || 500;
  json = {
    'error': status
  }
  if (req.app.get('env') === 'development') {
    json.message = err.message;
  }

  res.status(status);
  res.json(json);
});

debug(`app.js loaded`);

module.exports = app;
