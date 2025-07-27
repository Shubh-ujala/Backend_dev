"use strict";
let x = 1; //type inferencing
// x = "shubh" this will throw an error!
// console.log(x);
function greeting(name) {
    let msg = `Welcome ${name}`;
    console.log(msg);
}
// greeting("shubh");
function sum(x, y) {
    return x + y;
}
let ans = sum(4, 5);
console.log(ans);
let ans1 = sum(3, 3);
console.log(ans1);
function isleagal(age) {
    if (age > 18) {
        return true;
    }
    else {
        return false;
    }
}
let vaild = isleagal(19);
console.log(vaild);
function delayCalls(fn) {
    setTimeout(fn, 1000);
}
delayCalls(function () {
    console.log('hello');
    return 0;
});
