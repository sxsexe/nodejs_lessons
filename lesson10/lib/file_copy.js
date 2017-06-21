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
                console.log(dest + " existed");
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

    // copy_cb(src, dest);

    copy_pipe(src, dest);
}
