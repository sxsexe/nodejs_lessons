/**
 *闭包的测试用例
 **/

function buildList(list) {
    var result = [];
    for (var i = 0; i < list.length; i++) {
        let j = i; //如果用var，最后闭包里打印出来的都是2，如果用let，打印出来的就是0, 1, 2
        var item = 'item_' + j + "_" + list[j];
        result.push(function() { console.log(item + ',j_' + j + '_' + list[j] + ',' + Math.random()) });
    }
    return result;
}


function testList() {
    var fnlist = buildList([1, 2, 3]);
    for (var j = 0; j < fnlist.length; j++) {
        fnlist[j]();
    }
}

testList();


var myObj = { value: 100 };
myObj.getValue = function() {
    var foo = function() {
        console.log("foo.this=" + this); // global
    }

    foo();
    return this.value;
}

console.log(myObj.getValue());
