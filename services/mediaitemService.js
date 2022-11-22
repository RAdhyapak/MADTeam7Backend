var mediaitemDao = require("./../dao/mediaitemDao");

let getMediaItems = function() {
    return new Promise((resolve, reject) => {
        const mediaitemPromise = mediaitemDao.getMediaItems();
        mediaitemPromise.then((mediaitems) => {
            resolve(mediaitems);
        }).catch((err) => {
            reject(err);
        });
    });
}

module.exports ={
    getMediaItems: getMediaItems
}