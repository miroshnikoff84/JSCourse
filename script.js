'use strict'; 

let isNumber = function (n) { 
return !isNaN(parseFloat(n)) && isFinite(n) 
}; 

let money, 
    start = function () { 
    do { 
    money = prompt('Ваш ежемесячный доход?',50000); 
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
    percentDeposit: 0,
    moneyDeposit: 0,
    itemIncome:0,
    cashIncome:0,
    title:0,
    asking: function () { 
      if (confirm('Есть ли у вас дополнительный источник заработка?')) {
        do {
          appData.itemIncome = prompt('Какой у вас дополнительный зароботок?', 'такси');
        } while (isNumber(appData.itemIncome) || appData.itemIncome === '' || appData.itemIncome === null);

        do {
          appData.cashIncome = prompt('Сколько в месяц вы на этом зарабатываете?', 20000);
        } while (!isNumber(appData.cashIncome));

        appData.income[appData.itemIncome] = appData.cashIncome;
    }

       let addExpenses = prompt('Перечислите возможные расходы', 'мммиDFии,fhfhRFhhh,kjhkDFhl'); 
      addExpenses = addExpenses.split(',');
      appData.addExpenses = addExpenses.map(item => item.trim().charAt(0).toUpperCase() + item.trim().slice(1).toLowerCase()).join(', ') 
      
    appData.deposit = confirm('Есть ли у вас депозит в банке?') 
    for (let i = 0; i < 2; i++) {
      do {
        appData.title = prompt('Введите обязательную статью расходов');
      }while(isNumber(appData.title) || appData.title === '' || appData.title === null);
      appData.expenses[appData.title] = prompt('Восколько это обойдется?');
      
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
  },
  getInfoDeposit: function () {
    if (appData.deposit) {
      do {
        appData.percentDeposit = prompt('Какой годовой процент?');
      } while (!isNumber(appData.percentDeposit));
      do {
        appData.moneyDeposit = prompt('Какая сумма заложена?');
      }while(!isNumber(appData.moneyDeposit));
    }
  },
  calcSavedMoney: function () {
    return appData.budgetMonth * appData.period;
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
appData.getInfoDeposit();
console.log(appData.percentDeposit, appData.moneyDeposit, appData.calcSavedMoney());

console.log(appData.addExpenses);

let btnCalc = document.getElementById('start');
let btnAddIncom = document.getElementsByTagName('button')[0];
let btnAddExpenses = document.getElementsByTagName('button')[1];
let checkbox = document.querySelector('#deposit-check');
let additIncomeItem = document.querySelectorAll('.additional_income-item')[0];
let budgetDayValue = document.getElementsByClassName('budget_day-value')[0];
let expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0];
let additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0];
let additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0];
let incomPeriodValue = document.getElementsByClassName('income_period-value')[0];
let targetMonthValue = document.getElementsByClassName('target_month-value')[0];

