var money = 90000;
var income = 'freelance';
let addExpenses = 'Internet, Taxi, Costs';
var deposit = true;
var mission = '5000000';
var period = '11';

console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);
console.log(addExpenses.length);
console.log('Период равен ' + period + ' месяцев');
console.log('Цель заработать ' + mission + ' долларов');
console.log(addExpenses.toLowerCase());
console.log(addExpenses.split(', '));

var budgetDay = money / 30;
console.log(budgetDay); 
