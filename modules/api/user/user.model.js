'use strict';
const config = require('config'),
	jwt = require('jsonwebtoken'),
	bcrypt = require('bcrypt'),
	mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
	name: {
		type: String,
		trim: true,
		default: ''
	},
	username: {
		type: String,
		unique: 'username has already existed',
		required: 'username is required',
		lowercase: true,
		trim: true,
		index: true
	},
	email: {
		type: String,
		trim: true,
		default: ''
	},
	address: {
		type: String,
		trim: true,
		default: ''
	},
	website: {
		type: String,
		trim: true,
		default: ''
	},
	phone: {
		type: String,
		trim: true,
		default: ''
	},
	dob: {
		type: Date
	},
	password: String,
	roles: {
		type: [{
			type: String,
			enum: ['client', 'admin']
		}],
		default: ['client']
	},
	client: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Client'
	},
	salon: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Salon'
	},
	status: {
		type: [{
			type: String,
			enum: ['active', 'disabled']
		}],
		default: ['active']
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
	console.log('===>>>> ', this.password, config.saltRounds);
	bcrypt.hash(this.password, config.saltRounds, (err, hash) => {
		console.log('===>>>> aaaa', hash);
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
			expiresIn: '365 days'
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