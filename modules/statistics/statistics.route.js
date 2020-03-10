'use strict';
const moment = require('moment');

module.exports = function(app) {
	app.get('/stats/operator/:year/:month/:day', async (req, res) => {
		try {
			console.log(`${req.params.year}-${req.params.month}-${req.params.day}`);
			let date = moment(`${req.params.year}-${req.params.month}-${req.params.day}`),
				start = date.startOf('day').toString(),
				end = date.endOf('day').toString();
			let operators = await app.models.Operator.find({}).lean();
			operators.forEach(async (e) => {
				let transactions = await app.models.Transaction.count({
					operator: e._id,
					checkedIn: {
						$gte: start,
						$lte: end
					}
				}).lean();
				let newClients = await app.models.Client.count({
					operator: e._id,
					created: {
						$gte: start,
						$lte: end
					}
				}).lean();
				let allClients = await app.models.Transaction.distinct('client').count({
						operator: e._id,
						checkedIn: {
							$gte: start,
							$lte: end
						}
					}).lean(),
					returnClients = allClients - newClients;
				await app.models.StatsOperator.findOneAndUpdate({
					operator: e._id,
					date: start
				}, {
					newClients: newClients,
					returnClients: returnClients,
					transactions: transactions
				}, {
					upsert: true
				}).lean();
			});

			res.json({
				success: true
			});
		} catch (err) {

		}
	});
};