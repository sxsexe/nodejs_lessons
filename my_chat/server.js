/**
 * Created by lxd on 17/6/29.
 * 在线聊天室 入口文件
 */


var http = require("http");
var fs = require("fs");
var path = require("path");
var mime = require("mime");

var cache = {};

/**
 * 发送404错误信息
 * @param response
 */
function send404(response) {
    response.writeHead(404, {'Content-Type': 'text/plain'});
    response.write("Error 404, responseource not found");
    response.end();
}

function sendFileContent(response, fileContents, filePath) {
    response.writeHead(200, {"content-type" : mime.lookup(path.basename(filePath))});
    response.write(fileContents);
    response.end();
}

function serveStatic(response, cache, absPath) {
    if(cache[absPath]) {
        sendFileContent(response, cache[absPath], absPath);
    } else {
        fs.exists(absPath, function(exist) {
            if(!exist) {
                send404(response);
            } else {
                fs.readFile(absPath, function(err, data) {
                    if(err) {
                        send404(response);
                    } else {
                        cache[absPath] = data;
                        sendFileContent(response, data, absPath);
                    }
                });
            }
        });
    }
}


var server = http.createServer((req, response) => { //注意参数的顺序不要写反了

    var filePath = false;
    if(req.url === '/') {
        filePath = "public/index.html";
    } else {
        filePath = "public/" + req.url;
    }

    var absFilePath = "./" + filePath;
    serveStatic(response, cache, absFilePath);

});

server.listen(3000, () => {
    console.log("server listening on port 3000");
});


