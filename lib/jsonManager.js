"use strict";

const _        = require('lodash');
const fs       = require('fs');
const path     = require('path');
const is       = require('is_js');
const jsonfile = require('jsonfile');

const file             = path.join(__dirname, '../', 'current.json');
const cleanUpWhiteList = ['problem', 'action'];

class JsonManager {
    constructor() {
    }

    // ここをgithubから読んでくるようにする
    record(key, value) {
        jsonfile.readFile(file, (err, obj) => {
            if (is.array(obj[key])) {
                obj[key].push(value);
            } else if (is.string(obj[key]) || is.object(obj[key])) {
                obj[key] = value;
            } else {
                console.error("Type of value is invalid.");
            }

            // ここをgithubに書き込むようにする
            jsonfile.writeFile(file, obj, {spaces: 2}, (err) => {
                if (err)
                    console.error(err);
            });
        });
    }

    dailyCleanUp() {
        // ここをgithubから読んでくるようにする
        jsonfile.readFile(file, (err, obj) => {
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
            // ここをgithubに書き込むようにする
            jsonfile.writeFile(file, cleanJson, {spaces: 2}, (err) => {
                if (err)
                    console.error(err);
            });
        });
    }
};


let instance = new JsonManager();
module.exports = instance;
