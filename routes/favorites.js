var express = require('express')
var router = express.Router();
var favoritesService = require('./../services/favoritesService');
var favoritesDao = require('../dao/favoritesDao');

router.get('/', function (req, res, next) {
  if (req.session.user) {
    let currentUser = req.session.user;
    const p = favoritesDao.getFavorites(currentUser);
    p.then((favorites) => {
      res.status(200).send(favorites);
    }).catch((err) => {
      res.status(400).send({ error: "INTERNALERROR" });
    });
  } else {
    res.status(401).send({ error: "UNAUTHORIZED" });
  }
});

router.post('/', function(req, res) {
  if (req.session.user) {
    let currentUser = req.session.user;
    const p = favoritesDao.makeFavorite(req.body.id, currentUser);
    p.then((favorites) => {
      res.status(200).send(favorites);
    }).catch((err) => {
      throw err;
      // res.status(400).send({ error: "INTERNALERROR" });
    });
  } else {
    res.status(401).send({ error: "UNAUTHORIZED" });
  }
});

module.exports = router;