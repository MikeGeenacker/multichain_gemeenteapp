var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var gemeente = require('./routes/gemeente');
var schuldhebbende = require('./routes/schuldhebbende')
var users = require('./routes/users');
var about = require('./routes/about');

var stream = require('./routes/stream');
var streamHome = require('./routes/streamsHome');
var streamCreate = require('./routes/createStream');
var streamDetails = require ('./routes/streamDetails');

var transaction = require('./routes/transaction');
var walletBekijken = require('./routes/walletDetails');
var wallets = require('./routes/wallets');
var takenBekijken = require('./routes/takenBekijken');
var taakDetails = require('./routes/taakDetails');
var walletLabel = require('./routes/walletLabel');
var taakAanmaken = require('./routes/taakAanmaken');

var saldoOpvragen = require('./routes/schuldhebbende/saldoOpvragen');

var takenOverzicht = require('./routes/taken/takenOverzicht');
var taakGeschiedenis = require('./routes/taken/taakGeschiedenis');
var taakDetails = require('./routes/taken/taakDetails');
var taakAanpassen = require('./routes/taken/taakAanpassen');
var createWallet = require('./routes/createWallet');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/gemeente', gemeente);
app.use('/schuldhebbende', schuldhebbende);
app.use('/users', users);
app.use('/about', about);

app.use('/stream', stream);
app.use('/streamHome',streamHome);
app.use('/createStream', streamCreate);
app.use('/streamDetails', streamDetails);

app.use('/transaction', transaction);
app.use('/walletBekijken', walletBekijken);
app.use('/takentest', takentest);
app.use('/walletBekijkenClean', walletBekijkenClean);
app.use('/gemeente/takenBekijken', takenBekijken);
app.use('/gemeente/takenBekijken/taakDetails', taakDetails);
app.use('/walletLabel', walletLabel);

app.use('/gemeente/walletDetails', walletBekijken);
app.use('/gemeente/wallets', wallets);


app.use('/gemeente/takenBekijken', takenBekijken);
app.use('/gemeente/takenBekijken/taakDetails', taakDetails);
app.use('/gemeente/taakAanmaken', taakAanmaken);

app.use('/schuldhebbende/saldo', saldoOpvragen);

app.use('/gemeente/taken', takenOverzicht);
app.use('/gemeente/taken/geschiedenis', taakGeschiedenis);
app.use('/gemeente/taken/details', taakDetails);
app.use('/gemeente/createWallet', createWallet);
app.use('/gemeente/taken/aanpassen', taakAanpassen);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
