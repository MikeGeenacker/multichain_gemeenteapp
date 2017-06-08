var express = require('express');
var router = express.Router();
var multichain = require("multichain-node")({
    port: 7348,
    host: '136.144.155.184',
    user: "multichainrpc",
    pass: "uPc6civWyGanmrmAgn3Tn9pPgYR3noMQt9nPMun9GeD"
});

router.get('/', function(req, res, next) {
    multichain.listStreamPublishers({stream: req.query.name, verbose: false, count: 10, start: -10}, (err, publisher)=> {
        if(err){
            throw err;
        }
        multichain.listStreams({stream: req.query.name, verbose: false, count: 10, start: -10}, (err, stream) => {
            if(err) {
                throw err;
            }
            multichain.listStreamItems({stream: req.query.name, verbose: false, count: 10, start: -10}, (err, items) => {
                if(err) {
                    throw err;
                }                
                res.render('streamDetails', {
                    streamPublisher: publisher,
                    title: 'Details', 
                    streamName: req.query.name,
                    streamInf: stream,
                    streamItems: items
                })
            });
        })
    })
});

module.exports=router