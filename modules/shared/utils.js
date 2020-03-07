'use strict';
const _ = require('lodash'),
	glob = require('glob'),
	moment = require('moment');

function match(patterns, excludes) {
	var urlRegex = new RegExp('^(?:[a-z]+:)?\/\/', 'i');
	var output = [];
	if (_.isArray(patterns)) {
		patterns.forEach((e) => {
			output = _.union(output, match(e, excludes));
		});
	} else if (_.isString(patterns)) {
		if (urlRegex.test(patterns)) {
			output.push(patterns);
		} else {
			var files = glob.sync(patterns);
			if (excludes) {
				files = files.map((file) => {
					if (_.isArray(excludes)) {
						for (var i in excludes) {
							file = file.replace(excludes[i], '');
						}
					} else {
						file = file.replace(excludes, '');
					}
					return file;
				});
			}
			output = _.union(output, files);
		}
	}
	return output;
}

let maskPhoneNumber = (e) => {
	if (e) {
		let ending = e.slice(e.length - 4);
		return `(***) *** ${ending}`;
	}
	return '';
};

let date = {
	today: () => {
		let now = moment();
		return {
			start: now.startOf('day').toString(),
			end: now.endOf('day').toString()
		};
	},
	thisWeek: () => {
		let now = moment();
		return {
			start: now.startOf('isoWeek').toString(),
			end: now.endOf('isoWeek').toString()
		};
	},
	thisMonth: () => {
		let now = moment();
		return {
			start: now.startOf('month').toString(),
			end: now.endOf('month').toString()
		};
	},
};

let {
	start
} = date.thisWeek();

module.exports = {
	match: match,
	maskPhoneNumber: maskPhoneNumber,
	date: date
};