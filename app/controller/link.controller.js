const CryptoJS       = require("crypto-js");
const session        = require('express-session');
const linkModel      = require('../model/link.model');
const cookieParser   = require('cookie-parser');

module.exports.createLink = function(req, res, next) {
    res.setHeader("Content-Type", "text/html");
    const sbString = Math.floor((Math.random() * 10));
    const hash     = CryptoJS.SHA256(req.query.link).toString().substring(sbString, sbString + 4) + '' + Math.floor((Math.random() * 1000)).toString();
    const link     = req.query.link;
    
    linkModel.addLink(link, hash, function(err, rows) {
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
            res.redirect('/auth/');
            next();
        }
    });
};

module.exports.authPage = function(req, res, next) {
    res.setHeader("Content-Type", "text/html");
    res.render('auth', {title: 'FFAD Short Link | Ввойдите в систему'});
};

module.exports.error = function(req, res, next) {
    res.setHeader("Content-Type", "text/html");
    res.render('error', {title: 'FFAD Short Link | Ошибка'});
};

module.exports.addLinkPage = function(req, res, next) {
    res.setHeader("Content-Type", "text/html");
    if (!req.session.user_login) {
        res.redirect('/auth/');
        next();
    } else {
        res.render('add', {title: 'FFAD Short Link | Главная страница'});
    }
};

module.exports.authUser = function(req, res, next) {
    res.setHeader("Content-Type", "text/html");
    const login    = req.query.login;
    const password = CryptoJS.MD5(req.query.password).toString();
    linkModel.getAuth(login, password, function(err, rows) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        if (rows.length > 0) {
            req.session.user_login = login;
            res.redirect('/add/');
            next();
        } else {
            res.redirect('/auth/');
            next();
        }
    });
};

module.exports.allLink = function(req, res, next) {
    linkModel.getLink(function(err, rows) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.json(rows);
    });
};

module.exports.blockLink = function(req, res, next) {
    const id   = req.params.id;
    linkModel.blockLink(id, function(err, rows) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.json(rows);
    });
};