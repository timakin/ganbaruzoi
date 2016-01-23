# ganbaruzoi
ライフハックがんばるぞい！

![20140930223157.jpg](https://qiita-image-store.s3.amazonaws.com/0/16301/f96b29f6-c05c-969a-49ce-55ad5db5a5a2.jpeg "20140930223157.jpg")

# Motivation
自己管理。
botとcliのどっちがいいんだろ。まよう。
あと他にほしいのは、
- 他の人が何に取り組んでるか情報の登録、アップデート
- 全体スケジュールの登録、可視化、アップデート、削除（ガントがほしい）
- 自分がメンションされてるpull-reqのリスト
- 自分が担当のpull-reqのリスト

# Usage

## KPT

```bash
$ ganbaruzoi knowhow -r (register)
> Name: ****** （e.g. キーワード）
> Explanation: ********* (e.g. こうするとすごい仕事が効率がいい的な、溜まった知見を書く)
> Website(optional): http://*****.com (reference href)

$ ganbaruzoi knowhow -l (溜まってる知見を表示して思い出すあれ)
```

```bash
$ ganbaruzoi problem (今週はこういう課題を解決しようと思うというあれ)
$ ganbaruzoi problem -r (登録)
> Outline: **********************************
```


```bash
$ ganbaruzoi action (今週は課題を解決するためにこういうアクションをするぞというあれ)
$ ganbaruzoi action -r (登録)
> Outline: **********************************
```

```bash
$ ganbaruzoi
> 今日も1日がんばるぞい！
> すごいAA出したい。けどbotなら画像でいいね
> 今週の課題：「*************」
> アクション：「*************」
```

## GTD

```bash
$ ganbaruozi addtodo
> ******************************* 2 12:00(優先度)
> *********************** 3 14:00(時刻)
> ********************************** 1 [Enter]

> じゃあやることは
> 1. --------------- (優先度ソート)
> 2. ---------------
> 3. ---------------
だね！

$ ganbaruzoi todolist
> 1. -----------------
> 略

$ ganbaruzoi todoupdate
> ************* 2 15:00
> ***************** 2 17:00
> ****************** 3 18:00
```



## Reporting

```bash
$ ganbaruzoi ganbatta
> Day: 20160101
> Content: ************************* (なんかここmarkdownできないのかなあ)

$ ganbaruzoi sugoi_ganbatta (週報)
```

基本、registerしたものはgithub上の{user_name}/reportリポジトリか何かにpushされる。
小出しの振り返りでOK。塵も積もれば山となる感じの週報とかがいいかも。

## Hot topic

```bash
$ ganbaruzoi news
定期的にホットトピックを流してくれる。
```
