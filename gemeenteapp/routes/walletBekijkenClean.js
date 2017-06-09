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
      if(err){
        throw err;
      }

      var addressPermissies;

      async.foreach(addresses, function(adresses, callback){
        multichain.listPermissions({addresses : addresses[i].address}, (err, addressPermissionsListed) =>{
          if(err){
            throw err;
          }
            async.foreach(addressPermissionsListed, function(addressPermissionsListed, callback2){
              let _permissions = {};
              _permissions.data.listed = addressPermissionsListed.type;
            },
          function(err){
            if(err){
              throw err;
            }
            callback2();
          });
          // for(var j = 0; j<addressPermissionsListed.length; j++){
          //   //voeg allemaal maar lekker toe aan Array
          //   addressPermissies[i] += addressPermissionsListed[j];
          // }

          // console.log(uiteindelijkeLijstPermissies);// anders moet ik callback doen
          // en ik heb geen idee hoe callback werkt
        });
      },
      function(err){
        if(err){
          throw err;
        }
        callback();
      });
      });
      res.render('walletBekijkenClean');
  });

  function vormPermissions(data) {
  	let _permissions ={};
  		_permissions.listed = data.listed;
  	return _permissions;
  }

  module.exports = router;
