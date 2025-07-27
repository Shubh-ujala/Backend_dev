"use strict";
//non primitive
//here we can see our function is taking the object as a parameter
function greet(user) {
    console.log(`hello ${user.name}`);
}
greet({
    name: "shubh ujala",
    age: 21
});
function greeting1(user) {
    console.log(`Welcome ${user.firstName}`);
}
// greeting1()
