'use strict';
const _ = require('lodash'),
    glob = require('glob');

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
module.exports = {
    match: match
};