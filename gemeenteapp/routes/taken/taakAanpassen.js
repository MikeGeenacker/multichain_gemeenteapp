var express = require('express');
var router = express.Router();
var taak = require('../../objects/taak')

/* GET users listing. */
router.get('/', function(req, res, next) {
  	var t = new taak();
  	var details = {
  		schuldhebbende: '1T4ip6sfhjHcBDRcWKEcoCqZZWKUpcZTM4KPH4',
    	beschrijving:"VEGEN!",
			beloning:"10",
			looptijd:"2",
			status:"toegewezen",
			voortgang:"0"
  	};
	t.update('Buurtfeest', details, function(taken) {
		res.send('updated');
	});
});

module.exports = router;
