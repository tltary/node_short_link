const CryptoJS       = require("crypto-js");
const session        = require('express-session');
const uuidv1         = require('uuid/v1');
const linkModel      = require('../model/link.model');
const cookieParser   = require('cookie-parser');

module.exports.createLink = function(req, res, next) {
    res.setHeader("Content-Type", "text/html");

    if (!req.cookies['user_hash']) {
        res.cookie('user_hash', uuidv1());
    }

    const sbString = Math.floor((Math.random() * 10));
    const hash     = CryptoJS.SHA256(req.query.link).toString().substring(sbString, sbString + 4) + '' + Math.floor((Math.random() * 1000)).toString();
    const link     = req.query.link;
    
    linkModel.addLink(link, hash, req.cookies['user_hash'], function(err, rows) {
        if (err) {
            console.log(err);
            res.redirect('/error/');
            next();
        }
        res.redirect('/add/');
        next();
    });
};

module.exports.goLink = function(req, res, next) {
    res.setHeader("Content-Type", "text/html");

    if (!req.cookies['user_hash']) {
        res.cookie('user_hash', uuidv1());
    }

    const hash = req.params.hash;
    
    linkModel.goLink(hash, function(err, rows) {
        if (err) {
            console.log(err);
            res.redirect('/error/');
            next();
        }
        if (rows.length > 0) {
            if (rows[0].is_block != 1) {
                res.redirect(rows[0].link)
            } else {
                res.redirect(rows[0].link_block)
            }
            next();
        } else {
            res.redirect('/add/');
            next();
        }
    });
};

module.exports.error = function(req, res, next) {
    res.setHeader("Content-Type", "text/html");

    if (!req.cookies['user_hash']) {
        res.cookie('user_hash', uuidv1());
    }

    res.render('error', {title: 'Short link | error'});
};

module.exports.addLinkPage = function(req, res, next) {
    res.setHeader("Content-Type", "text/html");

    if (!req.cookies['user_hash']) {
        res.cookie('user_hash', uuidv1());
    }
    
    res.render('add', {title: 'Short link'});
};

module.exports.allLink = function(req, res, next) {
    linkModel.getLink(req.cookies['user_hash'], function(err, rows) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.json(rows);
    });
};