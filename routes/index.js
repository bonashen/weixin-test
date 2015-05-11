var express = require('express');
var router = express.Router();
var fromq = require('fromq');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Bona',fq: fromq("bona,kerry")});
});

module.exports = router;
