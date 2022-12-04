var express = require('express');
var router = express.Router();
const mysql = require('mysql');
const session = require('express-session');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/categories',  function(req, res) {
  let categories = [];
  let books = { id: 3, name: 'Books', img: 'cat_books'};
  let movies = { id: 1, name: 'Movies', img: 'cat_movies'};
  let series = { id: 2, name: 'TV Series', img: 'cat_series'};
  categories.push(books);
  categories.push(movies);
  categories.push(series);
  res.status(200).send(categories);
});
module.exports = router;
