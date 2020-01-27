var num = 266219;
var arr = [];
var arr2 = [];
for (var temp = num;
         Math.round(temp) != 0;
         temp /= 10, temp = Math.floor(temp)){

         arr.unshift(temp%10);
}

var total = arr.reduceRight(function(a, b) {
  return a * b;
});

console.log(total);
var pow = total ** 3; 

console.log(pow);

for (var temp = pow;
         Math.round(temp) != 0;
         temp /= 10, temp = Math.floor(temp)){

         arr2.unshift(temp%10);
}
console.log(arr2);
for (let i = 0; i < 2; i++){
  
  console.log(arr2[i]);
}