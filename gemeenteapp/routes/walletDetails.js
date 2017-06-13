var express = require('express');
var router = express.Router();
var multichain = require("multichain-node")({
    port: 7348,
    host: '136.144.155.184',
    user: "multichainrpc",
    pass: "uPc6civWyGanmrmAgn3Tn9pPgYR3noMQt9nPMun9GeD"
});

router.get('/', function(req, res, next) {
    multichain.listPermissions({permissions: 'all', addresses: req.query.address, verbose: false}, (err, addressPermissions) => {
        if(err){
            console.log(err);
            throw err;
        }
        multichain.getAddressBalances({address: req.query.address, minconf: 1, includeLocked: false}, (err, balance) => {
            if(err) {
                console.log(err);
                throw err;
            }
            console.log("Saldo: " + balance);
            if(balance[0] == null) {
                balance[0] = 0;
                console.log("Saldo: " + balance);   
                res.render('walletDetails', {
                        permissions: addressPermissions,
                        title: 'Wallet details', 
                        address: req.query.address,
                        balance: balance[0]
                })
            } else {
                res.render('walletDetails', {
                        permissions: addressPermissions,
                        title: 'Wallet details', 
                        address: req.query.address,
                        balance: balance[0].qty                
                })
            }
        })
    })
});

module.exports=router