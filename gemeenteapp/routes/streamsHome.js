var express = require('express');
var router = express.Router();
var multichain = require("multichain-node")({
    port: 7348,
    host: '136.144.155.184',
    user: "multichainrpc",
    pass: "uPc6civWyGanmrmAgn3Tn9pPgYR3noMQt9nPMun9GeD"
});

/* GET users listing. */
router.get('/', function(req, res, next) { 
    res.render('streamsHome', {title: 'Stream beheer'});
});

module.exports = router;