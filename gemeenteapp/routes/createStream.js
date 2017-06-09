var express = require('express');
var router = express.Router();
var multichain = require("multichain-node")({
    port: 7348,
    host: '136.144.155.184',
    user: "multichainrpc",
    pass: "uPc6civWyGanmrmAgn3Tn9pPgYR3noMQt9nPMun9GeD"
});

router.get('/', function(req, res, next) { 
    res.render('createStream', {title: 'Stream aanmaken'});
});

/* Create Stream */
router.post('/', function(req, res, next){
    multichain.create({type: 'stream', name: req.body.name, open: true}, (err, name) => {
        if(err) {
            throw err;
        }
        console.log(name);
    })
        res.render('createStream');
});

module.exports=router   