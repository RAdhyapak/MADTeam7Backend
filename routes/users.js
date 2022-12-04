var express = require('express')
var router = express.Router();
var mysql = require('mysql');
var userService = require('./../services/userService');

/* Login */
router.post('/login', function(req, res, next) {
  const p = userService.validateLogin(req);
  p.then((user) => {
    req.session.user = user;
    res.status(200).send(user);
  }).catch((err) => {
    res.status(404).send(err);
  });
});

/* Logout */
router.post('/logout', function(req, res, next) {
  if (req.session.user) {
    req.session.destroy();
    res.redirect('/');
  } else {
    res.status(401).send({error:"UNAUTHORIZED"});
  }
});

/* User */
router.get('/', function (req, res) {
  if (req.session.user) {
    const currentUser = req.session.user;
    res.status(200).send(currentUser);
  } else {
    res.status(401).send({error:"UNAUTHORIZED"});
  }
});


// TODO: Refactor
// router.post('/', (req, res, next) => {
//   //TODO: validate all fields available and correct
//   console.log("Prompted to create user");
//   const p = userService.createUser(req);
//   p.then((user) => {
//     res.status(200).send(user);
//   }).catch((err) => {
//     if (err.code == "ER_DUP_ENTRY") {
//       res.status(400).send("Duplicate Email");
//     }
//     throw err;
//     // res.status(500).send(err);
//   });
// });



module.exports = router;
