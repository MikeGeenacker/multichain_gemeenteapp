var express = require('express');
var router = express.Router();
var multichain = require("multichain-node")({
    port: 7348,
    host: '136.144.155.184',
    user: "multichainrpc",
    pass: "uPc6civWyGanmrmAgn3Tn9pPgYR3noMQt9nPMun9GeD"
});


/*GET stream names*/
router.get('/', function(req, res, next) {
    multichain.listAddresses((err, addresses) => {
        if(err) {
            throw err;
        }
        res.render('wallets', {title: 'Streams', wallets: addresses});
    });
});

module.exports = router;