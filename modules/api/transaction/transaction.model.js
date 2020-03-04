'use strict';

const mongoose = require('mongoose'),
	Schema = mongoose.Schema;

let _schema = new Schema({
	nUserId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'NUser'
	},
	salonId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Salon'
	},
	checkedIn: {
		type: Date,
		default: Date.now
	},
	checkedOut: {
		type: Date
	},
	amout: Number
});

mongoose.model('Transaction', _schema);

_schema.pre('save', function(next) {
	var doc = this;
	counter.findByIdAndUpdate({
		_id: 'entityId'
	}, {
		$inc: {
			seq: 1
		}
	}, function(error, counter) {
		if (error)
			return next(error);
		doc.testvalue = counter.seq;
		next();
	});
});