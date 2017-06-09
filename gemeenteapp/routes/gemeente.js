var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('gemeente', { title: 'SocialCoin | Gemeente' });
});

module.exports = router;
