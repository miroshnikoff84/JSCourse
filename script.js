'use strict'; 


let btnCalc = document.getElementById('start'),     //кнопка рассчитать
    checkbox = document.querySelector('#deposit-check'),      //чекбокс    
    btnAddIncom = document.getElementsByTagName('button')[0],       
    btnAddExpenses = document.getElementsByTagName('button')[1],
    budgetMonthValue = document.getElementsByClassName('budget_month-value')[0],
    budgetDayValue = document.getElementsByClassName('budget_day-value')[0],
    additIncomeItem = document.querySelectorAll('.additional_income-item')[0],
    targetMonthValue = document.getElementsByClassName('target_month-value')[0],
    incomPeriodValue = document.getElementsByClassName('income_period-value')[0],
    expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0],
    additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0],
    additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0],
    expensesItems = document.querySelectorAll('.expenses-items'),
    incomeTitle = document.querySelector('.income-title'),
    targetMount = document.querySelector('.target-amount'),
    periodSelect = document.querySelector('.period-select'),
    salaryAmount = document.querySelector('.salary-amount'),
    incomeAmount = document.querySelector('.income-amount'),
    expensesTitle = document.querySelector('.expenses-title'),
    additionalExpensesItem = document.querySelector('.additional_expenses-item');

let isNumber = function (n) { 
return !isNaN(parseFloat(n)) && isFinite(n) 
}; 

let money; 
      

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
    start: function () { 

      if(salaryAmount.value === '') {
        alert('Ошибка! Поле "Месячный доход" должно быть заполнено!');
        return;
      }
     
      
      appData.budget = salaryAmount.value;
      appData.getExpenses();
      appData.getExpensesMonth();
      appData.getBudget();
      appData.getAddExpenses();
      appData.showResult();
  
    },
    showResult: function(){
      budgetMonthValue.value = appData.budgetMonth;
      budgetDayValue.value = appData.budgetDay;
      expensesMonthValue.value = appData.expensesMonth;
      additionalExpensesValue.value = appData.addExpenses.join(', ');
      additionalIncomeValue.value = appData.addIncome.join(', ');
    },
    addExpensesBlock: function(){
      
      let cloneExpensesItems = expensesItems[0].cloneNode(true);
      expensesItems[0].parentNode.insertBefore(cloneExpensesItems, btnAddExpenses);
      expensesItems = document.querySelectorAll('.expenses-items');
      if(expensesItems.length === 3){
        btnAddExpenses.style.display = 'none';
      }
    },
    getExpenses: function(){
      expensesItems.forEach(function(item){
        let itemExpenses = item.querySelector('.expenses-title').value;
        let cashExpenses = item.querySelector('.expenses-amount').value;
        if(itemExpenses !== '' && cashExpenses !== ''){
          appData.expenses[itemExpenses] = cashExpenses;
        }
      })
    },
    getAddExpenses: function(){
      let addExpenses = additionalExpensesItem.value.split(',');
      addExpenses.forEach(function(item){
        item = item.trim();
        if (item !== ''){
          appData.addExpenses.push(item);
        }
      })
    },
    getAddIncom: function(){
      additionalIncomeItem.forEach(function(item){
        let itemValue = item.value.trim();
        if (itemValue !== ''){
          appData.addIncome.push(itemValue);
        }
      });
    },
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

btnCalc.addEventListener('click', appData.start);

btnAddExpenses.addEventListener('click', appData.addExpensesBlock);

    

//     for (let key in appData) {
//       console.log(key + appData[key]);
      
// };

