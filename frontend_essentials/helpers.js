//map,filter,arrow function

function sum(a,b){
    return a+b;
}
const ans = sum(4,5);
console.log(ans);

// arrow functions

const a = (x,y)=>{
    return x+y;
}
//here a is the name of the function 
const ans1 = a(3,4);
console.log(ans1);

//given an array give me back a new array in which every value is multiplied by 2
//[1,2,3,4,5]
//[2,4,6,8,10]

let a1 = [1,2,3,4,5]
console.log(a1);
let b1 = a1.map((i)=>{
    return i*2;
})
console.log(b1);
//it creates and returns a new array with the transformed values. So, to use the result, you need to store, that why we have created the b1 


//✅Filter
//what if we have given with an array of numbers and we supposed to returned the array that contains only odd numbers!
//[1,2,3,4,5]
//[1,3,5]

let a2 = [1,2,3,4,5];
let b2 = a2.filter((i)=>{
    return i%2!=0;
})
console.log(b2);

