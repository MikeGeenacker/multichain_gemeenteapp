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
            console.log(err);
            throw err;
        }
        multichain.listStreams({stream: req.query.name, verbose: false, count: 10, start: -10}, (err, stream) => {
            if(err) {
                console.log(err);
                throw err;
            }
            multichain.listStreamItems({stream: req.query.name, verbose: false, count: 10, start: -10}, (err, items) => {
                if(err) {
                    console.log(err);
                    throw err;
                }

                /*for(var item in items.data) {
                    console.log(items.data);
                    var output = new Buffer(item, 'hex');
                    console.log(item);
                }*/

                for (var index = 0; index < items.length; index++) {
                    console.log(items[index].data);
                    var output = new Buffer(items[index].data, 'hex');
                    items[index].data = output.toString();
                    console.log(items[index].data);                    
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