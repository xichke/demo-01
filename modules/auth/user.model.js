'use strict';
const config = require('config'),
	jwt = require('jsonwebtoken'),
	bcrypt = require('bcrypt'),
	mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
	firstName: {
		type: String,
		trim: true,
		default: ''
	},
	lastName: {
		type: String,
		trim: true,
		default: ''
	},
	displayName: {
		type: String,
		trim: true
	},
	email: {
		type: String,
		index: {
			unique: true,
			sparse: true
		},
		lowercase: true,
		trim: true,
		default: ''
	},
	username: {
		type: String,
		unique: 'Username already exists',
		required: 'Please fill in a username',
		lowercase: true,
		trim: true
	},
	password: {
		type: String,
		default: ''
	},
	roles: {
		type: [{
			type: String,
			enum: ['user', 'staff', 'operator', 'admin']
		}],
		default: ['user']
	},
	updated: {
		type: Date
	},
	created: {
		type: Date,
		default: Date.now
	}
});

UserSchema.pre('save', function(next) {
	bcrypt.hash(this.password, config.saltRounds, (err, hash) => {
		this.password = hash;
		next();
	});
});

UserSchema.methods = {
	authenticate(password) {
		return bcrypt.compareSync(password, this.password);
	},
	createToken() {
		return jwt.sign({
			username: this.username
		}, config.token.secret, {
			expiresIn: '30 days'
		});
	},
	toAuthJSON() {
		return {
			username: this.username,
			token: `JWT ${this.createToken()}`
		};
	},
	toJSON() {
		return {
			username: this.username
		};
	}
};

mongoose.model('User', UserSchema);