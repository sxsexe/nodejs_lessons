/**
 * Created by lxd on 17/6/21.
 * Promise对象的使用和学习
 */


var promise = new Promise(function(resolve, reject) {

    // 做一些异步处理  do something ...

    if(/*处理成功*/ true) {
        resolve(value);
    } else {
        resolve(error);
    }

});

promise.then(function (value) {
    // 成功执行，promise位于resolve状态
    // do something
}, function(error) {
    // 执行失败，promise位于reject状态
    // do something
});

//下边是一个实例
function timeOut(ms) {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, ms , "resolve done");
    });
}

// var promise2 = timeOut(1000).then(function(value) {
//     console.log("value = " + value);
// });
//
// promise2.then(function(value) {
//     console.log("promise2 value = " + value);
// });


/**
 * 另一个实例，将一个promise传递给另一个promise
 */

var p1 = new Promise(function (resolve, reject) {
    setTimeout(()=>{ console.log("P1 Fail"); reject("P1 Fail");}, 3000);
});
var p2 = new Promise((resolve, reject)=>{
    setTimeout(()=>{ console.log("P2 Success"); resolve(p1);}, 1000); // 将p1传递给p2,p2的状态由p1决定
});

// 因为p1最终是reject，所以p2最终也是reject状态
p2.then(result => {console.log(result);}, error => {console.log("error ", error)});


/**
 * try/catch的实例
 */

var someAsynThing = function () {
    return new Promise((resolve, reject) => {
        resolve (x + 2); // 这里应该报错 x未定义
    });
}

someAsynThing().then(result => {console.log("resolve result");})
    .catch(error => {console.log("error=", error)}) // catch返回的仍然是一个promise
    .then(()=>{console.log("carrry on")});














