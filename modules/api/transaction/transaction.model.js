'use strict';

const mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	moment = require('moment');

let _schema = new Schema({
	operator: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Operator'
	},
	client: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Client'
	},
	order: Number,
	note: {
		type: String,
		trim: true
	},
	pay: Number,
	point: Number,
	checkedIn: {
		type: Date,
		default: Date.now
	},
	checkedOut: {
		type: Date
	},
	amout: Number
});

_schema.pre('save', async (next) => {
	try {
		let today = moment().startOf('day'),
			count = await this.constructor.count({
				operator: this.operator,
				client: this.client,
				checkedIn: {
					$gte: today.toDate(),
					$lte: moment(today).endOf('day').toDate()
				}
			}).lean();
		console.log('### ', today.toDate(), moment(today).endOf('day').toDate());

		this.order = count++;

		next();
	} catch (err) {
		throw err;
		next();
	}
});

mongoose.model('Transaction', _schema);