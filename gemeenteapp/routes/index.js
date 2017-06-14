const express = require('express');
const router = express.Router();

if (typeof localStorage === "undefined" || localStorage === null) {
    let LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./scratch');
}


/* GET home page. */
router.get('/', function (req, res) {
    let walletaddress = localStorage.getItem('Walletadres');
    let ingelogd = localStorage.getItem('ingelogd');
    res.render('index', {title: 'SocialCoin | Home', walletadres: walletaddress, ingelogd: ingelogd});
});

router.post('/', function (req, res) {
    localStorage.removeItem('Walletadres');
    localStorage.removeItem('ingelogd');

    let walletaddress = null;

    res.render('index', {title: 'SocialCoin | Home', walletadres: walletaddress});
});

module.exports = router;
