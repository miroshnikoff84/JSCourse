'use strict';
// alert();
// console.log();

let money;                                 //Доход за месяц
let income = 50000;                        //Дополнительный доход
let addExpenses;                           //Дополнительные расходы
let deposit;                               //Наличие депозита
 

console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);

money = +prompt('Ваш ежемесячный доход?');
console.log('Ежемесячный доход: ' + money + ' рублей');
addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
console.log(addExpenses.split(','));
deposit = confirm('Есть ли у вас депозит в банке?');
let expenses1 = prompt('Введите обязательную статью расходов');
let amount1 = +prompt('Во сколько это обойдется?');
let expenses2 = prompt('Введите обязательную статью расходов');
let amount2 = +prompt('Во сколько это обойдется?');
let mission =+prompt('Ваша цель заработать');

function getExpensesMonth(a, b) {
  return a + b; 
}
console.log("Расход за месяц: " + getExpensesMonth(amount1, amount2));

 
function getAccumulatedMonth(a, b, c) {
  return a - (b + c);
}
let accumulatedMonth = getAccumulatedMonth(money, amount1, amount2);
console.log(accumulatedMonth);

let budgetDay = Math.ceil(accumulatedMonth / 30);
console.log('Ваш бюджет на день ' + budgetDay + ' рублей');

function getTargetMonth(a, b) { 
  return Math.ceil(a / b); 
}
console.log('Цель будет достигнута через ' + getTargetMonth(mission, accumulatedMonth) + 'мес.');

function getStatusIncome() {
  console.log('Дополнительный доход ' + income);
}

if (budgetDay >= 1200) {
  alert('У вас высокий уровень дохода'); 
}

if (1200 > budgetDay >= 600) {
  alert('У вас средний уровень дохода');
}

if (budgetDay < 600) {
  alert('К сожалению у вас уровень дохода ниже среднего');
}

if (budgetDay < 0) {
  alert('Что то пошло не так');
}

getStatusIncome();
