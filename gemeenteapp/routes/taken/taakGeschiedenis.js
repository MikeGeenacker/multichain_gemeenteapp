const express = require('express');
const router = express.Router();
const Taak = require('../../objects/taak');

/* GET users listing. */
router.get('/', function (req, res) {
    let taak = new Taak();
    taak.get(req.query.name, function (taken) {
        res.render('taken/taakGeschiedenis', {opdrachten: taken, huidigeTaak: req.query.name});
    });
});

module.exports = router;
