var express = require('express');
var router = express.Router();

if (typeof localStorage === "undefined" || localStorage === null) {
    var LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./scratch');
}
var walletaddress = localStorage.getItem('Walletadres');

/* GET home page. */
router.get('/', function(req, res, next) {
    walletaddress = localStorage.getItem('Walletadres');
    ingelogd  = localStorage.getItem('ingelogd');
  res.render('index', { title: 'SocialCoin | Home', walletadres: walletaddress, ingelogd : ingelogd });
});

router.post('/', function(req, res, next) {
    localStorage.removeItem('Walletadres');
    localStorage.removeItem('ingelogd');

    walletaddress = null;

    res.render('index', {title: 'SocialCoin | Home', walletadres: walletaddress});
});

module.exports = router;
