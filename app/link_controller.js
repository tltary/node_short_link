module.exports = function(app, db, CryptoJS) {


    app.get('/add/', (req, res, next) => {
        res.setHeader("Content-Type", "text/html");
        res.render('add');
    });

    app.get('/add/create/', (req, res, next) => {
        res.setHeader("Content-Type", "text/html");
        const hash = CryptoJS.MD5(req.query.link).toString();
        const link = req.query.link;
        db.query('INSERT INTO `links` (`link`, `hash`) VALUES (?, ?)', [link, hash], function(err, rows, fields) {
            if (err) throw err;
            res.redirect('/add/');
            next();
        });
    });

    app.get('/:hash', (req, res, next) => {
        res.setHeader("Content-Type", "text/html");
        const hash      = req.params.hash;
        db.query('SELECT * FROM `links` WHERE `hash` LIKE ? LIMIT 1', [hash], function(err, rows, fields) {
            if (err) throw err;
            if (rows.length > 0) {
                link    = rows[0].link;
                res.redirect(link);
                next();
            } else {
                res.redirect('/add/');
            }
        });
    });

    app.get('/', (req, res, next) => {
        res.setHeader("Content-Type", "text/html");
        res.redirect('/add/');
        next();
    });
    
};