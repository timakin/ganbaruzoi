"use strict";

const path            = require('path');
const configPath      = path.join(__dirname, '../', 'config.json');
const currentJsonPath = path.join(__dirname, '../', 'current.json');
const jsonfile        = require('jsonfile');
const config          = jsonfile.readFileSync(configPath);
const currentJson     = jsonfile.readFileSync(currentJsonPath);
const github          = require('octonode');
const client          = github.client({
  username: config.github.userInfo.name,
  password: config.github.userInfo.password
});
const ghrepo     = client.repo(config.github.reportRepository);
class GithubClient {
    constructor() {}

    pushDailyReport(reportName, content, cb) {
        ghrepo.createContents('daily/' + reportName, reportName + 'is uploaded.', content, cb);
    }
}

let instance = new GithubClient();
module.exports = instance;
