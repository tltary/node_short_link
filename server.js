const CryptoJS       = require("crypto-js");
const express        = require('express');
const bodyParser     = require('body-parser');
const app            = express();
const port           = 8000;
const mysql          = require('mysql');
const cons           = require('consolidate');
const path           = require('path');
const fs             = require('fs');
const db             = require('./config/db')

app.engine('tpl', function (filePath, options, callback) {
  fs.readFile(filePath, function (err, content) {
    if (err) return callback(new Error(err));
    const rendered = content;
    return callback(null, rendered);
  });
});
app.set('views', './views');
app.set('view engine', 'tpl');
app.use(bodyParser.urlencoded({ extended: true }));         
require('./app')(app, db, CryptoJS);
app.listen(port, () => {
  console.log('We are live on ' + port);
});               