var express = require('express');
var router = express.Router();
var multichain = require("multichain-node")({
    port: 7348,
    host: '136.144.155.184',
    user: "multichainrpc",
    pass: "uPc6civWyGanmrmAgn3Tn9pPgYR3noMQt9nPMun9GeD"
});

/* GET users listing. */
router.get('/', function(req, res, next) {
 multichain.getInfo((err, info) => {
    if(err){
        throw err;
    }
    res.render('about', {chainname : info.chainname, version: info.version});
})
});

module.exports = router;
