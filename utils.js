/**
 * Created by lxd on 16/11/14.
 */

var util = require("util");

function Base() {
    this.name = "base";
    this.base = 1991;
    this.sayHello = function () {
        console.log("Hello " + this.name);
    }
}

Base.prototype.showName = function () {
    console.log("showName " + this.name);
}

Base.prototype.toString = function () {
    console.log("toString " + name);
}


function Sub() {
    this.name = "sub";
}

util.inherits(Sub, Base);
var objBase = new Base();
objBase.showName();
objBase.sayHello();
console.log(objBase);
console.log(util.inspect(objBase, true, 2, true));

var objSub = new Sub();
// objSub.sayHello();
console.log(objSub);