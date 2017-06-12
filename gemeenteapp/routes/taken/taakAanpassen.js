var express = require('express');
var router = express.Router();
var taak = require('../../objects/taak')

/* GET users listing. */
router.get('/', function(req, res, next) {
  var t = new taak();
	t.update('t', 't', function(taken) {
		res.send('updated');
	});
});

module.exports = router;
