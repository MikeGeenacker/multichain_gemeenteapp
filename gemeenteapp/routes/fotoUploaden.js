var express = require('express');
var router = express.Router();
var multichain = require("multichain-node")({
  port: 7348,
  host: '136.144.155.184',
  user: "multichainrpc",
  pass: "uPc6civWyGanmrmAgn3Tn9pPgYR3noMQt9nPMun9GeD"
});
var formidable = require('formidable');
var fs = require('fs');
var session = require('express-session');

router.get('/', function(req, res, next) {

  res.render('fotoUploaden', {uploadTry : false});
});

router.post('/', function(req, res, next) {
  var uploadSucces = false;
  if (req.originalUrl == '/fotoUploaden') {
      var form = new formidable.IncomingForm();
      console.log(form);
      form.parse(req, function (err, fields, files) {
        console.log('hoi');
        var oldpath = files.fileToUpload.path;
        var newpath = __dirname + files.fileToUpload.name;
        fs.rename(oldpath, newpath, function (err) {
          console.log('hoi2');
          if (err) throw err;
          uploadSucces = true;
        });
      });
   };
  res.render('fotoUploaden', {uploadSucces : uploadSucces});
});

module.exports = router;
