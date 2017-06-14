const express = require('express');
const router = express.Router();
const Taak = require('../../objects/taak.js');
const multichain = require("multichain-node")({
    port: 7348,
    host: '136.144.155.184',
    user: "multichainrpc",
    pass: "uPc6civWyGanmrmAgn3Tn9pPgYR3noMQt9nPMun9GeD"
});
const localStorage = require('localStorage');


/*GET stream names*/
router.get('/', function (req, res) {
    let taak = new Taak();
    taak.getVoorSchuldhebbende(localStorage.getItem('Walletadres'), function (taken) {
        res.render('taken/takenLijstSchuldhebbende', {title: 'Taken Overzicht Schuldhebbende', nameList: taken});
    });
});

module.exports = router;
