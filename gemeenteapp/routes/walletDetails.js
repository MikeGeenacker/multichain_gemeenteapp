const express = require('express');
const router = express.Router();
const multichain = require("multichain-node")({
    port: 7348,
    host: '136.144.155.184',
    user: "multichainrpc",
    pass: "uPc6civWyGanmrmAgn3Tn9pPgYR3noMQt9nPMun9GeD"
});

router.get('/', function (req, res) {
    multichain.listPermissions({
        permissions: 'all',
        addresses: req.query.address,
        verbose: false
    }, (err, addressPermissions) => {
        if (err) throw err;
        multichain.getAddressBalances({
            address: req.query.address,
            minconf: 1,
            includeLocked: false
        }, (err, balance) => {
            if (err) console.log(err);

            if (balance[0] === undefined) {
                res.render('walletDetails', {
                    permissions: addressPermissions,
                    title: 'Wallet details',
                    address: req.query.address,
                    balance: 0
                });
            } else {
                res.render('walletDetails', {
                    permissions: addressPermissions,
                    title: 'Wallet details',
                    address: req.query.address,
                    balance: balance[0].qty
                });
            }
        });
    });
});

module.exports = router;