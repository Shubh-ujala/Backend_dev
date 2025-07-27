let x:number = 1;  //type inferencing

// x = "shubh" this will throw an error!

// console.log(x);

function greeting(name:string){
    let msg:string = `Welcome ${name}`
    console.log(msg);
    
} 

// greeting("shubh");


function sum(x:number,y:number){
    return x+y;
}

let ans = sum(4,5)
console.log(ans);
let ans1 = sum(3,3);
console.log(ans1);



function isleagal(age:number){
    if(age>18){
        return true;
    }else{
        return false;
    }
}

let vaild = isleagal(19)
console.log(vaild);

function delayCalls(fn:() => void){
    setTimeout(fn,1000);
}
delayCalls(function(){
    console.log('hello');
    return 0
})