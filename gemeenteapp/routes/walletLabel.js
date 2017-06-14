const express = require('express');
const router = express.Router();
const multichain = require("multichain-node")({
    port: 7348,
    host: '136.144.155.184',
    user: "multichainrpc",
    pass: "uPc6civWyGanmrmAgn3Tn9pPgYR3noMQt9nPMun9GeD"
});

router.get('/', function (req, res) {
    let labellingTry = false;
    res.render('walletLabel', {labellingTry: labellingTry});
});

router.post('/', function (req, res) {

    let label = new Buffer(req.body.addressLabel, 'utf8').toString('hex');
    let adres = req.body.address;

    multichain.grant({addresses: req.body.address, permissions: "send"}, (err) => { // temporary grant send
        if (err) throw err;
        multichain.publish({from: req.body.address, stream: 'root', key: '', data: label}, (err) => { //set label
            if (err) throw err;
            multichain.revoke({addresses: req.body.address, permissions: "send"}, (err) => { //remove temporary send
                if (err) throw err;
                res.render('walletLabel', {
                    adres: adres,
                    label: req.body.addressLabel,
                    labelSet: true
                });
            });
        });
    });
});

module.exports = router;
