const express = require('express');
const router = express.Router();
const taak = require('../../objects/taak');

/* GET users listing. */
router.get('/', function (req, res) {
    let t = new taak();
    let link = req.query.name;
    t.get(link, function (taken) {
        let takenLengte = taken.length - 1;
        res.render('taken/taakDetails', {opdrachten: taken[takenLengte], huidigeTaak: link});
    });
});

module.exports = router;
