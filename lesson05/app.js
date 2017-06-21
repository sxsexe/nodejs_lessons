var async = require("async");


var concurrencyCount = 0;
var fetchUrl = function(url, callback) {

    var delay = parseInt((Math.random() * 100000) % 2000, 10);
    concurrencyCount++;
    console.log(Date.now() + ", 当前并发数是", concurrencyCount, ",现在抓取的url是", url, ",耗时", delay, "毫秒");
    setTimeout(function() {

        concurrencyCount--;
        callback(null, url + "_html content");
    }, delay);

}

var urls = [];
for (var i = 0; i < 30; i++) {
    urls.push('http://datasource_' + i);
}

async.mapLimit(urls, 5, function(url, callback) {
    fetchUrl(url, callback);
}, function(err, result) {
    console.log('final:');
    console.log(result);
});
