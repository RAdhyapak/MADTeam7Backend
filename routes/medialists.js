var express = require('express')
var router = express.Router();
var mlService = require('./../services/medialistService');

router.get('/', function(req, res, next) {
    if (req.session.user) {
      if (req.query.categoryId) {
        const p = mlService.searchByCategory(req.query.categoryId, req.session.user);
        p.then((medialists) => {
          res.status(200).send(medialists);
        }).catch((err) => {
          res.status(400).send({error:"INTERNALERROR"});
        });
      } else {
        let currentUser = req.session.user;
        const p = mlService.getUserLists(currentUser);
        p.then((medialists) => {
            res.status(200).send(medialists);
        }).catch((err) => {
          res.status(400).send({error:"INTERNALERROR"});
        });
      } 
    } else {
      res.status(401).send({error:"UNAUTHORIZED"});
    }
});

router.get('/:id', (req, res) => {
    const id = req.params.id;
    if (req.session.user) {
        let currentUser = req.session.user;
        const p = mlService.getMediaList(id, currentUser);
        p.then((medialist) => {
            res.status(200).send(medialist);
        }).catch((err) => {
          res.status(500).send("Internal Server Error");
        });
    } else {
        res.status(401).send({error:"UNAUTHORIZED"});
    }
});

module.exports = router;