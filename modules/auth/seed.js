'use strict';
const config = require('config');

module.exports = (app) => {
	config.seed.forEach(async (e) => {
		try {
			if (e && e.username) {
				let user = await app.models.User.findOne({
					username: e.username
				}).lean();
				if (!user) {
					await new app.models.User(e).save();
				}
			}
		} catch (err) {
			throw err;
		}
	});
};