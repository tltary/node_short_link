const express        = require('express');
const app            = express();
const port           = 8000;
const CryptoJS       = require("crypto-js");
const bodyParser     = require('body-parser');
const session        = require('express-session');
const swig           = require('swig');
const mysql          = require('mysql');
const cons           = require('consolidate');
const fs             = require('fs');
const db             = require('./config/db');
const cookieParser   = require('cookie-parser');
 
app.use(cookieParser());

app.engine('html', swig.renderFile);  
app.set('view engine', 'html');
app.set('views', __dirname + '/app/view');
//app.use("/dist", express.static(__dirname +  '/dist'));

app.use(session({
    secret: 'secret',
    cookie: { path: '/', httpOnly: !0, maxAge: 7776000000, secure: 0 },
    name: 'sid',
    saveUninitialized: 0,
    resave: 0
}))

app.use(bodyParser.urlencoded({ extended: true }));

require('./app/route/link.route')(app);      

app.listen(port, () => {
  console.log('We are live on ' + port);
});