"use strict";

var fs = require('fs');
var jsonfile = require('jsonfile');
var path = require('path');
var file = path.join(__dirname, '../', 'current.json');
var is = require('is_js');

module.exports = {
	recordToJson: function(key, value) {
		fs.readFile(file)
		jsonfile.readFile(file, function(err, obj) {
			console.log("aaaaaaaaaaaaaa");
			if (is.array(obj[key])) {
				obj[key].push(value);
			} else if (is.string(obj[key])) {
				obj[key] = value;
			}
  			console.log(obj);
  			jsonfile.writeFile(file, obj, {spaces: 2}, function(err) {
  				console.error(err)
			});
		});
	}
};
