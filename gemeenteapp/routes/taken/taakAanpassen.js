var express = require('express');
var router = express.Router();
var taak = require('../../objects/taak')

/* GET users listing. */
router.get('/', function(req, res, next) {
    var t = new taak();
    var linkje = req.query.name;
    t.get(linkje, function(taken) {
        var takenLengte = taken.length - 1;
        res.render('taakAanpassen', {opdrachten: taken[takenLengte], huidigeTaak: linkje});
    });

});

router.post('/', function(req, res, next) {
  	var t = new taak();
  	var details = {
  		schuldhebbende: req.body.schuldhebbende,
    	beschrijving: req.body.beschrijving,
			beloning: req.body.beloning,
			looptijd: req.body.looptijd,
			status: req.body.statustaak,
			voortgang: req.body.voortgang
  	};
	t.update(req.body.naam, details, function(taken) {
		res.redirect('/gemeente/taken/details?name=' + req.body.naam);
	});
});

module.exports = router;
