// classes in javaScript! 
class rectangle{
    constructor(w,h,c){
        this.w = w;
        this.h = h;
        this.c = c;
    }
    area(){
        const area = this.w * this.h;
        return area;
    }
    paint(){
        console.log(`painting with color with "${this.c}"`);
        
    }
}

// const r1 = new rectangle(3,4,"red");
// const r2 = new rectangle(3,10,"pink");
// const ans = r1.area();
// const ans1 = r2.area();
// console.log(ans);
// console.log(ans1);
// r1.paint();
// r2.paint();

//inbuilt classes in JavaScript
const d = new Date();
console.log(d.toISOString());

const map = new Map();
map.set('name',"shubh ujala");
map.set("age",20);
const fName = map.get('name');
console.log(fName);

