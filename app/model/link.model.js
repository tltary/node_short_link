const mysql          = require('mysql');
const db             = require('../../config/db');

module.exports.getLink = function(cb) {
    db.query('SELECT `hash`,`link`,`id` FROM `links` WHERE `is_block` = 0', function(err, rows, fields) {
        cb(err, rows);
    });
}

module.exports.editLink = function(link, id, cb) {
    db.query('UPDATE `links` SET `link`=? WHERE `id` = ?', [link, id], function(err, rows, fields) {
        cb(err, rows);
    });
}

module.exports.blockLink = function(id, cb) {
    db.query('UPDATE `links` SET `is_block` = 1 WHERE `id` = ?', [id], function(err, rows, fields) {
        cb(err, rows);
    });
}

module.exports.addLink = function(link, hash, cb) {
    db.query('INSERT INTO `links` (`link`, `hash`,`link_block`) VALUES (?, ?, "https://ffad.ru")', [link, hash], function(err, rows, fields) {
        cb(err, rows);
    });
}

module.exports.getAuth = function(login, password, cb) {
    db.query('SELECT * FROM `user` WHERE `login` LIKE ? AND `password` LIKE ? LIMIT 1', [login, password], function(err, rows, fields) {
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