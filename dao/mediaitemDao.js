var express = require('express');
const defaultDao = require('../dao/defaultDao');

let getMediaItemsByCategory = function(categoryId) {
    return new Promise((resolve, reject) => {
        const connection = defaultDao.getDatabaseConnection();
        let mediaitems = [];
        let sql = "select * from mediaitems natural join categories natural join platforms where category_id = ?";
        connection.query(sql, [categoryId], (err, rows, fields) => {
            if (err) {
                console.log("Error enouncter when getting MediaLists for user!!!!");
                reject(err);
            }

            if (rows) {
                rows.forEach(mitems => {
                    let mediaItem = {
                        'id': mitems.mediaitem_id,
                        'title': mitems.mediaitem_title,
                        'category': {'id':mitems.category_id, 'name': mitems.category_name},
                        'platform': {'id': mitems.platform_id, 'name': mitems.platform_name}
                    }
                    mediaitems.push(mediaItem);
                });
                resolve(mediaitems);
                connection.end();
            } else {
                console.log("Closing connection...");
                connection.end();
            }
        });
    });
}

let getMediaItemsByPlatform = function(platformId) {
    return new Promise((resolve, reject) => {
        const connection = defaultDao.getDatabaseConnection();
        let mediaitems = [];
        let sql = "select * from mediaitems natural join categories natural join platforms where platform_id = ?";
        connection.query(sql, [platformId], (err, rows, fields) => {
            if (err) {
                console.log("Error enouncter when getting MediaLists for user!!!!");
                reject(err);
            }

            if (rows) {
                rows.forEach(mitems => {
                    let mediaItem = {
                        'id': mitems.mediaitem_id,
                        'title': mitems.mediaitem_title,
                        'category': {'id':mitems.category_id, 'name': mitems.category_name},
                        'platform': {'id': mitems.platform_id, 'name': mitems.platform_name}
                    }
                    mediaitems.push(mediaItem);
                });
                resolve(mediaitems);
                connection.end();
            } else {
                console.log("Closing connection...");
                connection.end();
            }
        });
    });
}

let getMediaItems = function() {
    return new Promise((resolve, reject) => {
        const connection = defaultDao.getDatabaseConnection();
        let mediaitems = [];
        let sql = "select * from mediaitems natural join categories natural join platforms";
        connection.query(sql, [], (err, rows, fields) => {
            if (err) {
                console.log("Error enouncter when getting MediaLists for user!!!!");
                reject(err);
            }

            if (rows) {
                rows.forEach(mitems => {
                    let mediaItem = {
                        'id': mitems.mediaitem_id,
                        'title': mitems.mediaitem_title,
                        'category': {'id':mitems.category_id, 'name': mitems.category_name},
                        'platform': {'id': mitems.platform_id, 'name': mitems.platform_name}
                    }
                    mediaitems.push(mediaItem);
                });
                resolve(mediaitems);
                connection.end();
            } else {
                console.log("Closing connection...");
                connection.end();
            }
        });
    });
}

module.exports = {
    getMediaItems: getMediaItems,
    getMediaItemsByCategory: getMediaItemsByCategory,
    getMediaItemsByPlatform: getMediaItemsByPlatform
}