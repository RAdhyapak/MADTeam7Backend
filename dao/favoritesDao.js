var express = require('express');
const defaultDao = require('../dao/defaultDao');

let getFavorites = function (mediaListId) {
    return new Promise((resolve, reject) => {
        const connection = defaultDao.getDatabaseConnection();
        let favorites = [];
        let sql = "select * from favorites where user_id = ?";
        connection.query(sql, [mediaListId], (err, rows, fields) => {
            if (err) {
                console.log("Error enouncter when getting favorites for user!!!!");
                reject(err);
            }

            if (rows) {
                rows.forEach(favs => {
                    let favorite = {
                        'id': favs.medialist_id
                    }
                    mediaitems.push(favorite);
                });
                resolve(favorites);
                connection.end();
            } else {
                console.log("Closing connection...");
                connection.end();
            }
        });
    });
}

module.exports = {
    getFavorites: getFavorites
}