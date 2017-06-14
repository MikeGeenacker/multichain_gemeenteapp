const express = require('express');
const router = express.Router();
const Taak = require('../../objects/taak');

/* GET users listing. */
router.get('/', function (req, res) {
    let taak = new Taak();
    taak.get(req.query.name, function (taken) {
        res.render('taakAanpassen', {opdrachten: taken[taken.length - 1], huidigeTaak: req.query.name});
    });

});

router.post('/', function (req, res) {
    let taak = new Taak();
    let details = {
        schuldhebbende: req.body.schuldhebbende,
        beschrijving: req.body.beschrijving,
        beloning: req.body.beloning,
        looptijd: req.body.looptijd,
        status: req.body.statustaak,
        voortgang: req.body.voortgang
    };
    taak.update(req.body.naam, details, function (taken) {
        res.redirect('/gemeente/taken/details?name=' + req.body.naam);
    });
});

module.exports = router;
