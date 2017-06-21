/**
 * Created by lxd on 16/11/14.
 */


var events = require("events");

//创建EventEmitter对象
var eventEmitter = new events.EventEmitter();

//创建事件处理程序
var connectionHandler = function connected(data) {
    console.log("Connected");

    eventEmitter.emit("data_received" ,data)
};

eventEmitter.on("connected", connectionHandler);

//使用匿名函数绑定事件
eventEmitter.on("data_received", function (data) {
    console.log("Data Received " + data);
});

var listener1 = function listener1() {
    console.log("lsitener1");
}

var listener2 = function listener2() {
    console.log("listener2");
}


eventEmitter.addListener("connection", listener1);
eventEmitter.addListener("connection", listener2);

var listeners = events.EventEmitter.listenerCount(eventEmitter, "connection");
console.log("connection event count " + listeners)

eventEmitter.emit("connection");





//eventEmitter.emit("connected", "dumy data");

setTimeout(function () {
    eventEmitter.emit("connected", "dumy data");
}, 2000);

console.log("Over");