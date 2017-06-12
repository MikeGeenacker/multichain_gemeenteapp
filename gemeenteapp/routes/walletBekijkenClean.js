var express = require('express');
var router = express.Router();
var async = require('async');
var wallet = require('../objects/wallet');
var multichain = require("multichain-node")({
  port: 7348,
  host: '136.144.155.184',
  user: "multichainrpc",
  pass: "uPc6civWyGanmrmAgn3Tn9pPgYR3noMQt9nPMun9GeD"
});



router.get('/', function(req, res, next) {
  var w = new wallet();
  w.test();
  w.get("walletList", function(wallet) {
    res.render('wallet', wallet);
  });
});
  // //   multichain.listAddresses((err, addresses) => {
  // //     if(err){
  // //       throw err;
  // //     }
  // //
  //     // var addressPermissions = [];
  // //
  // //     async.eachOfSeries(addresses, function(address, callback){
  // //       if(err){
  // //         throw callback(err);
  // //       }
  // //       var callback = callback();
  // //       console.log(callback);
  // //       console.log(JSON.stringify(callback));
  // //     });
  // //   });
  // // });
  //   multichain.listAddresses((err, addresses) => {
  //     if(err){
  //       throw err;
  //     }
  //
  //     var addressPermissies = [];
  //
  //     async.foreach(addresses, function(adresses, callback){
  //       multichain.listPermissions({addresses : addresses[i].address}, (err, addressPermissionsListed) =>{
  //         if(err){
  //           throw err;
  //         }
  //           async.foreach(addressPermissionsListed, function(addressPermissions, callback2){
  //             let _permissions = {};
  //             _permissions.data.listed = addressPermissions.type;
  //             _permissions = vormPermissions(_permissions.data);
  //             addressPermissies.push(_permissions);
  //             callback2();
  //           },
  //         function(err){
  //           if(err){
  //             throw err;
  //           }
  //         });
  //         // for(var j = 0; j<addressPermissionsListed.length; j++){
  //         //   //voeg allemaal maar lekker toe aan Array
  //         //   addressPermissies[i] += addressPermissionsListed[j];
  //         // }
  //
  //         // console.log(uiteindelijkeLijstPermissies);// anders moet ik callback doen
  //         // en ik heb geen idee hoe callback werkt
  //       });
  //     },
  //     function(err){
  //       if(err){
  //         throw err;
  //       }
  //       callback();
  //     });
  //     });
  //     console.log(JSON.stringify(_permissions));
  //     res.render('walletBekijkenClean');
  // });
  //
  // function vormPermissions(data) {
  // 	let _permissions ={};
  // 		_permissions.listed = data.listed;
  // 	return _permissions;
  // }

  module.exports = router;
