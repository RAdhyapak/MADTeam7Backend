var userDao = require("../dao/userDao");
var medialistDao = require("../dao/medialistDao");

let validateLogin = function(req) {
  return new Promise((res, rej) => {
    const credPromise = userDao.getCredentials(req);
    credPromise.then((users) => {
      if (users.length == 1) {
        let user = users[0];
        console.log("User:" + JSON.stringify(user));
        const userPromise = medialistDao.getUserLists(user);
        userPromise.then((mediaLists) => {
          user.medialists = mediaLists;
          console.log("finished getUserLists");
          res(user);
        });
      } else {
        rej({error: "USERNOTFOUND"});
      }
    });
  });
}

let createUser = function(req) {
  return new Promise((resolve, reject) => {
    console.log("Creating user in service");
    const userPromise = userDao.createPerson(req);
    userPromise.then((userId) => {
      const userPromise = userDao.getUser(userId);
        userPromise.then((userProfile) => {
          resolve(userProfile);
        });
    }).catch(err => {
      reject(err)
    });
  });
}


module.exports = {
    validateLogin: validateLogin,
    createUser: createUser
}