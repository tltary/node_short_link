const link = require('./link_controller');
module.exports = function(app, db, CryptoJS) {
  link(app, db, CryptoJS);
};