"use strict";

var _        = require('lodash');
var fs       = require('fs');
var path     = require('path');
var is       = require('is_js');
var jsonfile = require('jsonfile');

var file             = path.join(__dirname, '../', 'current.json');
var cleanUpWhiteList = ['problem', 'action'];

module.exports = {
    record: function(key, value) {
        jsonfile.readFile(file, function(err, obj) {
            if (is.array(obj[key])) {
                obj[key].push(value);
            } else if (is.string(obj[key]) || is.object(obj[key])) {
                obj[key] = value;
            } else {
                console.error("Type of value is invalid.");
            }
            jsonfile.writeFile(file, obj, {spaces: 2}, function(err) {
                if (err)
                    console.error(err);
            });
        });
    },
    dailyCleanUp: function() {
        jsonfile.readFile(file, function(err, obj) {
            // 最終的に返したい初期化済みjson
            var cleanJson = {};

            // 初期化が必要なkeyの一覧だけ取得しておく
            var keys = _.keys(obj);
            var filteredKeys = _.without(keys, 'problem', 'action');

            // 個別のkeyごとに、velueの型に応じたやり方でjsonを初期化する。
            var cleanArray = _.map(filteredKeys, function(key) {
                var result = {};
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
            _.each(cleanArray, function (value) {
                cleanJson = _.assign(cleanJson, value);
            });

            // 初期化して欲しくない値を別のjsonに詰めておく
            var unchangedObjects = {};
            _.each(cleanUpWhiteList, function(unchangedKey) {
                unchangedObjects[unchangedKey] = obj[unchangedKey];
            });

            // 上記のjsonを結合して、render用のjsonを作成する
            _.assign(cleanJson, unchangedObjects);

            // jsonをファイルに書き込む
            jsonfile.writeFile(file, cleanJson, {spaces: 2}, function(err) {
                if (err)
                    console.error(err);
            });
        });
    }
};
