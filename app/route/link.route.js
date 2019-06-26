const linkController = require('../controller/link.controller');

module.exports = function(app) {
	app.get('/auth/',              linkController.authPage);
    app.get('/add/',               linkController.addLinkPage);
    app.get('/add/create/',        linkController.createLink);
    app.get('/g/:hash',            linkController.goLink);
    app.get('/',                   linkController.addLinkPage);
    app.get('/api/all/',           linkController.allLink);
    app.get('/api/block/:id',      linkController.blockLink);
    app.get('/api/auth/',          linkController.authUser);
    app.get('/error/',             linkController.error);
}