'use strict'

let isNumber = function (n) { 
return !isNaN(parseFloat(n)) && isFinite(n) 
};

let expenses;
do {
 expenses = prompt('Введите строку!');
}
while (isNumber(expenses));
console.log(typeof expenses);