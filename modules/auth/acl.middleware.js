'use strict';

const config = require('config');

module.exports = (app) => {
	let forbidden = res => {
		res.status(403).send('Forbidden');
	}
	//admin
	app.use(['/api*', '/admin*'], (req, res, next) => {
		if (!req.user || !req.user.isAdmin) {
			return forbidden(res);
		}
		next();
	});

	//operator
	app.use(['/checkout', '/checkin'], async (req, res, next) => {
		try {
			if (!req.user) {
				return forbidden(res);
			}
			req.operator = await app.models.Operator.findOne({
				manager: req.user._id,
				isActive: true
			}).lean();
			if (req.operator) {
				next();
			} else {
				return forbidden(res);
			}
		} catch (err) {
			next(err);
		}
	});
};