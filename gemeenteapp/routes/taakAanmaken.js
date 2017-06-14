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
	req.body.user = localStorage.getItem('Walletadres');
	t.create(req.body, function(taak) {
        res.redirect('/gemeente/taken/details?name=' + taak.naam);
	});
});

module.exports = router;
