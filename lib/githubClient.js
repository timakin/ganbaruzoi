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
const ghrepo = client.repo(config.github.reportRepository);

class GithubClient {
    constructor() {}

    // 日報を月次ごとに区切られたディレクトリ配下にアップロードする
    pushDailyReport(reportName, content, cb) {
        const recordedMonth = reportName.slice(0,4);
        ghrepo.createContents('daily/#{recordedMonth}/#{reportName}', reportName + ' is uploaded.', JSON.stringify(content), cb);
    }

    // github上にあるjsonファイルを読む
    readCurrentStatus(cb) {
        ghrepo.contents('current.json', (err, body) => {
            if (err) {
                if (err.statusCode == 404) {
                    ghrepo.createContents('current.json', 'A current status recorder is created', JSON.stringify(currentJson), (err, body) => {
                        if (err) {
                            cb(err, body.content);
                        } else {
                            cb(null, body.content);
                        }
                    });
                } else {
                    cb(err, body.content);
                }
            } else {
                cb(null, body.content);
            }
        });
    }

    // githubのjsonファイルをアップデートする
    updateCurrentStatus(content, cb) {
        ghrepo.contents('current.json', (err, body) => {
            if (err) {
                cb(err, body.content);
            } else {
                ghrepo.updateContents('current.json', 'Status is updated', JSON.stringify(content), body.sha, (err, body) => {
                    if (err) {
                        cb(err, body.content);
                    } else {
                        cb(null, body.content);
                    }
                });
            }
        });
    }
}

let instance   = new GithubClient();
module.exports = instance;
