const mysql          = require('mysql');
const db             = require('../../config/db');

module.exports.getLink = function(cookie, cb) {
    db.query('SELECT * FROM `links` WHERE `cookie` = ?', [cookie], function(err, rows, fields) {
        cb(err, rows);
    });
}

module.exports.addLink = function(link, hash, cookie, cb) {
    db.query('INSERT INTO `links` (`link`, `hash`, `cookie`) VALUES (?, ?, ?)', [link, hash, cookie], function(err, rows, fields) {
        cb(err, rows);
    });
}

module.exports.goLink = function(hash, cb) {
    db.query('SELECT * FROM `links` WHERE `hash` LIKE ? LIMIT 1', [hash], function(err, rows, fields) {
        if (err) throw err;
        if (rows.length > 0) {
            db.query('UPDATE `links` SET `count` = `count` + 1 WHERE `id` = ?', [rows[0].id], function(err, rows, fields) {
                if (err) throw err;
            });
        }
        cb(err, rows);
    });
}