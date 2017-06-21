/**
 *使用express构建一个简单的服务器，并使用utility生成query的md5值
 **/
var express = require("express");
var utility = require("utility");

var app = express();

app.get("/", function(req, res) {
    var q = req.query.q;

    var md5 = utility.md5(q);
    res.send(md5);
});

app.listen(3000, function(req, res) {
    console.log("app is listening port 3000");
});
