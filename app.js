'use strict';

const config = require('config'),
	path = require('path'),
	http = require('http'),
	express = require('express'),
	app = express(),
	utils = require('./modules/shared/utils');

require('./modules/shared/db')(app);
require('./modules/www/login/passport')(app);
require('./modules/shared/middleware')(app);

utils.match('modules/**/*route.js').forEach(function(e) {
	require(path.resolve(e))(app);
});

require('./modules/shared/error-handler')(app);

const server = http.createServer(app);
server.listen(config.port);
console.log(`App is running on port : ${config.port}`);