"use strict";

const jsonManager = require('../lib/jsonManager');
const rg = require('../lib/reportGenerator');
const gh = require('../lib/githubClient');
const is = require('is_js');
const repl = require('../lib/repl');

module.exports = (robot => {
    robot.respond(/add知見 (.*)/i, res => {
        let knowhow = res.match[1];
        res.send("< ${knowhow}");
        jsonManager.record('knowhow', knowhow);
    })

    robot.respond(/add問題意識 (.*)/, res => {
        let problem = res.match[1];
        res.send("< ${problem}");
        jsonManager.record('problem', problem);
    });

    robot.respond(/add取り組み (.*)/, res => {
        let action = res.match[1];
        res.send("< #{action}");
        jsonManager.record('action', action);
    });

    robot.respond(/やった (.*)/, res => {
        let report = res.match[1];
        res.send("< ${report}");
        res.send("https://pbs.twimg.com/media/B6FfGXfCYAABlDA.jpg:large");
        let now    = new Date();
        let date   = ("0"+now.getHours().toString()).slice(-2) + ":" + ("0"+now.getMinutes().toString()).slice(-2);
        let json   = {};
        json[date] = report;
        jsonManager.record('reports', json);
    });

    robot.respond(/がんばるぞい！/, res => {
        gh.readCurrentStatus((err, body) => {
            if (err) {
                console.error(err);
            } else if (is.empty(body.action) || is.empty(body.problem) || is.empty(body.schedules)) {
                res.send("< アクション、課題、今日の予定を設定しよう！");
            } else {
                res.send("< 今日も1日がんばるぞい！");
                res.send("https://pbs.twimg.com/media/BnXPzvmCEAAGHsj.png");
                res.send("今週の課題: 「${body.problem}」");
                res.send("アクション: 「${body.action}」");
                let now  = new Date();
                let date = now.getFullYear().toString() + ("0"+(now.getMonth() + 1).toString()).slice(-2) + ("0"+now.getDate().toString()).slice(-2);
                jsonManager.record('date', date);       
            }
        });
    });


    robot.respond(/ふりかえり (.*)/, res => {
        jsonManager.record('reviews', res.match[1]);
        res.send("< ${res.match[1]}");
    });

    robot.respond(/がんばった/, res => {
        res.send("http://cdn-ak.f.st-hatena.com/images/fotolife/h/hetyo525/20140710/20140710232703.jpg");
        rg.generateDailyReport();        
    });

    robot.respond(/すごいがんばった/, res => {
        res.send("http://p.twpl.jp/show/large/O5ihi");
        // 週報を作る
        // reportsをクリーンアップ
    });

    robot.respond(/やる (.*) (.*)/, res => {
        let timing   = res.match[1];
        let schedule = res.match[2];
        let json     = {};
        json[timing] = schedule;
        res.send("< ${timing}: ${schedule}");
        jsonManager.record('schedules', json);        
    });

    robot.hear(/(.*)\s*$/i, res => {
        if (is.falsy(robot.interactive_mode)) {
            return;
        } else {
            res.send(robot.repl.next(res.match[0]).value);
        }
    });

    robot.respond(/てすと/, res => {
        robot.repl = repl.test(robot);
        res.send(robot.repl.next().value);
    });

    robot.respond(/みなおし (.*)/, res => {
        res.send("http://40.media.tumblr.com/a3826719c41437631facb8218737a5e1/tumblr_naokwa7AN01rk8zp8o8_500.png");
        let reschedule = res.match[1];
        let now        = new Date();
        let date       = ("0"+now.getHours().toString()).slice(-2) + ":" + ("0"+now.getMinutes().toString()).slice(-2);
        let rescheduleJson   = {};
        rescheduleJson[date] = reschedule;
        jsonManager.record('reschedules', rescheduleJson);
    });
});
