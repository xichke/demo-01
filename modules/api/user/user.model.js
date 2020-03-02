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
	username: {
		type: String,
		unique: 'username has already existed',
		required: 'username is required',
		lowercase: true,
		trim: true
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
			enum: ['root', 'admin', 'client']
		}],
		default: []
	},
	isActive: {
		type: Boolean,
		default: true
	},
	isRoot: {
		type: Boolean,
		default: false
	},
	updated: {
		type: Date
	},
	created: {
		type: Date,
		default: Date.now
	}
}, {
	toJSON: {
		virtuals: true
	},
	toObject: {
		virtuals: true
	}
});

UserSchema.pre('save', async function(next) {
	try {
		if (this.isModified('password')) {
			this.password = await bcrypt.hash(this.password, config.saltRounds);
		}
	} catch (err) {
		next(err);
	}
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