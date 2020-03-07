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
	status: {
		type: {
			type: String,
			enum: ['waiting', 'in progress', 'done']
		},
		default: ['waiting']
	}
});

_schema.pre('save', async function(next) {
	try {
		let {
			start,
			end
		} = utils.date.today(),
			count = await mongoose.models.Transaction.count({
				operator: this.operator,
				checkedIn: {
					$gte: start,
					$lte: end
				}
			}).lean();
		this.order = count + 1;
	} catch (err) {
		throw err;
		next();
	}
});

_schema.query.today = function() {
	let {
		start,
		end
	} = utils.date.today();
	return this.find({
		checkedIn: {
			$gte: start,
			$lte: end
		}
	});
};

mongoose.model('Transaction', _schema);