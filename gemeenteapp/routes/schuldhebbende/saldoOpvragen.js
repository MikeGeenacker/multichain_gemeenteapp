const express = require('express');
const router = express.Router();
const multichain = require("multichain-node")({
    port: 7348,
    host: '136.144.155.184',
    user: "multichainrpc",
    pass: "uPc6civWyGanmrmAgn3Tn9pPgYR3noMQt9nPMun9GeD"
});

if (typeof localStorage === "undefined" || localStorage === null) {
    let LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./scratch');
}

/*router.get('/', function(req, res, next) {
        res.render('saldoOpvragen');
});*/

router.get('/', function(req, res, next) {
    let walletaddress = localStorage.getItem('Walletadres');
    multichain.getAddressBalances({address : walletaddress, minconf: 0},(err, address) => {
        if(err || address.length <= 0 || typeof address === 'undefined'){
            res.render('schuldhebbende/saldoOpvragen', {err : 'Wallet bevat geen saldo of wallet bestaat niet.', error: err.message, saldo: 0});
        }
        else{
            let saldo = address[0].qty;
            let percentageschuld = parseInt((saldo/1000) *100);
            res.render('schuldhebbende/saldoOpvragen', {asset : address[0].name, quantity : address[0].qty, walletaddress: walletaddress, percentage: percentageschuld});
        }

    });
});



module.exports = router;