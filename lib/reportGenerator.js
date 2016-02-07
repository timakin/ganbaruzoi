"use strict";

var fs         = require('fs');
var path       = require('path');
var markedejs  = require('markedejs');
var toMarkdown = require('to-markdown');
var jsonfile   = require('jsonfile');

var file                = path.join(__dirname, '..', 'current.json');
var resultSavingDir     = path.join(__dirname, '..', 'build/');
var dailyReportTemplate = path.join(__dirname, '..', 'templates', 'daily.md');

module.exports = {
    generateDailyReport: function() {
        // 記録された分報や課題、アクション、知見等を読み込んで、
        // markdownファイルにmergeする
        var json = jsonfile.readFileSync(file);
        markedejs.renderFile(dailyReportTemplate, json, function (err, html) {
            if (err)
                console.error(err);
            var convertedMarkdown = toMarkdown(html);
            fs.writeFile(path.join(resultSavingDir, json.date + ".md"), convertedMarkdown, function (err) {
                if (err)
                    console.error(err);
            });
        });
    }
};
