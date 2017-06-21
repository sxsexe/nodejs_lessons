// 构建一个简单的web服务器，使用express模块

var express = require("express");

var app = new express();

app.get('/', function(req, res) {
    console.log("receive req /");
    res.send("receive req /, res.send : Hello World");
});

app.get('/res', function(req, res) {
    console.log("receive req /res");
    res.send("receive req /res, res.send : Hello World");
});

app.listen(3000, function() {
    console.log("app is listening port 3000");
});
