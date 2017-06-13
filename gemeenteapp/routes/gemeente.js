var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('gemeente', { title: 'SocialCoin | Gemeente' });
});

router.post('/', function(req, res, next) {
    if (typeof localStorage === "undefined" || localStorage === null) {
        var LocalStorage = require('node-localstorage').LocalStorage;
        localStorage = new LocalStorage('./scratch');
    }
    localStorage.setItem('Walletadres', req.body.walletaddressgemeente);
    localStorage.setItem('ingelogd', 'gemeente');
    res.render('gemeente', { title: 'SocialCoin | Schuldhebbende' });
});

module.exports = router;
