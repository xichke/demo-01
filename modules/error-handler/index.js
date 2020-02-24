'use strict';

const logger = require('../shared/logger');

module.exports = function(app) {
    app.use(function(err, req, res, next) {
        logger.log({
            req: {
                ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
                url: `${req.headers['x-forwarded-proto'] || req.protocol}://${req.get('host')}${req.originalUrl}`,
                headers: req.headers,
                body: req.body
            },
            error: err.stack
        });
        next(err);
    });
    process.on('uncaughtException', function(err) {
        logger.log({
            src: 'uncaughtException',
            error: err.stack
        });
    });
};