var express = require('express');
var router = express.Router();
var taak = require('../objects/taak')
/* GET users listing. */
router.get('/', function(req, res, next) {
  var t = new taak();
	res.render('taakAanmaken');
});

router.post('/', function(req, res) {
	var t = new taak();
	req.body.user = '1R8BVnSpzEZBssPSmbD1aAzKWw2jDBB1t5gEKk'
	t.create(req.body, function(taak) {
		res.send(JSON.stringify(taak));
	});
});

module.exports = router;
