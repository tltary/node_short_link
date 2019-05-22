const linkController = require('../controller/link.controller');

module.exports = function(app) {
    app.get('/add/', linkController.addLinkPage);
    app.get('/add/create/', linkController.createLink);
    app.get('/:hash', linkController.goLink);
    app.get('/', linkController.addLinkPage);
    app.get('/api/all/', linkController.allLink);
    app.get('/error/', linkController.error);
}