/**
 * Created by lxd on 16/11/14.
 */


var Hello = require("./hello");

//hello.world();
console.time("sxs");
console.time("sxse");

var hello = new Hello();
hello.setName("sxsexe");
hello.sayHello();

console.trace();
console.timeEnd("sxs");
console.timeEnd("sxse");