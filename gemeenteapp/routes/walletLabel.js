var express = require('express');
var router = express.Router();
var multichain = require("multichain-node")({
  port: 7348,
  host: '136.144.155.184',
  user: "multichainrpc",
  pass: "uPc6civWyGanmrmAgn3Tn9pPgYR3noMQt9nPMun9GeD"
});

router.get('/', function(req, res, next) {
  var labellingTry = false;
  res.render('walletLabel' , {labellingTry : labellingTry})
});

router.post('/', function(req, res, next) {
  var permissions = "send";
  var labelSet = false;
  var labellingTry = true;
  var labeldata = req.body.addressLabel;
  var label = new Buffer(labeldata, 'utf8').toString('hex');
  console.log(req.body.addressLabel);
  console.log(label);
  multichain.grant({addresses : req.body.address, permissions : permissions}, (err) => { // temporary grant send
    if(err){
      throw err;
    }
    multichain.publish({address : req.body.address, stream : 'root', key : '', data : label},(err) => { //set label
      if(err){
        throw err;
      }
      //DONT REVOKE IF HAD BEFORE CHANGING ADDRESS
      multichain.revoke({addresses : req.body.address, permissions : permissions}, (err) => { //remove temporary send
        if(err){
          throw err;
        }
        var labelSet = true;
        res.render('walletLabel', {labellingTry : labellingTry, addres : req.body.address, label : label} );
      })
    })
  })
});

module.exports = router;
