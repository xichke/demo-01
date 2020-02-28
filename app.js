'use strict';

const config = require('config'),
	path = require('path'),
	http = require('http'),
	express = require('express'),
	app = express(),
	passport = require('passport'),
	session = require('express-session'),
	bodyParser = require('body-parser'),
	utils = require('./modules/shared/utils');

require('./modules/shared/db')(app);
require('./modules/www/login/passport')(app);
// require('./modules/auth/passport')(passport);
require('./modules/shared/middleware')(app);

// app.use(session({
//     name: config.session.name,
//     secret: config.session.secret,
//     resave: true,
//     saveUninitialized: true,
//     cookie: {
//         secure: config.session.secure,
//         expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
//     },
//     store: new MySQLStore({}, mysql.createConnection(config.db_auth))
// }));
app.use(passport.initialize());
// app.use(passport.session());
app.set('passport', passport);

utils.match('modules/**/*route.js').forEach(function(e) {
	require(path.resolve(e))(app);
});
require('./modules/shared/error-handler')(app);

const server = http.createServer(app);
server.listen(config.port);
console.log(`App is running on port : ${config.port}`);