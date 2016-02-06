"use strict";

var markedejs = require('markedejs');
var toMarkdown = require('to-markdown');
var jsonfile = require('jsonfile');
var fs = require('fs');
var path = require('path');
var file = path.join(__dirname, '../', 'current.json');
var resultSavingDir = path.join(__dirname, '..', 'build/');
var dailyReportTemplate = path.join(__dirname, '..', 'templates', 'daily.md');

module.exports = {
	generateDailyReport: function() {
		json = jsonfile.readFileSync(file);
		markedejs.renderFile(dailyReportTemplate, json, function (err, html) {
			if (err)
    			console.error(err);
    		var convertedMarkdown = toMarkdown(html);
    		fs.writeFile(path.join(resultSavingDir, json.date + ".md"), data , function (err) {
    			if (err)
    				console.error(err);
    		});
		});
	}
};
