var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('schuldhebbende', {title: 'SocialCoin | Schuldhebbende'});
});

router.post('/', function (req, res, next) {
    if (typeof localStorage === "undefined" || localStorage === null) {
        var LocalStorage = require('node-localstorage').LocalStorage;
        localStorage = new LocalStorage('./scratch');
    }
    localStorage.setItem('Walletadres', req.body.walletaddress);
    localStorage.setItem('ingelogd', 'schuldhebbende');
    res.render('schuldhebbende', {title: 'SocialCoin | Schuldhebbende'});
});


module.exports = router;
