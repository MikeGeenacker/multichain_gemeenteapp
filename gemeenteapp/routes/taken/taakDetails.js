var express = require('express');
var router = express.Router();
var taak = require('../../objects/taak')

/* GET users listing. */
router.get('/', function(req, res, next) {
  var t = new taak();
  var link = req.query.name;
	t.get(link, function(taken) {
		var takenLengte = taken.length - 1;
		console.log(taken);
		res.render('taken/taakDetails', {opdrachten: taken[takenLengte], huidigeTaak: link});
	});
});

module.exports = router;
