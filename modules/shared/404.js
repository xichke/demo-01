'use strict';

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.status(404);
        if (req.accepts('html')) {
            return res.render('404', {
                url: req.url
            });
        }
        if (req.accepts('json')) {
            return res.send({
                error: 'Not found'
            });
        }
        res.type('txt').send('Not found');
    });
};