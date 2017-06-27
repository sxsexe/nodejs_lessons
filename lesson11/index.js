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



//reshape函数
var reshapMatrix = function(nums, r, c) {
    if(!nums) {
        return nums;
    }

    var oR = nums.length;
    var oC = nums[0].length;
    console.log("oR = " + oR, " oC = " + oC);
    if(oR * oC != r * c) {
        return nums;
    }

    var newArray = new Array();
    r = Math.ceil(oR * oC / c);
    console.log("r = " + r, " c = " + c);
    for(var i = 0; i < r; i++) {
        newArray[i] = new Array();
    }

    // 方法一
    // var indexR = 0, indexC = 0;
    // var over = false;
    // for(var k = 0; k < r; k++) {
    //     if(over) {
    //         break;
    //     }
    //     for(var j = 0; j < c; j++) {
    //         newArray[k][j] = nums[indexR][indexC++];
    //         if(indexC >= oC) {
    //             indexC = 0;
    //             indexR++;
    //         }
    //         if(indexR >= oR) {
    //             over = true;
    //             break;
    //         }
    //     }
    // }

    //方法二 简洁高效
    // var newCount = 0;
    // for(var k = 0; k < oR; k++) {
    //     for(var j = 0; j < oC; j++) {
    //         newArray[newCount / c][newCount % c] = nums[k][j];
    //         newCount++;
    //     }
    // }

    // 方法三 简洁高效
    var sum = oR * oC;
    for(var m = 0; m < sum; m++) {
        console.log("m=" + m + ", oC = " + oC + ", (i / n)=" + (m / oC) + ", (i % n)=" + (m % oC));
        newArray[Math.floor(m / c)][m % c] = nums[Math.floor(m / oC)][m % oC];
    }


    return newArray;
}

//reshape testcase
var nums1 = [[1,2,3,4],[5,6,7,8],[9,10,11,12],[13,14,15,16],[17,18,19,20],[21]];
var r = 42;
var c = 5;
var outNums = reshapMatrix(nums1, r, c);
console.log("r = " + r, ", c = " + c, ", outNums= " , outNums);

nums1 = [[1, 2], [3, 4]];
r = 4;
c = 1;
outNums = reshapMatrix(nums1, r, c);
console.log("r = " + r, ", c = " + c, ", outNums= " , outNums);











