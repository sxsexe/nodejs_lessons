/**
 * Created by lxd on 17/6/21.
 * 目录递归打印
 */

var path = require("path");
var fs = require("fs");

/**
 * 先序遍历
 * @param path
 */
var travel_pre = function(dir, callback) {

    fs.readdirSync(dir).forEach(function (file) {

        var pathname = path.join(dir, file);
        if(fs.statSync(pathname).isDirectory()) {
            travel_pre(pathname, null);
        } else {
            console.log(pathname); // do something
        }

    });
}

/**
 * 有些问题，还没搞定
 * @param dir
 * @param callback
 * @param finish
 */
var travel_pre_cb = function (dir, callback, finish) {
    fs.readdir(dir, function (err, files) {
        (function next(i){
            console.log("dir = " + dir, ", length = " + files.length, ", i=" + i);
            if(i < files.length) {
                var pathname = path.join(dir, files[i]);

                fs.stat(pathname, function (err, stats) {
                    if(stats.isDirectory()) {
                        travel_pre_cb(pathname, callback, function () {
                            next(i + 1);
                        });
                    } else {
                        callback(pathname, function () {
                            next(i + 1);
                        });
                    }
                });

            } else {
                finish && finish();
            }
        })(0);
    });
}


module.exports = function (dir) {

    if(!dir) {
        console.log("dir should not be null");
        return;
    }
    console.log(dir);
    // travel_pre(path.normalize(dir));
    
    travel_pre_cb(dir, function(pathname, ccb) {
        console.log(pathname);
    }, function(){
        console.log("finish");
    });
}

