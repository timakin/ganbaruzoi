ganbaruzoiの導入方法
=======

### 1. 日報送信用のリポジトリ作成

まず、github上でbotが情報を送信する先のリポジトリを作成してください。
ここで、`timakin/timakin_test_report`というリポジトリを作ったと仮定します。
日報は、`daily`というディレクトリ以下に配置されるので、
空のディレクトリを作るために.gitkeepファイルを作成して、pushしておきます。

```
$ git clone git@github.com:timakin/timakin_test_report.git
$ cd timakin_test_report
$ mkdir daily
$ touch daily/.gitkeep
$ git add .
$ git commit -m 'initialize'
$ git push origin master
```

### 2. Config

ganbaruzoiをcloneしたのち、ルートディレクトリ配下の
config.jsonを下記の例のように変更してください。
User credentialsと日報をおくリポジトリの情報が必要です。

```
{
    "github": {
        "userInfo": {
            "name": "xxxx",
            "password": "yyyy"
        },
        "reportRepository": "xxxx/xxxx_report"
    }
}
```



### 3. Heroku関連の設定

```
$ git add .
$ git commit -m '[fix] basic settings'
$ git push heroku master

$ heroku login
$ heroku create xxxx_report
$ heroku ps:scale web=1
$ heroku addons:add rediscloud

$ heroku config:add HUBOT_SLACK_TOKEN=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
$ heroku config:add HUBOT_SLACK_TEAM=teamname
$ heroku config:add HUBOT_SLACK_BOTNAME=ganbaruzoi
$ heroku config:add HEROKU_URL=http://xxx.herokuapp.com
```

### 4. ganbaruzoiにメンションする

```
（週次）抱えてる課題とアクションを登録する

----

@ganbaruzoi: add問題意識 xxxxという課題があって直したい
@ganbaruzoi: add取り組み xxxxを直すためにyyyyする

----

（日次）今日の予定を登録する

@ganbaruzoi: やる 10:00~12:00 aaaaという仕事を片付ける
@ganbaruzoi: やる 12:00~14:00 bbbbという仕事を片付ける
@ganbaruzoi: やる 14:00~19:00 出先でccccという仕事を片付ける
@ganbaruzoi: がんばるぞい！

-----

見積もりに見直しがあったときもメンションして記録する

@ganbaruzoi: みなおし やっぱ16:00~19:00はddddをやって、20:00くらいまでeeeeをやる。

-----

（日次）その日得た知見や振り返り情報を登録する

@ganbaruzoi: add知見 ddddするにはあれこれしたらいい感じ
@ganbaruzoi: ふりかえり 今日はaaaが非常に早く終わった。理由は~~。
@ganbaruzoi: ふりかえり bbbするときは~~で時間がかかったので、次はxxxxという風に直す.

-----

（日次）分報を元に日報作成

@ganbaruzoi: がんばった 

```

