const express = require('express');
const router = express.Router();
const multichain = require("multichain-node")({
    port: 7348,
    host: '136.144.155.184',
    user: "multichainrpc",
    pass: "uPc6civWyGanmrmAgn3Tn9pPgYR3noMQt9nPMun9GeD"
});


/*GET stream names*/
router.get('/', function (req, res) {
    multichain.listStreams((err, streams) => {
        if (err) {
            throw err;
        }
        res.render('taken/takenOverzicht', {title: 'Takenoverzicht', nameList: streams});
    });
});

router.post('/', function (req, res) {
    multichain.subscribe({stream: req.body.name}, (err) => {
        if (err) {
            console.log(err);
            throw err;
        }
        multichain.listStreams((err, streams) => {
            if (err) {
                throw err;
            }
            res.render('taken/takenOverzicht', {title: 'Takenoverzicht', nameList: streams});
        });
    });
});

module.exports = router;
