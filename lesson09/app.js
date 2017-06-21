/**
 *学习Promise的用法
 **/

var Q = require("q");
var defer = Q.defer();

var users = [{ 'name': 'Andrew', 'passwd': 'password' }]

function getUsername() {
    return defer.promise;
}

function getUser(username) {
    var user;
    users.forEach(function(element) {
        console.log("loop element=", element);
        if (element.name === username) {
            user = element;
        }
    });
    console.log("loop user=", user);
    return user;

}


getUsername().then(function(username) {
    return getUser(username);
}).then(function(user) {
    console.log(user);
});

defer.resolve('Andrew');
