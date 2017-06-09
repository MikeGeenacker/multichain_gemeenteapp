var express = require('express');
var router = express.Router();
var taak = require('../objects/taak')
/* GET users listing. */
router.get('/', function(req, res, next) {
  var t = new taak();
	t.test();
	t.get('testtaakstream3',function(info) {
	  console.log(JSON.stringify(info));
	});
	res.send('sdoasn');
});

module.exports = router;
