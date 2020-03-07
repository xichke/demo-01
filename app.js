'use strict';

const config = require('config'),
	path = require('path'),
	http = require('http'),
	express = require('express'),
	app = express(),
	utils = require('./modules/shared/utils');

app.set('utils', utils);
[
	'./modules/app/init',
	'./modules/shared/db',
	'./modules/auth/seed',
	'./modules/auth/passport',
	'./modules/**/*middleware.js',
	'./modules/**/*route.js',
	'./modules/**/*pos.js'
].forEach(e => {
	let bootstrap = (e) => {
		console.log(`[loading...] ${e}`);
		require(e)(app);
	};
	if (e.includes('*')) {
		utils.match(e).forEach((x) => {
			bootstrap(path.resolve(x));
		});
	} else {
		bootstrap(e);
	}
});

const server = http.createServer(app);
require('./modules/socket')(server, app);
server.listen(config.port);
console.log(`App is running on port : ${config.port}`);