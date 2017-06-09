const express = require('express');
const router = express.Router();
const multichain = require("multichain-node")({
    port: 7348,
    host: '136.144.155.184',
    user: "multichainrpc",
    pass: "uPc6civWyGanmrmAgn3Tn9pPgYR3noMQt9nPMun9GeD"
});

router.get('/', function (req, res) {

    res.render('transaction', {transactionTry: false});
});

router.post('/', function (req, res) {
    multichain.sendAssetFrom({
        from: req.body.senderAddress,
        to: req.body.receiverAddress,
        asset: 'TEST',
        qty: parseInt(req.body.amountToSend)
    }, (err, sendAssetReturn) => {
        if (err) {
            console.log(req.body);
            throw err;
        }
        res.render('transaction', {
            transactionTry: true,
            result: sendAssetReturn,
            sender: req.body.senderAddress,
            receiver: req.body.receiverAddress,
            amount: req.body.amountToSend
        });

    })
});

module.exports = router;
