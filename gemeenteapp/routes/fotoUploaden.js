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
var fileUpload = require('express-fileupload');

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
          console.log(form)
          if (err){
             throw err;
          }
          multichain.publish({from:req.body.fromAddress, stream: req.body.toSream, key: req.body.key, data: form}, (err, img) => {
            if (err) {
              console.log(err);
              throw err;
            }
            uploadSucces = true;
          });
        });
      });
   };
  res.render('fotoUploaden', {uploadSucces : uploadSucces});
});


/*router.post('/', function(req, res, next) {
  var uploadSucces = false;
  if(req.files) {
    let uploadedFile = req.files.fileToUpload;
    var oldpath = uploadedFile.path;
    var newpath = __dirname + uploadedFile.name;

    uploadSucces = true;
  } else {
    return res.status(400).send('No files were uploaded.');
  }
})*/

module.exports = router;
