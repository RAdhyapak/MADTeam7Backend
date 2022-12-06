var express = require('express');
const defaultDao = require('../dao/defaultDao');

let getUserLists = function(user) {
    return new Promise((resolve,  reject) => {
        console.log("Inside getUserLists");
        const connection = defaultDao.getDatabaseConnection();
        let medialists = [];
        let sql = "select medialist_id, medialist_title, upvotes, username from medialists natural join users where user_id = ?";
        console.log("userid " + user.id);
        connection.query(sql, [user.id], (err, rows, fields) => {
            if (err) {
                console.log("Error enouncter when getting MediaLists for user!!!!");
                reject(err);
            }

            if (rows) {
            rows.forEach(mlist => {
                let medialist = {'id': mlist.medialist_id,
                'title': mlist.medialist_title,
                'upvotes': mlist.upvotes,
                'username': mlist.username
                }
                medialists.push(medialist);
            });
            resolve(medialists);
            console.log("Closing connection...");
            connection.end();
            } else {
                console.log("Closing connection...");
                connection.end();
            }
        });
    });
}

let getMediaList = function(mediaListId) {
    const mediaListPromise = new Promise((resolve, reject) => {
        const connection = defaultDao.getDatabaseConnection();
        let sql = "select * from medialists natural join medialists_mediaitems natural join mediaitems natural join categories natural join platforms where medialists.medialist_id = ?";
        let mediaList = {};
        connection.query(sql, [mediaListId], (err, rows, fields) => {
            if (err) {
                console.log("Error enouncter when getting MediaList!!!!");
                reject(err);
            }

            if (rows && rows.length > 0) {
                mediaList.id = rows[0].medialist_id;
                mediaList.title = rows[0].medialist_title;
                mediaList.upvotes = rows[0].upvotes;
                mediaList.mediaItems = [];
                rows.forEach(ml => {
                    let mediaItem = {
                        'id': ml.mediaitem_id,
                        'title': ml.mediaitem_title,
                        'img': ml.img,
                        'category': {'id':ml.category_id, 'name': ml.category_name},
                        'platform': {'id': ml.platform_id, 'name': ml.platform_name}
                    };
                    mediaList.mediaItems.push(mediaItem);
                });
                resolve(mediaList);
                console.log("Closing connection...");
                connection.end();
            } else {
                console.log("Closing connection...");
                connection.end();
            }
        });
    });
    return mediaListPromise;
}

let getMediaListByCategory = function(categoryId, user) {
    const mediaListPromise = new Promise((resolve, reject) => {
        const connection = defaultDao.getDatabaseConnection();
        let sql = "SELECT distinct(medialist_id), medialist_title, username, upvotes from medialists natural join medialists_mediaitems natural join mediaitems natural join users where category_id = ? and user_id <> ?";
        let mediaLists = [];
        connection.query(sql, [categoryId, user.id], (err, rows, fields) => {
            if (err) {
                console.log("Error enouncter when getting MediaList!!!!");
                reject(err);
            }

            if (rows && rows.length > 0) {
                rows.forEach(row => {
                    let mediaList = {};
                    mediaList.id = row.medialist_id;
                    mediaList.title = row.medialist_title;
                    mediaList.upvotes = row.upvotes;
                    mediaList.username = row.username;
                    mediaLists.push(mediaList);
                });
                resolve(mediaLists);
                console.log("Closing connection...");
                connection.end();
            } else {
                console.log("Closing connection...");
                connection.end();
            }
        });
    });
    return mediaListPromise;
}

// CREATE MediaList

// GET RECOMMENDATIONS - BROWSE

let createMediaList = function(req, user) {
    return new Promise((resolve, reject) => {
        const connection = defaultDao.getDatabaseConnection();
        let sql = "INSERT INTO medialists values (NULL, ?, ?, ?)";
        connection.query(sql, [user.id, req.body.title, 0], (err, result) => {
            if (err) {
                console.log("Error enouncter when creating MediaList!!!!");
                reject(err);
            }

            if (result) {
                let mediaListId = result.insertId;
                console.log("NEW media list created as:" + mediaListId);
                const mediaItemPromise = createMediaListItem(connection, req, mediaListId);
                mediaItemPromise.then((mlId) => {
                    resolve(mediaListId);
                }).finally(() => {  
                    console.log("Closing connection.s.");
                    connection.end();
                })
            } else {
                console.log("Closing connection...");
                connection.end();
            }
        });
    });
}

let createMediaListItem = function(connection, req, mediaListId) {
    return new Promise((resolve, reject) => {
        let sql = "INSERT into medialists_mediaitems (medialist_id, mediaitem_id) VALUES ?";
        var values = [];
        if (req.body.mediaItems) {
            req.body.mediaItems.forEach((mediaItem) => {
                values.push([mediaListId, mediaItem.id]);
            });
            console.log("Inserting values:" + values);
            connection.query(sql, [values], (err, result) => {
                if (err) {
                    console.log("Error enouncter when creating MediaList!!!!");
                    reject(err);
                }

                if (result) {
                    console.log(JSON.stringify(result));
                    resolve(mediaListId);
                }
            });
        }
    });
}

module.exports = {
    getUserLists: getUserLists,
    getMediaList: getMediaList,
    createMediaList: createMediaList,
    getMediaListByCategory: getMediaListByCategory
}
