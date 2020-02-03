'use strict';

let isNumber = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n)
};


let money,                                                                                                 //Доход за месяц
    income = 'freelance',                                                                                  //Дополнительный доход
    addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую'),          //Дополнительные расходы
    deposit = confirm('Есть ли у вас депозит в банке?'),                                                   //Наличие депозита
    mission = +prompt('Ваша цель заработать');
  
let start = function () {
  do {
    money = prompt('Ваш ежемесячный доход?'); 
  }
  while (!isNumber(money)) 
};
    
start();

let showTypeOf = function(item) {
console.log(typeof(item));
};
showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

let expenses = [];

console.log(addExpenses.toLowerCase().split(','));

console.log(income.length);

// let expenses1 = prompt('Введите обязательную статью расходов'),
//     amount1 = +prompt('Во сколько это обойдется?'),
//     expenses2 = prompt('Введите обязательную статью расходов'),
//     amount2 = +prompt('Во сколько это обойдется?');

console.log('Ежемесячный доход: ' + money + ' рублей');

let getExpensesMonth = function () {
    let sum = 0;

    for (let i = 0; i < 2; i++) {

      expenses[i] = prompt('Введите обязательную статью расходов');

      do {
        sum = prompt('Во сколько это обойдется?');
      }
      while (!isNumber(sum))
    }
    console.log(expenses);
    return sum;
};

let expensesAmount = getExpensesMonth();

console.log("Расход за месяц: " + expensesAmount);

let getAccumulatedMonth = function () {
  return money - expensesAmount;
}; 
let accumulatedMonth = getAccumulatedMonth();

let budgetDay = Math.ceil(accumulatedMonth / 30);
console.log('Ваш бюджет на день ' + budgetDay + ' рублей');

let getTargetMonth = function () {
  return Math.ceil(mission / accumulatedMonth);
};

let targetMonth = getTargetMonth();

if (targetMonth > 0) {
  console.log('Цель будет достигнута через ' + targetMonth + ' мес.');  
}
else {
  console.log('Цель не будет достигнута');
}

let getStatusIncome = function () {
  if (budgetDay > 1200) {
  return('У вас высокий уровень дохода'); 
  }

  if (budgetDay > 600 && budgetDay < 1199) {
  return('У вас средний уровень дохода');
  }

  if (budgetDay < 599 && budgetDay > 0) {
  return ('К сожалению у вас уровень дохода ниже среднего');
  }

  if (0 > budgetDay) {
  return('Что то пошло не так');
  }
};


console.log(getStatusIncome());