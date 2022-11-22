var express = require('express')
var router = express.Router();
var miService = require('./../services/mediaitemService');

router.get('/', (req, res, next) => {
    if (req.session.user) {
        const p = miService.getMediaItems();
        p.then((mediaitems) => {
            res.status(200).send(mediaitems);
        }).catch((err) => {
            res.status(400).send({error:"INTERNALERROR"})
        });
    } else {
        res.status(401).send({error:"UNAUTHORIZED"});
    }
});

module.exports = router;