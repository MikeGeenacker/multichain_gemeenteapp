var express= require('express')
var async = require('async')
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
	this.get = function(streamnaam, callback2) {
		multichain.listStreamItems({stream: streamnaam, verbose:false}, (err, items) => {
			if(err)throw err;


			var taken = [];
			async.forEach(items, function(item, callback) {
				multichain.getWalletTransaction({txid: item.txid}, (err, transaction) => {
					if(err) throw err;
					// per item
					let _taak = {};
					_taak.data = new Buffer(item.data, 'hex').toString('utf8');
					_taak.data = trimData(_taak.data);
					_taak.data = JSON.parse(_taak.data);
					_taak.data.timestamp = new Date(transaction.time*1000);
					console.log(JSON.stringify(transaction.time));
					console.log(JSON.stringify(_taak.data.timestamp));
					_taak = vormTaak(_taak.data);
					taken.push(_taak);
					taken.naam = streamnaam;
					callback();
				})
			},
			function(err) {
				// iterating klaar
				taken.push(historyNaarTaak(taken));
				callback2(taken);
			});
		})

	},
	this.create = function(taak, callback) {
		var locals = {};
		async.series([
			function(callback) {
				var createdObj = {
					from: taak.user,
					name: taak.naam,
					open: true,
					
				};
				multichain.create(createdObj, (err, address) => {
					if(err) throw err;
					locals.address = address;
					callback();
				});
			},
			function(callback) {
				multichain.subscribe({stream: locals.address}, (err) => {
					if(err) throw err;
					console.log('SUBSCRIBED');
					callback();
				});
			},
			function(callback) {
				var details =  {
						"beschrijving": taak.beschrijving,
						"beloning": taak.beloning,
						"looptijd": taak.looptijd,
						"schuldhebbende": taak.schuldhebbende,
						"progress": "0"
					};
				details= new Buffer(JSON.stringify(details)).toString("hex");
				console.log(details);
				multichain.publishFrom({from: taak.user, key: "", stream: taak.naam, data: details}, (err, item) => {
					if(err) console.log(JSON.stringify(err));
					callback();
				});
			}
		],
			function(err,result) {
				// hier is alles gedaan
				callback(taak);
			});

	}

}
function trimData(data) {
	data= data.replace(/(?:\r\n|\r|\n)/g, '');
	return data;
}

function historyNaarTaak(taakHistoryArr) {
	let finishedTaak = {};
	for(let i =0; i < taakHistoryArr.length; i++) {
		// Vul initiele taakdeel in
		if(i==0) {
			finishedTaak = vormTaak(taakHistoryArr[i])
		} else {
			finishedTaak.schuldhebbende = taakHistoryArr[i].schuldhebbende || finishedTaak.schuldhebbende;
			finishedTaak.beloning = taakHistoryArr[i].beloning || finishedTaak.beloning;
			finishedTaak.status = taakHistoryArr[i].status || finishedTaak.status;
			finishedTaak.voortgang = taakHistoryArr[i].voortgang || finishedTaak.voortgang;
			finishedTaak.timestamp = taakHistoryArr[i].timestamp || finishedTaak.timestamp;

		}
	}
	return finishedTaak;
}
function vormTaak(data) {
	let _taak ={};
		_taak.schuldhebbende = data.schuldhebbende;
		_taak.beloning = data.beloning;
		_taak.status = data.status;
		_taak.voortgang = data.voortgang;
	  _taak.timestamp = data.timestamp;
	return _taak;
}
module.exports = taak;
