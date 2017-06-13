var express = require('express');
var router = express.Router();
var taak = require('../../objects/taak.js')
var multichain = require("multichain-node")({
    port: 7348,
    host: '136.144.155.184',
    user: "multichainrpc",
    pass: "uPc6civWyGanmrmAgn3Tn9pPgYR3noMQt9nPMun9GeD"
});
var localStorage = require('localStorage');


/*GET stream names*/
router.get('/', function(req, res, next) {
	var t = new taak();
	t.getVoorSchuldhebbende(localStorage.getItem('Walletadres') ,function(taken) {
		res.render('taken/takenLijstSchuldhebbende', {title: 'Taken Overzicht Schuldhebbende', nameList: taken});
	});
});

module.exports = router;
