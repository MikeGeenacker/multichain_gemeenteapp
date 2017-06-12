var express= require('express')
var async = require('async')
var multichain = require('multichain-node') ({
	port: 7348,
	host: '136.144.155.184',
	user: 'multichainrpc',
	pass: 'uPc6civWyGanmrmAgn3Tn9pPgYR3noMQt9nPMun9GeD'
});

var wallet = function() {
	this.naam= 'wallet',
	this.test =function () {
		console.log('test iets');
	}
  this.wallets = function(callback) {
    multichain.listAddresses((err,addresses) =>{
      if(err){
        throw err;
      }
      callback(addresses);
    });
  },
  this.get = function(addresses, callback2){
    async.forEach(addresses, function(address, callback){
      multichain.listPermissions({address : address.address}, (err, permissions) => {
        if(err){
          throw err;
        }
        let _permissionList = {};
        _permissionsList.data = JSON.parse(_permissionsList.data);
        _permissionsList.data.permission += permissions.type;
        _permissionsList = vormPermissions(_permissionsList.data);
        wallets.push(_permissionsList);
        callback();
      })
    },
    function(err){
      throw err;
    });
  },
  this.create = function(wallet, callback){
    callback();
  }
}
function vormPermissions(data){
  let _permissionsList = {};
    _permissionsList.list = data.permission;
    return _permissionsList;
}
module.exports = wallet;
