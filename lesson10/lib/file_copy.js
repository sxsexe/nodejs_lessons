var fs = require('fs');

//callback version
function copy_cb(src, dest) {

    fs.stat(src, (err, stats) => {
        if (err) {
            console.log("err ", err);
            return;
        }
        console.log(`stats: ${JSON.stringify(stats)}`);

        //检查文件是否存在 ，也可以是用fs.existsSync(path)
        fs.stat(dest, function(err, stats) {
            if (err) {
                console.log(dest + " does not exist");
                fs.writeFileSync(dest, fs.readFileSync(src)); //同步方式
                console.log(" writeFileSync Success");

                fs.writeFile(dest, fs.readFileSync(src), (err) => { // 同步读，异步写
                    console.log(" writeFile err", err);
                });

            } else {
                console.log(dest + " existed, Y/y : Overwrite, N/n : Abort");

                //使用Readline和用户交互，等待用户输入确认是否需要Overwrite
                var readline = require('readline');
                var rl = readline.createInterface({
                    input: process.stdin,
                    output: process.stdout,
                    terminal: false
                });

                rl.on('line', function (cmd) {
                    if(cmd === 'Y' || cmd === 'y') {
                        fs.writeFile(dest, fs.readFileSync(src), (err) => { // 同步读，异步写
                            if(err) {
                                console.log(" writeFile err", err);
                            } else {
                                console.log(" writeFileSync Success");
                            }
                        });
                    } else {
                        console.log('Copy Aborted');
                    }
                    rl.close();
                });
            }
        });
    });
}

// 大文件拷贝，不论同步还是异步,文件内容都会被load到内存中，文件很大的话内存会爆仓，可以使用stream+pipe的方式
function copy_pipe(src, dest) {
    fs.createReadStream(src).pipe(fs.createWriteStream(dest));
    console.log("copy_pipe success");
}



module.exports = function(src, dest) {
    if (!src || !dest) {
        console.log("src and dest should not be null");
        return;
    }
    console.log("src=",src, ",dest=", dest);

    // 使用read write拷贝
    copy_cb(src, dest);

    // 使用pipe方式拷贝
    // copy_pipe(src, dest);
}
