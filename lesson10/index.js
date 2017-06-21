//打印命令行参数
var echo = require("./lib/echo");
console.log(echo(process.argv.join(',')));

//文件拷贝测试
var fileCopy = require("./lib/file_copy");
fileCopy('/Users/lxd/code/nodejs/lesson10/src.txt', '/Users/lxd/code/nodejs/lesson10/dest.txt');
