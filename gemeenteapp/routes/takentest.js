var express = require('express');
var router = express.Router();
var taak = require('../objects/taak')
/* GET users listing. */
router.get('/', function(req, res, next) {
  var t = new taak();
	t.test();
	t.get('testtaakstream3',function(taken) {
		res.send(JSON.stringify(taken));
	});
});

module.exports = router;
