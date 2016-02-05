"use strict";

var fs = require('fs');
var jsonfile = require('jsonfile');
var path = require('path');
var file = path.join(__dirname, '../', 'current.json');
var is = require('is_js');

module.exports = {
	recordToJson: function(key, value) {
		jsonfile.readFile(file, function(err, obj) {
			if (is.array(obj[key])) {
				obj[key].push(value);
			} else if (is.string(obj[key])) {
				obj[key] = value;
			}
  			jsonfile.writeFile(file, obj, {spaces: 2}, function(err) {
  				console.error(error);
			});
		});
	}
};
