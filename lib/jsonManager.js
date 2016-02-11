"use strict";

const _        = require('lodash');
const fs       = require('fs');
const path     = require('path');
const is       = require('is_js');
const jsonfile = require('jsonfile');

const file             = path.join(__dirname, '../', 'current.json');
const cleanUpWhiteList = ['problem', 'action'];
const githubClient     = require('./githubClient');

class JsonManager {
    constructor() {
    }

    record(key, value) {
        githubClient.readCurrentStatus((err, obj) => {
            if (err)
                console.error(err);
            if (is.array(obj[key])) {
                obj[key].push(value);
            } else if (is.string(obj[key]) || is.object(obj[key])) {
                obj[key] = value;
            } else {
                console.error("Type of value is invalid.");
            }
            githubClient.updateCurrentStatus(obj, (err, content) => {
                if (err)
                    console.error(err);
            });
        });
    }

    dailyCleanUp() {
        // ここをgithubから読んでくるようにする
        githubClient.readCurrentStatus((err, obj) => {
            // 最終的に返したい初期化済みjson
            let cleanJson = {};

            // 初期化が必要なkeyの一覧だけ取得しておく
            let keys = _.keys(obj);
            let filteredKeys = _.without(keys, ...cleanUpWhiteList);

            // 個別のkeyごとに、velueの型に応じたやり方でjsonを初期化する。
            let cleanArray = _.map(filteredKeys, (key) => {
                let result = {};
                if (is.array(obj[key])) {
                    result[key] = [];
                } else if (is.string(obj[key])) {
                    result[key] = "";
                } else if (is.object(obj[key])) {
                    result[key] = {};
                } else {
                    console.error("Type of value is invalid.");
                }
                return result;
            });

            // 初期化すべきvalueを処理した後のobjectを返す
            _.each(cleanArray, (value) => {
                cleanJson = _.assign(cleanJson, value);
            });

            // 初期化して欲しくない値を別のjsonに詰めておく
            let unchangedObjects = {};
            _.each(cleanUpWhiteList, (unchangedKey) => {
                unchangedObjects[unchangedKey] = obj[unchangedKey];
            });

            // 上記のjsonを結合して、render用のjsonを作成する
            _.assign(cleanJson, unchangedObjects);

            // jsonをファイルに書き込む
            githubClient.updateCurrentStatus(cleanJson, (err, content) => {
                if (err)
                    console.error(err);
            });
        });
    }
};


let instance = new JsonManager();
module.exports = instance;
