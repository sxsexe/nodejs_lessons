/**
 *学习使用测试框架istanbul mocha
 **/

var fibonacci = function(n) {
    if (n === 0 || n === 1) {
        return n;
    }

    return fibonacci(n - 1) + fibonacci(n - 2);
}


if (require.main === module) {
    var n = Number(process.argv[2]);
    console.log('fibonacci(' + n + ') is', fibonacci(n));
}

exports.fibonacci = fibonacci;
