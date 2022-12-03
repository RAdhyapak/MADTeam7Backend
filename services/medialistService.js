var medialistDao = require("./../dao/medialistDao");

let getMediaList = function(mediaListId, user) {
  return new Promise((resolve, reject) => {
    const mediaListPromise = medialistDao.getMediaList(mediaListId);
    mediaListPromise.then((mediaList) => {
      resolve(mediaList);
    }).catch((err) => {
      reject(err);
    });
  });
}

let getUserLists = function(user) {
  return new Promise((resolve, reject) => {
    const userPromise = medialistDao.getUserLists(user);
    userPromise.then((mediaLists) => {
      resolve(mediaLists);
    }).catch((err) => {
      throw err;
      // reject(err);
    });
  });
}

let createMediaList = function(req, user) {
  return new Promise((resolve, reject) => {
    const listPromise = medialistDao.createMediaList(req, user);
    listPromise.then((mediaListId) => {
      resolve(mediaListId);
    }).catch((err) => {
      throw err;
      // reject(err);
    });
  });
}

module.exports= {
    getMediaList: getMediaList,
    getUserLists: getUserLists,
    createMediaList: createMediaList
}