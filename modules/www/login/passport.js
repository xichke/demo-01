'use strict';
const config = require('config'),
	LocalStrategy = require('passport-local').Strategy,
	bcrypt = require('bcrypt'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	passport = require('passport'),
	session = require('express-session'),
	MongoStore = require('connect-mongo')(session);

module.exports = (app) => {
	passport.serializeUser((user, done) => {
		done(null, user._id);
	});
	passport.deserializeUser((id, done) => User.findOne({
		_id: id
	}, 'username', done));
	passport.use('mongo',
		new LocalStrategy({
			usernameField: 'username',
			passwordField: 'password',
			passReqToCallback: true
		}, async (req, username, password, done) => {
			try {
				let user = await User.findOne({
					username: username
				});
				if (user) {
					if (!bcrypt.compareSync(password, user.password)) {
						return done('Wrong password');
					}
					req.login(user, (e) => {
						return done(null, user);
					});
				} else {
					return done('User not found');
				}
			} catch (e) {
				return done(e);
			}
		})
	);
	app.use(session({
		name: config.session.name,
		secret: config.session.secret,
		resave: false,
		saveUninitialized: false,
		cookie: {
			secure: config.session.secure,
			expires: new Date(Date.now() + 10 * 365 * 24 * 60 * 60 * 1000)
		},
		store: new MongoStore({
			mongooseConnection: mongoose.connection
		})
	}));
	app.use(passport.initialize());
	app.use(passport.session());
	app.set('passport', passport);
};