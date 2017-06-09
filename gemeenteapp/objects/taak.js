var express= require('express')
var multichain = require('multichain-node') ({
	port: 7348,
	host: '136.144.155.184',
	user: 'multichainrpc',
	pass: 'uPc6civWyGanmrmAgn3Tn9pPgYR3noMQt9nPMun9GeD'
});

var taak = function() {
	this.naam= 'iets',
	this.test =function () {
		console.log('test iets');
	}
	this.taken = function(callback) {
		multichain.getInfo((err,info) => {
			if(err)throw err;

			callback(info);
		});
	},
	this.get = function(streamnaam, callback) {
		multichain.listStreamItems({stream: streamnaam, verbose:false}, (err, items) => {
			if(err)throw err;

			//TODO iets
			// ding aanpassen enzo

			let taken = {};
			for(let i =0; i < items.length; i++) {
				let _taak = {};
				_taak.data = new Buffer(items[i].data, 'hex').toString('utf8');
				_taak.data = trimData(_taak.data);
				_taak.data = JSON.parse(_taak.data);
				_taak.naam = streamnaam;
				_taak.schuldhebbende = _taak.data.schuldhebbende;
				_taak.beloning = _taak.data.beloning;
				_taak._status = _taak.data.status;
				_taak.voortgang = _taak.data.voortgang;
				console.log(JSON.stringify(_taak.data));
			}
			callback(items);
		})
	}

}
function trimData(data) {
	data= data.replace(/(?:\r\n|\r|\n)/g, '');
	return data;
}
module.exports = taak;
