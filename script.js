'use strict';

let money = +prompt('Ваш ежемесячный доход?'),                                                             //Доход за месяц
    income = 'freelance',                                                                                  //Дополнительный доход
    addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую'),          //Дополнительные расходы
    deposit = confirm('Есть ли у вас депозит в банке?'),                                                                                               //Наличие депозита
    mission =+prompt('Ваша цель заработать');


let showTypeOf = function(data) {
console.log(data, typeof(data));
};
showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

console.log(income.length);

let expenses1 = prompt('Введите обязательную статью расходов'),
    amount1 = +prompt('Во сколько это обойдется?'),
    expenses2 = prompt('Введите обязательную статью расходов'),
    amount2 = +prompt('Во сколько это обойдется?');

console.log('Ежемесячный доход: ' + money + ' рублей');
console.log(addExpenses.split(','));

let expensesMonth = 0;
let getExpensesMonth = function(a, b) {
  expensesMonth = a + b; 
}
getExpensesMonth(amount1, amount2);
 
console.log("Расход за месяц: " + expensesMonth);

let accumulatedMonth = 0; 
let getAccumulatedMonth = function(a, b) {
  accumulatedMonth = a - b;
}

getAccumulatedMonth(money,accumulatedMonth);

console.log(accumulatedMonth);

let budgetDay = Math.ceil(accumulatedMonth / 30);
console.log('Ваш бюджет на день ' + budgetDay + ' рублей');

function getTargetMonth(a, b) { 
  return Math.ceil(a / b); 
}
console.log('Цель будет достигнута через ' + getTargetMonth(mission, accumulatedMonth) + 'мес.');


let getStatusIncome = function() {
  if (budgetDay >= 1200) {
  return('У вас высокий уровень дохода'); 
  }

  if (1200 > budgetDay >= 600) {
  return('У вас средний уровень дохода');
  }

  if (budgetDay < 600) {
  return ('К сожалению у вас уровень дохода ниже среднего');
  }

  if (budgetDay < 0) {
  return('Что то пошло не так');
  }
};

console.log(getStatusIncome());