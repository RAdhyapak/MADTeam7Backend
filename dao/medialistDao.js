var express = require('express');
const defaultDao = require('../dao/defaultDao');

let getUserLists = function(user) {
    return new Promise((resolve,  reject) => {
        console.log("Inside getUserLists");
        const connection = defaultDao.getDatabaseConnection();
        let medialists = [];
        let sql = "select * from medialists where user_id = ?";
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
                'upvotes': mlist.upvotes
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
        
            if (rows) {
                mediaList.id = rows[0].medialist_id;
                mediaList.title = rows[0].medialist_title;
                mediaList.upvotes = rows[0].upvotes;
                mediaList.mediaItems = [];
                rows.forEach(ml => {
                    let mediaItem = {
                        'id': ml.mediaitem_id,
                        'title': ml.mediaitem_title,
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

// CREATE MediaList

// GET RECOMMENDATIONS - BROWSE

let createMedialist = function(req, user) { }

module.exports = {
    getUserLists: getUserLists,
    getMediaList: getMediaList
}