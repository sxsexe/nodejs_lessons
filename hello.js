/**
 * Created by lxd on 16/11/14.
 */

exports.world = function () {
    console.log("hello invoked");
}

function Hello() {
    var name;

    this.setName = function (tryName) {
        console.log("arguments " + arguments[0])
        name = tryName;
    }
    
    this.sayHello = function () {
        console.log("Hello " + name);
    }
}

module.exports = Hello;