const express = require('express');
const router = express.Router();
const multichain = require("multichain-node")({
    port: 7348,
    host: '136.144.155.184',
    user: "multichainrpc",
    pass: "uPc6civWyGanmrmAgn3Tn9pPgYR3noMQt9nPMun9GeD"
});

router.get('/', function (req, res) {
    res.render('taakDetails', {title: 'SocialCoin | Taak aanmaken'});
});

module.exports = router;