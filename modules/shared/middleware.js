'use strict';

const config = require('config'),
    helmet = require('helmet'),
    methodOverride = require('method-override'),
    morgan = require('morgan'),
    exphbs = require('express-handlebars'),
    bodyParser = require('body-parser');

module.exports = function(app) {
    app.set('trust proxy', 1);
    if (config.morgan)
        app.use(morgan(config.morgan));
    app.use(methodOverride());
    app.use(require('serve-static')('assets'));
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());
    app.use(helmet.frameguard());
    app.use(helmet.xssFilter());
    app.use(helmet.noSniff());
    app.use(helmet.ieNoOpen());
    app.use(helmet.hsts({
        maxAge: 15778476000,
        includeSubDomains: true,
        force: true
    }));
    app.disable('x-powered-by');
    app.set('views', './views');
    app.engine('.html', exphbs({
        extname: '.html'
    }));
    app.set('view engine', '.html');
};