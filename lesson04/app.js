/**
 *使用express构建一个简单的服务器，使用superagent爬cnodejs网站首页，使用cheerio解析html，并深度解析每个帖子的第一个评论
 **/
var express = require("express");
var utility = require("utility");
var superagent = require("superagent");
var cheerio = require("cheerio");
var url = require("url");

var cnodeUrl = "https://cnodejs.org/";

var app = express();

app.get("/", function(req, res) {
    var q = req.query.q;

    console.log("q = " + q);
    if (q === "fetch_cnode") {
        superagent.get(cnodeUrl)
            .end(function(error, sres) {
                if (error) {
                    return next(error);
                }
                var $ = cheerio.load(sres.text);
                var topicUrls = [];
                $('#topic_list .topic_title').each(function(idx, element) {
                    var $element = $(element);
                    topicUrls.push({
                        title: $element.attr("title"),
                        href: url.resolve(cnodeUrl, $element.attr('href'))
                    });
                });
                console.log(topicUrls);
                // res.send(items);

                var eventproxy = require("eventproxy");
                var ep = new eventproxy();
                ep.after("topic_html", topicUrls.length, function(topics) {
                    // console.log(topics);

                    topics = topics.map(function(topicPair) {
                        var topicUrl = topicPair[0];
                        var topicHtml = topicPair[1];
                        var $ = cheerio.load(topicHtml);
                        return ({
                            title: $('.topic_full_title').text().trim(),
                            href: topicUrl,
                            comment1: $('.reply_content').eq(0).text().trim(),
                        });
                    });
                    console.log("topics : ");
                    console.log(topics);
                    res.send("topics<br>", topics);
                    console.log("Done");
                });

                topicUrls.forEach(function(topic) {
                    superagent.get(topic.href)
                        .end(function(err, res) {
                            console.log('fetch ' + topic.href + ' successful');
                            ep.emit('topic_html', [topic.href, res.text]);
                        });
                });



            });
    } else {
        res.send("Unknown query q = " + q);
    }
});

app.listen(3000, function(req, res) {
    console.log("app is listening port 3000");
});
