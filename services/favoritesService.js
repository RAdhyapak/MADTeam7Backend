var favoritesDao = require("./../dao/favoritesDao");

let getFavorites = function (mediaListId, user) {
  return new Promise((resolve, reject) => {
    const favoritesPromise = favoritesDao.getFavorites(mediaListId);
    favoritesPromise.then((favorites) => {
      resolve(favorite);
    }).catch((err) => {
      reject(err);
    });
  });
}


module.exports = {
  getFavorites: getFavorites
}