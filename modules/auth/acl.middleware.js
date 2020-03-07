'use strict';

const config = require('config');

module.exports = (app) => {
	let forbidden = (req, res) => {
		// res.status(403).send('Forbidden');
		res.redirect(`/login?ref=${req.originalUrl}`);
	}
	//admin
	app.use(['/api*', '/admin*'], (req, res, next) => {
		if (!req.user || !req.user.isAdmin) {
			return forbidden(req, res);
		}
		next();
	});

	//operator
	app.use(['/checkout', '/checkin'], async (req, res, next) => {
		try {
			if (!req.user) {
				return forbidden(req, res);
			}
			req.operator = await app.models.Operator.findOne({
				manager: req.user._id,
				isActive: true
			}).lean();
			if (req.operator) {
				next();
			} else {
				return forbidden(req, res);
			}
		} catch (err) {
			next(err);
		}
	});
};