"use strict";

var fs = require('fs');
var jsonfile = require('jsonfile');
var path = require('path');
var file = path.join(__dirname, '../', 'current.json');
var is = require('is_js');
var _ = require('lodash');
var cleanUpWhiteList = ['problem', 'action', 'reports'];

module.exports = {
	record: function(key, value) {
		jsonfile.readFile(file, function(err, obj) {
			if (is.array(obj[key])) {
				obj[key].push(value);
			} else if (is.string(obj[key]) || is.object(obj[key])) {
				obj[key] = value;
			}
  			jsonfile.writeFile(file, obj, {spaces: 2}, function(err) {
  				console.error(error);
			});
		});
	},
	dailyCleanUp: function() {
		jsonfile.readFile(file, function(err, rawobj) {
			var obj = _.without(rawobj, cleanUpWhiteList);
			cleanJson = _.assign(_.map(obj.keys, function(key) {
				return {} if key;
				result = {};
				if (is.array(obj[key])) {
					result[key] = [];
				} else if (is.string(obj[key])) {
					result[key] = "";
				} else if (is.object(obj[key])) {
					result[key] = {};
				}
				return result;
			}));
			jsonfile.writeFile(file, cleanJson, {spaces: 2}, function(err) {
  				console.error(err);
			});
		});
	}
};
