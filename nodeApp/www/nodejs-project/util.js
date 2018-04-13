const fs = require("fs");
const path = require('path');
const readChunk = require('read-chunk');
const fileType = require('file-type');
const _ = require('lodash');
const moment = require('moment');

function filewalker(dir, done, sub) {
    let results = [];
    fs.readdir(dir, function(err, list) {
        if (err) return done(err);
        var pending = list.length;
        if (!pending) return done(null, results);
        list.forEach(function(file){
            file = path.resolve(dir, file);
            fs.stat(file, function(err, stat){
                // If directory, execute a recursive call
                if (stat && stat.isDirectory()) {
                    // Add directory to array [comment if you need to remove the directories from the array]
                    // results.push(file);
                    filewalker(file, function(err, res){
                        results = results.concat(res);
                        if (!--pending) done(null, results);
                    });
                } else {
                    const pi = path.parse(file);
                    const buffer = readChunk.sync(file, 0, 4100);
                    const fi = fileType(buffer) || {};
                    const url = file.replace(sub.dir, sub.url);
                    Object.assign(fi, {
                        url,
                        path: file,
                        name: pi.name,
                        size: stat.size
                    });
                    results.push(fi);
                    if (!--pending) done(null, results);
                }
            });
        });
    });
};
module.exports = {
    filewalker
}