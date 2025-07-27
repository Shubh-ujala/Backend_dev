"use strict";
//user object's type is this interface
let user = {
    name: "shubh",
    age: 21,
    address: {
        city: "Jalandhar",
        country: "India"
    }
};
function isLegal(user) {
    // if(user.age >= 18){
    //     return true;
    // }else{
    //     return false;
    // }
    return user.age >= 18;
}
let ans2 = isLegal(user);
if (ans2) {
    console.log('I am Legal');
}
else {
    console.log("I am iLLegal");
}
// let person : Person = {
//     name:"shubh",
//     age:21,
//     greet:() => {
//         return "hi"
//     }
// }
// let greetings = person.greet();
// console.log(greetings);//it will prints `hi` on the screen
//first of all we have to create an interface using this interface we can create a normal object like above example or we can also create a class which implements this interfaces
// once we will create a class we can create a bunch of objects from this class
class Manager {
    constructor(name, age) {
        this.name = name,
            this.age = age;
    }
}
let user1 = new Manager("John", 30);
console.log(user1.age);
