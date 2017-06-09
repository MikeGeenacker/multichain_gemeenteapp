var express = require('express');
var router = express.Router();
var multichain = require("multichain-node")({
  port: 7348,
  host: '136.144.155.184',
  user: "multichainrpc",
  pass: "uPc6civWyGanmrmAgn3Tn9pPgYR3noMQt9nPMun9GeD"
});

router.get('/', function(req, res, next) {
    multichain.listAddresses((err, addresses) => {
      // console.log(addresses);
      if(err){
        throw err;
      }
      // var i;
      // var j;
      // console.log(addresses);
      // console.log(addresses[0].address);
      // var addressPermissions= new Array(addresses.length).fill("");
      var addressPermissions;
      // console.log(addressPermissions);
      for(var i = 0; i<addresses.length; i++){
        // console.log(addresses[i]);
        multichain.listPermissions({addresses : addresses[i].address}, (err, addressPermissionsListed) => {
        // multichain.listPermissions({address : addresses}, (err, addressPermissionsListed) => {
          if(err){
            throw err;
          }
          // console.log(addressPermissionsListed);
          // multichain.getAddressBalances({address : addresses[i]}, (err, addressBalances) => {
          //   if(err){
          //     throw err;
          //   }
          // });
          // console.log(addressPermissionsListed.length);
          console.log(addressPermissionsListed);
          for(var j = 0; j<addressPermissionsListed.length; j++){
            if(typeof(addressPermissionsListed[j]!="undefined")) {
              if(j!=0){
                addressPermissions[i] +=", ";
                addressPermissions[i] += addressPermissionsListed[j].type;
              }else{
                addressPermissions[i] += addressPermissionsListed[j].type;
              }
            }
          }
          // addressPermissions[i] += addressPermissionsListed[i].type;
          console.log(addressPermissions);
          // console.log(addressPermissions[i]);
          // console.log(addresses[i].address);
          // console.log(addressPermissionsListed[i].type);
          // console.log("newLine");
        });
        // console.log(addresses[i]);
        // console.log(addressPermissions[i]);
      }
        // console.log(addressPermissions);
    res.render('walletBekijken');
  })
});

module.exports = router;
