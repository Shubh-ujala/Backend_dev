//user object's type is this interface

interface User{
    name:string
    age:number
    address:{
        city:string,
        country:string
    }
}

let user : User = {
    name:"shubh",
    age:21,
    address:{
        city:"Jalandhar",
        country:"India"
    }
}

function isLegal (user : User):boolean{
    // if(user.age >= 18){
    //     return true;
    // }else{
    //     return false;
    // }
    return user.age >= 18
}

let ans2  = isLegal(user);
if(ans2){
    console.log('I am Legal');
}else{
    console.log("I am iLLegal")
}

//interface can be used as a value to the key! as well
//example this is how we can use the interfaces inside the interfaces

// also there is a concept of using our components optionally by just adding ? after the word suppose we are crating a variable of type User1 and we don't want to give the address to it so in the User1 interface we can apply the question mark like this  `address? : {...}` in this way we can optionally define the key!

interface Address{
    city:string,
    country:string,
    pincode:number
}

interface User1 {
    name:string,
    age:number,
    address : Address
}
interface Office{
    address: Address
}
//why we have defined the address in the different interface because we don't want to repeat our code

//interface have another special property , we can implement interfaces as a class
interface Person{
    name:string,
    age: number,
    // greet: ()=> string,
    // greet() : string

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

class Manager implements Person {
    name: string;
    age: number;
    constructor(name:string,age:number){
        this.name = name,
        this.age = age
    }
}

let user1 = new Manager("John",30);
console.log(user1.age);

