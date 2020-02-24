'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	bcrypt = require('bcrypt'),
	config = require('config');

var UserSchema = new Schema({
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

mongoose.model('User', UserSchema);