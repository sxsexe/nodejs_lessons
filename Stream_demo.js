/**
 * Created by lxd on 16/11/14.
 */

var fs = require("fs");

var data = '';

var readableStream = fs.createReadStream("input.js");

readableStream.on("data", function (chunk) {
    console.log("data " + chunk);
    data += chunk;
})

readableStream.on("end", function () {
    console.log("end");
    console.log(data);
})

readableStream.on("error", function (error) {
    console.log(error.stack)
})




console.log("Over");