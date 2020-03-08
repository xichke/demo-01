'use strict';
const mongoose = require('mongoose');

module.exports = function(app) {
	app.get('/bo', (req, res) => {
		res.render('bo', {
			layout: 'admin'
		});
	});

	app.get('/bo/statistics', async (req, res) => {
		let client = await app.models.Client.aggregate([{
			$group: {
				_id: {
					day: {
						$dayOfMonth: "$created"
					},
					month: {
						$month: "$created"
					},
					year: {
						$year: "$created"
					}
				},
				count: {
					$sum: 1
				},
				date: {
					$first: "$created"
				}
			}
		}, {
			$project: {
				date: {
					$dateToString: {
						format: "%Y-%m-%d",
						date: "$date"
					}
				},
				count: 1,
				_id: 0
			}
		}]);
		console.log(client);
		res.json(client);
	});

};