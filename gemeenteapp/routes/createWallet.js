var express = require('express');
var router = express.Router();
var multichain = require("multichain-node")({
  port: 7348,
  host: '136.144.155.184',
  user: "multichainrpc",
  pass: "uPc6civWyGanmrmAgn3Tn9pPgYR3noMQt9nPMun9GeD"
});

router.get('/', function(req, res, next) {
    multichain.getNewAddress((err, addressInfo) => {
      if(err){
        throw err;
      }
      var address = addressInfo;
      var permission = "connect,receive";
      multichain.grant({addresses : address, permissions : permission},(err) => {
        if(err){
          throw err;
      }

    })
    res.render('createWallet', {address : addressInfo, permission : permission});
  })
});

module.exports = router;
