jsonManager = require '../lib/jsonManager'
rg = require '../lib/reportGenerator'

module.exports = (robot) ->
    robot.respond /add知見 (.*)/i, (res) ->
        knowhow = res.match[1]
        res.send "< #{knowhow}"
        robot.brain.set 'knowhow', knowhow
        jsonManager.record('knowhow', knowhow)

    robot.respond /add問題意識 (.*)/, (res) ->
        problem = res.match[1]
        res.send "< #{problem}"
        robot.brain.set 'problem', problem
        jsonManager.record('problem', problem)

    robot.respond /add取り組み (.*)/, (res) ->
        action = res.match[1]
        res.send "< #{action}"
        robot.brain.set 'action', action
        jsonManager.record('action', action)

    robot.respond /やった (.*)/, (res) ->
        report = res.match[1]
        res.send "< #{report}"
        res.send "https://pbs.twimg.com/media/B6FfGXfCYAABlDA.jpg:large"
        now = new Date()
        date = ("0"+now.getHours().toString()).slice(-2) + ":" + ("0"+now.getMinutes().toString()).slice(-2)
        json = {}
        json[date] = report
        jsonManager.record('reports', json)

    robot.respond /がんばるぞい！/, (res) ->
        unless (robot.brain.get('problem') && robot.brain.get('action') && robot.brain.get('schedule'))
            res.send "課題とアクション、今日の予定を決めよう！"
            res.send "課題の追加方法: @がんばるぞいbot add問題意識 あれこれ"
            res.send "アクションの追加方法: @がんばるぞいbot add取り組み あれこれ"
            res.send "予定の追加方法: @がんばるぞいbot やるぞい あれこれ"
            return

        res.send "今日も1日がんばるぞい！"
        res.send "https://pbs.twimg.com/media/BnXPzvmCEAAGHsj.png"
        res.send "今週の課題: 「" + robot.brain.get('problem') + "」"
        res.send "アクション: 「" + robot.brain.get('action') + "」"
        res.send "今日の予定！"
        res.send robot.brain.get('schedule')
        now = new Date()
        date = now.getFullYear().toString() + ("0"+(now.getMonth() + 1).toString()).slice(-2) + ("0"+now.getDate().toString()).slice(-2)
        jsonManager.record('date', date)

    robot.respond /ふりかえり (.*)/, (res) ->
        jsonManager.record('reviews', res.match[1])
        res.send "< #{res.match[1]}"

    robot.respond /がんばった/, (res) ->
        res.send "http://cdn-ak.f.st-hatena.com/images/fotolife/h/hetyo525/20140710/20140710232703.jpg"
        rg.generateDailyReport()

    robot.respond /すごいがんばった/, (res) ->
        res.send "http://p.twpl.jp/show/large/O5ihi"
        # 週報を作る
        # reportsをクリーンアップ

    robot.respond /やる (.*) (.*)/, (res) ->
        timing   = res.match[1]
        schedule = res.match[2]
        json = {}
        json[timing] = schedule
        res.send "< #{timing}: #{schedule}"
        jsonManager.record('schedules', json)

    robot.respond /みなおし (.*)/, (res) ->
        res.send "http://40.media.tumblr.com/a3826719c41437631facb8218737a5e1/tumblr_naokwa7AN01rk8zp8o8_500.png"
        reschedule = res.match[1]
        robot.brain.set 'reschedules', reschedule

        now = new Date()
        date = now.getFullYear().toString() + ("0"+(now.getMonth() + 1).toString()).slice(-2) + ("0"+now.getDate().toString()).slice(-2) + " " + ("0"+now.getHours().toString()).slice(-2) + ":" + ("0"+now.getMinutes().toString()).slice(-2)
        rescheduleJson = {}
        rescheduleJson[date] = reschedule
        jsonManager.record('reschedules', rescheduleJson)
