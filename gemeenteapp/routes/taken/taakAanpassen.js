var express = require('express');
var router = express.Router();
var taak = require('../../objects/taak')

/* GET users listing. */
router.get('/', function(req, res, next) {
  	var t = new taak();
  	var details = {
  		schuldhebbende: '19JtqqH42k2J64ei41f3SYHRoCyiTDGpJH6Pei',
        beschrijving:"VEGEN!",
        beloning:"10",
        looptijd:"2",
        status:"toegewezen",
        voortgang:"10"
  	};
	t.update('Taak 32', details, function(taken) {
		res.send('updated');
	});
});

module.exports = router;
