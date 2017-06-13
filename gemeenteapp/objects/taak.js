var express= require('express');
var async = require('async');
var multichain = require('multichain-node') ({
	port: 7348,
	host: '136.144.155.184',
	user: 'multichainrpc',
	pass: 'uPc6civWyGanmrmAgn3Tn9pPgYR3noMQt9nPMun9GeD'
});
var localStorage = require('localStorage');

var taak = function() {
	this.getVoorSchuldhebbende = function(schuldhebbende_adr, callback) {
		var streamsVanSchuldhebbende = [];
		multichain.listStreams((err, streams) => {
			if(err) console.log(err);
			// console.log(streams);
			for(let i =0; i < streams.length; i++) {
				if(streams[i].name == 'root'){
					console.log('root');
				}
				if(streams[i].name != 'root'){
					this.get(streams[i].name, function(taken) {
						let nieuwsteTaak = taken[taken.length-1];
						if(nieuwsteTaak.schulhebbende == schuldhebbende_adr)
							streamsVanSchuldhebbende.push(streams[i]);
					});
				}
			}
			// console.log(streamsVanSchuldhebbende);
			callback(streamsVanSchuldhebbende);
		});
		
	},

    this.get = function (streamnaam, callback2) {
        multichain.listStreamItems({stream: streamnaam, verbose: false}, (err, items) => {
            if (err)console.log(err);

            var taken = [];
            async.forEach(items, function (item, callback) {
                    multichain.getWalletTransaction({txid: item.txid}, (err, transaction) => {
                        if (err) throw err;
                        // per item
                        let _taak = {};
                        _taak.data = new Buffer(item.data, 'hex').toString('utf8');
                        _taak.data = trimData(_taak.data);
                        _taak.data = JSON.parse(_taak.data);
                        _taak.data.timestamp = new Date(transaction.time * 1000);
                        _taak = vormTaak(_taak.data);
                        taken.push(_taak);
                        taken.naam = streamnaam;
                        callback();
                    })
                },
                function (err) {
                    // iterating klaar
                    taken.push(historyNaarTaak(taken));
                    callback2(taken);
                });
        })

    },
        this.create = function (taak, callback) {
            var locals = {};
            async.series([
                    function (callback) {
                        var createdObj = {
                            from: taak.user,
                            name: taak.naam,
                            open: true
                        };
                        multichain.create(createdObj, (err, address) => {
                            if (err) console.log(err);
                            locals.address = address;
                            callback();
                        });
                    },
                    function (callback) {
                        multichain.subscribe({stream: locals.address}, (err) => {
                            if (err) throw err;
                            callback();
                        });
                    },
                    function (callback) {
                        var details = {
                            "beschrijving": taak.beschrijving,
                            "beloning": taak.beloning,
                            "looptijd": taak.looptijd,
                            "schuldhebbende": taak.schuldhebbende,
                            "status": "open",
                            "voortgang": "0"
                        };
                        details = new Buffer(JSON.stringify(details)).toString("hex");
                        multichain.publishFrom({
                            from: taak.user,
                            key: "",
                            stream: taak.naam,
                            data: details
                        }, (err, item) => {
                            if (err) console.log(JSON.stringify(err));
                            callback();
                        });
                    }
                ],
                function (err, result) {
                    // hier is alles gedaan
                    callback(taak);
                });

        },
        this.update = function (taaknaam, details, callback) {
					let laatsteElem;
            this.get(taaknaam, function (taken) {
							laatsteElem = taken.length-1;
                if ( (taken[laatsteElem].schuldhebbende != details.schuldhebbende) && (taken[laatsteElem].schuldhebbende != '') ) {
                    multichain.grant({
                        addresses: details.schuldhebbende,
                        permissions: taaknaam + '.write'
                    }, (err, info) => {
                        if (err) console.log(err);
												updateTaak(taaknaam, details, taken[laatsteElem]);
                    });
                    multichain.revoke({
                        addresses: taken[laatsteElem].schuldhebbende,
                        permissions: taaknaam + '.write'
                    }, (err, info) => {
                        if (err) console.log(err);
                    });
                }else if( (taken[laatsteElem].schuldhebbende != details.schuldhebbende)  && (taken[laatsteElem].schuldhebbende == '') ) {
                    multichain.grant({
                        addresses: details.schuldhebbende,
                        permissions: taaknaam + '.write'
                    }, (err, info) => {
                        if (err) console.log(err);
												updateTaak(taaknaam, details, taken[laatsteElem]);
                    });

				}else  {
                    updateTaak(taaknaam, details, taken[laatsteElem]);
                };
                callback();
            });

        };
    function trimData(data) {
        data = data.replace(/(?:\r\n|\r|\n)/g, '');
        return data;
    }

    function updateTaak(taaknaam, details, oudetaak){
        var newdetails = {};
			  Object.keys(details).forEach(function(key, index) {	
					details[key]=strcpyreplace(oudetaak[key], details[key]);
				//	console.log('O(' + key + '):' + oudetaak[key]);
				//	console.log('N(' + key + '):' + details[key]);
				});
        newdetails = new Buffer(JSON.stringify(details)).toString("hex");
        multichain.publishFrom({
            from: localStorage.getItem('Walletadresgemeente'),
            key: "",
            stream: taaknaam,
            data: newdetails
        }, (err, item) => {
						if (err) console.log(JSON.stringify(err));
        });
	}

    function historyNaarTaak(taakHistoryArr) {
        let finishedTaak = {};
        taakHistoryArr.sort(function (a, b) {
            return new Date(b.timestamp) - new Date(a.timestamp);
        });
        taakHistoryArr.reverse();
        for (let i = 0; i < taakHistoryArr.length; i++) {
            // Vul initiele taakdeel in
            if (i == 0) {
                finishedTaak = vormTaak(taakHistoryArr[i])
            } else {
                finishedTaak.schuldhebbende = taakHistoryArr[i].schuldhebbende || finishedTaak.schuldhebbende;
                finishedTaak.beloning = taakHistoryArr[i].beloning || finishedTaak.beloning;
                finishedTaak.status = taakHistoryArr[i].status || finishedTaak.status;
                finishedTaak.beschrijving = taakHistoryArr[i].beschrijving || finishedTaak.beschrijving;
                finishedTaak.voortgang = taakHistoryArr[i].voortgang || finishedTaak.voortgang;
                // finishedTaak.timestamp = taakHistoryArr[i].timestamp || finishedTaak.timestamp;
                if(taakHistoryArr[i].timestamp - taakHistoryArr[i-1].timestamp > 0) {
                    finishedTaak.timestamp = taakHistoryArr[i].timestamp;

                } else if(taakHistoryArr[i].timestamp - taakHistoryArr[i-1].timestamp <0) {
                    finishedTaak.timestamp =taakHistoryArr[i-1].timestamp;
                } else {
                    finishedTaak.timestamp =taakHistoryArr[i].timestamp;
                }

            }
        }
        return finishedTaak;
    }

	  function strcpyreplace(oud, nieuw) {
			if(oud != nieuw && nieuw.trim() != '')
				return nieuw;
			else 
				return oud;
		}
    function vormTaak(data) {
        let _taak = {};
        _taak.schuldhebbende = data.schuldhebbende;
        _taak.beloning = data.beloning;
        _taak.beschrijving = data.beschrijving;
        _taak.status = data.status;
        _taak.voortgang = data.voortgang;
        _taak.timestamp = data.timestamp;
        return _taak;
    }
}
module.exports = taak;
