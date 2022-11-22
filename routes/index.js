var express = require('express');
var router = express.Router();
const mysql = require('mysql');
const session = require('express-session');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


module.exports = router;
