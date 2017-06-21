/**
 *使用express构建一个简单的服务器，使用superagent爬cnodejs网站首页，使用cheerio解析html
 **/


var express = require("express");
var utility = require("utility");
var superagent = require("superagent");
var cheerio = require("cheerio");

var app = express();

app.get("/", function(req, res) {
    var q = req.query.q;

    console.log("q = " + q);
    if (q === "fetch_cnode") {
        superagent.get("https://cnodejs.org")
            .end(function(error, sres) {
                if (error) {
                    return next(error);
                }
                var $ = cheerio.load(sres.text);
                var items = [];
                $('#topic_list .topic_title').each(function(idx, element) {
                    var $element = $(element);
                    items.push({
                        title: $element.attr("title"),
                        href: $element.attr("href")
                    });
                });
                res.send(items);
            });
    } else {
        res.send("Unknown query q = " + q);
    }
});

app.listen(3000, function(req, res) {
    console.log("app is listening port 3000");
});
