var express = require('express');
var router = express.Router();
var multichain = require("multichain-node")({
  port: 7348,
  host: '136.144.155.184',
  user: "multichainrpc",
  pass: "uPc6civWyGanmrmAgn3Tn9pPgYR3noMQt9nPMun9GeD"
});

router.get('/', function(req, res, next) {

    res.render('transaction', {transactionTry : false});
});

router.post('/', function(req, res, next) {
    multichain.sendAssetFrom({from : req.body.senderAddress, to : req.body.receiverAddress, asset : "TEST", qty : req.body.amountToSend},(err, sendAssetReturn) => {
console.log(req.body);
      if(err){
        throw err;
      }
    res.render('transaction', {transactionTry : true, result : sendAssetReturn, sender : req.body.senderAddress, receivers : req.body.receiverAddress, amount : req.body.amountToSend});
  })
});

module.exports = router;
