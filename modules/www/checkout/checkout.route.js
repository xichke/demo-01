'use strict';
const mongoose = require('mongoose');

module.exports = function(app) {
    app.get('/checkout', (req, res) => {
        if (!req.isAuthenticated())
            return res.redirect(`/login?ref=${req.originalUrl}`);
        res.render('checkout', {
            layout: false
        });
    });
};