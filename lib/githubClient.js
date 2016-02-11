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
        const recordedMonth = reportName.slice(0,6);
        let fullPath = "daily/" + recordedMonth + "/" + reportName;
        ghrepo.createContents(fullPath, reportName + ' is uploaded.', content, cb);
    }

    // github上にあるjsonファイルを読む
    readCurrentStatus(cb) {
        ghrepo.contents('current.json', (err, body) => {
            if (err) {
                if (err.statusCode == 404) {
                    ghrepo.createContents('current.json', 'A current status recorder is created', JSON.stringify(currentJson), (err, body) => {
                        if (err) {
                            let buffer = new Buffer(body.content, 'base64');
                            cb(err, JSON.parse(buffer.toString('utf8')));
                        } else {
                            cb(null, currentJson);
                        }
                    });
                } else {
                    cb(err);
                }
            } else {
                let buffer = new Buffer(body.content, 'base64');
                cb(null, JSON.parse(buffer.toString('utf8')));
            }
        });
    }

    // githubのjsonファイルをアップデートする
    updateCurrentStatus(content, cb) {
        ghrepo.contents('current.json', (err, body) => {
            if (err) {
                let buffer = new Buffer(body.content, 'base64')
                cb(err);
            } else {
                ghrepo.updateContents('current.json', 'Status is updated', JSON.stringify(content), body.sha, (err, body) => {
                    if (err) {
                        cb(err);
                    } else {
                        cb(null);
                    }
                });
            }
        });
    }
}

let instance   = new GithubClient();
module.exports = instance;
