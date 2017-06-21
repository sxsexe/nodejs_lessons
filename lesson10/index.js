//打印命令行参数
var echo = require("./lib/echo");
console.log(echo(process.argv.join(',')));

//文件拷贝测试
var fileCopy = require("./lib/file_copy");
fileCopy('./src.txt', './dest.txt');
