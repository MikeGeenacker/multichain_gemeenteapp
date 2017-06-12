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
    console.log('Get:' + walletaddress);
  res.render('index', { title: 'SocialCoin | Home', walletadres: walletaddress });
});

router.post('/', function(req, res, next) {

    localStorage.removeItem('Walletadres');
    console.log(localStorage.getItem('Walletadres'));
    walletaddress = localStorage.getItem('Walletadres');
    res.render('index', {title: 'SocialCoin | Home', walletadres: walletaddress});
});

module.exports = router;
