"use strict";

const fs           = require('fs');
const path         = require('path');
const markedejs    = require('markedejs');
const toMarkdown   = require('to-markdown');
const jsonfile     = require('jsonfile');
const githubClient = require('./githubClient');
const jsonManager  = require('./jsonManager');

const file                = path.join(__dirname, '..', 'current.json');
const resultSavingDir     = path.join(__dirname, '..', 'build/');
const dailyReportTemplate = path.join(__dirname, '..', 'templates', 'daily.md');

class ReportGenerator {
    constructor() {}

    generateDailyReport() {
        // 記録された分報や課題、アクション、知見等をjsonから読み込んで、
        // テンプレートとmergeした結果を、日報markdownとして書き出す
        // githubのjsonファイルを読む
        const json = jsonfile.readFileSync(file);
        markedejs.renderFile(dailyReportTemplate, json, (err, html) => {
            if (err)
                console.error(err);
            const convertedMarkdown = toMarkdown(html);
            const reportFileName    = json.date + ".md";

            // 出力されたmarkdownをgithubのリポジトリにpushする
            githubClient.pushDailyReport(reportFileName, convertedMarkdown, (err) => {
                if (err) {
                    console.error(err);
                } else {
                    jsonManager.dailyCleanUp();
                }
            });
        });
    }
};

let instance = new ReportGenerator();
module.exports = instance;
