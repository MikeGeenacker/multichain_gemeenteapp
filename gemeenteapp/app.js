const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const index = require('./routes/index');
const gemeente = require('./routes/gemeente');
const schuldhebbende = require('./routes/schuldhebbende');
const about = require('./routes/about');

const transactieAanmaken = require('./routes/transactieAanmaken');
const walletBekijken = require('./routes/walletDetails');
const wallets = require('./routes/wallets');
const takenBekijken = require('./routes/takenBekijken');
const taakDetails = require('./routes/taken/taakDetails');
const walletLabel = require('./routes/walletLabel');
const taakAanmaken = require('./routes/taakAanmaken');

const saldoOpvragen = require('./routes/schuldhebbende/saldoOpvragen');
const takenOpvragen = require('./routes/taken/takenLijstSchuldhebbende');

const takenOverzicht = require('./routes/taken/takenOverzicht');
const taakGeschiedenis = require('./routes/taken/taakGeschiedenis');
const taakAanpassen = require('./routes/taken/taakAanpassen');
const createWallet = require('./routes/createWallet');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/gemeente', gemeente);
app.use('/schuldhebbende', schuldhebbende);
app.use('/about', about);


app.use('/transactieAanmaken', transactieAanmaken);
app.use('/walletBekijken', walletBekijken);
app.use('/gemeente/takenBekijken', takenBekijken);
app.use('/gemeente/takenBekijken/taakDetails', taakDetails);
app.use('/walletLabel', walletLabel);

app.use('/gemeente/walletDetails', walletBekijken);
app.use('/gemeente/wallets', wallets);


app.use('/gemeente/takenBekijken', takenBekijken);
app.use('/gemeente/takenBekijken/taakDetails', taakDetails);
app.use('/gemeente/taakAanmaken', taakAanmaken);

app.use('/schuldhebbende/saldo', saldoOpvragen);
app.use('/schuldhebbende/taken', takenOpvragen);

app.use('/gemeente/taken', takenOverzicht);
app.use('/gemeente/taken/geschiedenis', taakGeschiedenis);
app.use('/gemeente/taken/details', taakDetails);
app.use('/gemeente/createWallet', createWallet);
app.use('/gemeente/taken/aanpassen', taakAanpassen);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
