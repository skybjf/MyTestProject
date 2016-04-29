var arr= new Array("Audi","Car","Java","Node","11",11,"66");
console.info("forEach");
arr.forEach(function(value,index,array){
  console.log(value+"----"+index+"----"+array);
});

console.info("Key in");
for(var key in arr){
  console.log(key);
}

console.info("pop()的使用");
arr.pop();
console.log(arr);

console.info("push()的使用");
arr.push("添加push()");
console.log(arr);

console.info("reverse()的使用");
arr.reverse();
console.log(arr);

console.info("shift()的使用");
arr.shift();
console.log(arr);

//排序的时候，字符串为按Unicode码位点（code point）排序
console.info("sort()的使用");
arr.sort();
console.log(arr);

console.info("splice()的使用");
arr.splice(5);
console.log(arr);
arr.splice(2,2);
console.log(arr);
arr.splice(0,1,"append1","append2");
console.log(arr);
arr.splice(2,"append3","append4");
console.log(arr);
