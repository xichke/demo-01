'use strict';

const config = require('config'),
	helmet = require('helmet'),
	methodOverride = require('method-override'),
	morgan = require('morgan'),
	cors = require('cors'),
	cookieParser = require('cookie-parser'),
	express = require('express'),
	path = require('path'),
	exphbs = require('express-handlebars'),
	bodyParser = require('body-parser'),
	utils = require('./utils'),
	views = (() => {
		let result = {};
		utils.match('modules/**/*.html').forEach(e => {
			let name = e.split('/').slice(-2).reverse().pop();
			result[name] = `../${e}`;
		})
		return result;
	})();
module.exports = function(app) {
	// app.set('trust proxy', 1);
	if (config.morgan)
		app.use(morgan(config.morgan));
	app.use(methodOverride());
	app.use(cookieParser(config.token.secret));
	app.use(cors());
	app.use(express.static('assets'));
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
	app.use((req, res, next) => {
		var _render = res.render;
		res.render = function(view, options, fn) {
			view = views[view];
			_render.call(this, view, options, fn);
		}
		next();
	});
};