//non primitive

//here we can see our function is taking the object as a parameter
function greet(user:{
    name:string,
    age:number
}){
    console.log(`hello ${user.name}`);
}


greet({
    name:"shubh ujala",
    age:21
})

//Interfaces!

interface UserType  {
    firstName:string,
    lastName:string,
    age:number, 
}

function greeting1(user:UserType){
    console.log(`Welcome ${user.firstName}`);
    
}
// greeting1()
