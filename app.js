'use strict';

const config = require('config'),
	path = require('path'),
	http = require('http'),
	express = require('express'),
	app = express(),
	utils = require('./modules/shared/utils');

[
	'./modules/shared/db',
	'./modules/shared/middleware',
	'./modules/www/login/passport',
	'./modules/**/*route.js',
	'./modules/shared/404',
	'./modules/shared/error-handler'
].forEach(e => {
	if (e.includes('*')) {
		utils.match(e).forEach((x) => {
			require(path.resolve(x))(app);
		});
	} else {
		require(e)(app);
	}
});

const server = http.createServer(app);
server.listen(config.port);
console.log(`App is running on port : ${config.port}`);