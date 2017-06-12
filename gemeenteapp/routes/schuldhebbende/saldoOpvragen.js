const express = require('express');
const router = express.Router();
const multichain = require("multichain-node")({
    port: 7348,
    host: '136.144.155.184',
    user: "multichainrpc",
    pass: "uPc6civWyGanmrmAgn3Tn9pPgYR3noMQt9nPMun9GeD"
});

if (typeof localStorage === "undefined" || localStorage === null) {
    var LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./scratch');
};

/*router.get('/', function(req, res, next) {
        res.render('saldoOpvragen');
});*/

router.get('/', function(req, res, next) {
    var walletaddress = localStorage.getItem('Walletadres');
    console.log('walletadres' + walletaddress);
    multichain.getAddressBalances({address : walletaddress, minconf: 0},(err, address) => {
        console.log('adres: ' + address);
        var saldo = address[0].qty;
        var percentageschuld = parseInt((saldo/1000) *100);

        if(err || address.length <= 0){
            res.render('schuldhebbende/saldoOpvragen', {err : 'Wallet bevat geen saldo of wallet bestaat niet.'});
        }
        else{
            console.log(address);
            res.render('schuldhebbende/saldoOpvragen', {asset : address[0].name, quantity : address[0].qty, walletaddress: walletaddress, percentage: percentageschuld});
        }

    })
});



module.exports = router;