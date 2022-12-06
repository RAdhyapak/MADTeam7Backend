var express = require('express');
const defaultDao = require('../dao/defaultDao');

let getFavorites = function (user) {
    return new Promise((resolve, reject) => {
        const connection = defaultDao.getDatabaseConnection();
        let favorites = [];
        let sql = "select uf.medialist_id, ml.medialist_title, u.username from user_favourites uf join medialists ml on uf.medialist_id = ml.medialist_id join users u on ml.user_id = u.user_id where uf.user_id = ?";
        connection.query(sql, [user.id], (err, rows, fields) => {
            if (err) {
                console.log("Error enouncter when getting favorites for user!!!!");
                reject(err);
            }

            if (rows) {
                rows.forEach(favs => {
                    let favorite = {
                        'id': favs.medialist_id,
                        'title': favs.medialist_title,
                        'username': favs.username
                    }
                    favorites.push(favorite);
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

let makeFavorite = function(mediaListId, user) {
    return new Promise((resolve, reject) => {
        const connection = defaultDao.getDatabaseConnection();
        let sql = "INSERT into user_favourites values(NULL, ?, ?)";
        connection.query(sql, [user.id, mediaListId], (err, result) => {
            if (err) {
                console.log("Error enouncter when getting favorites for user!!!!");
                reject(err);
            }
            if (result) {
                let insertId = result.insertId;
                resolve({"insertId": insertId});
                connection.end();
            } else {
                console.log("Closing connection...");
                connection.end();
            }
        });
    });
}

module.exports = {
    getFavorites: getFavorites,
    makeFavorite: makeFavorite
}