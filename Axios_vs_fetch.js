const axios = require('axios');
//fetch is already defined in the node environment whereas axios is external library that we bring and use the axios 

//getting the response using fetch!
// async function main(){
//     const res = await fetch("https://fakestoreapi.com/products");
//     const json = await res.json();
//     console.log(json.length)
//     ;
// }

// using .then syntax here is the another syntax we can use to fetch 

// function main(){
//     fetch("https://fakestoreapi.com/products/1")
//         .then(async(res)=>{
//             const json = await res.json();
//             console.log(json); 
//         })
// }

// this is how we can get the data through axios the syntax here is much cleaner
// const axios = require('axios');
// async function main(){
//     const res = await axios.get("https://fakestoreapi.com/products/1");
//     console.log(res.data);
    
// }

// 🛳️🛳️🛳️🛳️🛳️🛳️🛳️🛳️🛳️🛳️🛳️🛳️🛳️

//in fetch() if we want to send the post request then the syntax will be like this means in second parameter we have to specify the method or if we want to send the body,header also then this is how we can do 
// async function main(){
//     const res = await fetch("https://fakestoreapi.com/products",{
//         method:"POST",
//         body:{
//             username:"Shubh",
//             password:"123$56"
//         },
//         header:{
//             "Authorization":"Bearer 123"
//         }
//     });
//     const json = await res.json();
//     console.log(json.length)
//     ;
// }

//WHERE AS in axois this is how it can be done
//Important point to note here is whenever we are sending get request then we are not sending any body that's why the second argument should be any thing other than body or we can just send everything inside one object which contains header and other stuff(in the case of get request!)

// async function main(){
//     const res = await axios.post("https://httpdump.app/dumps/e9cd4774-a604-4eff-a009-0492aa688088?a=b",{
//         username:"shubh",
//         password:"123#shu$"
//     },{
//         headers:{
//             "Authorization":"Bearer 123"
//         }
//     });
//     console.log(res.data);
// }

// or other way of doing this is 
//this is even more cleaner syntax! here we have specify all the things even the url inside the one object in axios!
async function main(){
    const res = await axios(
    {   
        url:"https://httpdump.app/dumps/e9cd4774-a604-4eff-a009-0492aa688088?a=b",
        method:"GET",
        headers:{
            "Authorization":"Bearer 123"
        },
        data:{
            "username" : "shubh"
        }
    });
    console.log(res.data);
}


main()