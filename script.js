'use strict'; 

let isNumber = function (n) { 
return !isNaN(parseFloat(n)) && isFinite(n) 
}; 

let money, 
    start = function () { 
    do { 
    money = prompt('Ваш ежемесячный доход?'); 
    } 
    while (!isNumber(money) || money === '' || money === null) 
    console.log('Ежемесячный доход: ' + money + ' рублей') 

}; 


start(); 

let appData = { 
income: {}, 
addIncome: [], 
expenses: {}, 
addExpenses: [], 
deposit: false, 
mission: 50000, 
period: 3, 
budget: money, 
budgetDay: 0, 
budgetMonth: 0, 
expensesMonth: 0, 
asking: function(){ 
appData.addExpenses = prompt('Перечислите возможные расходы') 
appData.addExpenses.toLowerCase().split(',') 
appData.deposit = confirm('Есть ли у вас депозит в банке?') 
for (let i = 0; i < 2; i++) {
  let title = prompt('Введите обязательную статью расходов');
  appData.expenses[title] = prompt('Восколько это обойдется?');
  
}
}, 
  getExpensesMonth: function () { 
  for (let key in appData.expenses) {
    appData.expensesMonth += +appData.expenses[key];
    }
  

}, 
  getBudget: function () { 
  console.log(appData.budget);
  appData.budgetMonth = appData.budget - appData.expensesMonth;
  appData.budgetDay = Math.ceil(appData.budgetMonth / 30);
}, 
getTargetMonth: function () { 
appData.period = Math.ceil(appData.mission / appData.budgetMonth) 
}, 
getStatusIncome: function () { 
if (appData.budgetDay > 1200) { 
console.log('У вас высокий уровень дохода') 
} 

if (appData.budgetDay > 600 && appData.budgetDay < 1199) { 
console.log('У вас средний уровень дохода') 
} 

if (appData.budgetDay < 599 && appData.budgetDay > 0) { 
console.log ('К сожалению у вас уровень дохода ниже среднего') 
} 

if (0 > appData.budgetDay) { 
console.log('Что то пошло не так') 
} 
} 


}; 
appData.asking(); 
appData.getExpensesMonth();
appData.getBudget();
appData.getTargetMonth();
appData.getStatusIncome();

for (let key in appData) {
  console.log(key + appData[key]);
  
}
