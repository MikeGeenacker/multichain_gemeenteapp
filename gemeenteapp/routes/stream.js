var express = require('express');
var router = express.Router();
var multichain = require("multichain-node")({
    port: 7348,
    host: '136.144.155.184',
    user: "multichainrpc",
    pass: "uPc6civWyGanmrmAgn3Tn9pPgYR3noMQt9nPMun9GeD"
});


/*GET streams*/
router.get('/', function(req, res, next) {
    multichain.listStreams((err, streams) => {
        if(err){
            throw err;
        }
        console.log(streams);
        res.render('stream', {title: 'Streams', nameList: streams});
    })
});

module.exports = router;