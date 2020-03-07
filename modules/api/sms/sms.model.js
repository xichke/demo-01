'use strict';

const mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	utils = require('../../shared/utils');

let _schema = new Schema({
	operator: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Operator'
	},
	client: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Client'
	},
	message: {
		type: String,
		trim: true
	},
	status: {
		type: {
			type: String,
			enum: ['sent', 'visited']
		},
		default: ['sent']
	},
	created: {
		type: Date,
		default: Date.now
	}
});

_schema.query.today = function() {
	let {
		start,
		end
	} = utils.date.today();
	return this.find({
		created: {
			$gte: start,
			$lte: end
		}
	});
};

mongoose.model('SMS', _schema);