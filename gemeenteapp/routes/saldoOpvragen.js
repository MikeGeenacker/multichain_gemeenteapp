const express = require('express');
const router = express.Router();
const multichain = require("multichain-node")({
    port: 7348,
    host: '136.144.155.184',
    user: "multichainrpc",
    pass: "uPc6civWyGanmrmAgn3Tn9pPgYR3noMQt9nPMun9GeD"
});


router.get('/', function(req, res, next) {
        res.render('saldoOpvragen');
});

router.post('/', function(req, res, next) {
    multichain.getAddressBalances({address : req.body.address, minconf: 0},(err, address) => {
        if(err || address.length <= 0){
            res.render('saldoOpvragen', {err : 'Wallet bevat geen saldo of wallet bestaat niet.'});
        }
        else{
            res.render('saldoOpvragen', {asset : address[0].name, quantity : address[0].qty, walletaddress: req.body.address});
        }

    })
});

module.exports = router;