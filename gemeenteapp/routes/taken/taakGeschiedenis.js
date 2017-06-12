var express = require('express');
var router = express.Router();
var taak = require('../../objects/taak')

/* GET users listing. */
router.get('/', function(req, res, next) {
  var t = new taak();
  var linkje = req.query.name;
	t.get(linkje, function(taken) {
		res.render('taken/taakGeschiedenis', {opdrachten: taken, huidigeTaak: linkje});
	});
});

module.exports = router;
