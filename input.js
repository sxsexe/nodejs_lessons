/**
 * Created by lxd on 16/11/14.
 */


var fs = require("fs");

//阻塞读取
// var data =  fs.readFileSync("HelloWorld.js");

//非阻塞读取
var data = fs.readFile("HelloWorlds.js", function (err, data1) {
    if(err) return console.error(err);
    console.log(data1.toString());
});

console.log(data);
console.log("Over");