const express = require('express');
const router = express.Router();

if (typeof localStorage === "undefined" || localStorage === null) {
    let LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./scratch');
}

/* GET home page. */
router.get('/', function (req, res) {
    res.render('gemeente', {title: 'SocialCoin | Gemeente'});
});

router.post('/', function (req, res) {
    localStorage.setItem('Walletadres', req.body.walletaddressgemeente);
    localStorage.setItem('ingelogd', 'gemeente');
    res.render('gemeente', {title: 'SocialCoin | Schuldhebbende'});
});

module.exports = router;
