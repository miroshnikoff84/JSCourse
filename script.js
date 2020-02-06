'use strict'; 


let btnCalc = document.getElementById('start'),     //кнопка рассчитать
    checkbox = document.querySelector('#deposit-check'),      //чекбокс    
    btnAddIncome = document.getElementsByTagName('button')[0],       
    btnAddExpenses = document.getElementsByTagName('button')[1],
    budgetMonthValue = document.getElementsByClassName('budget_month-value')[0],
    budgetDayValue = document.getElementsByClassName('budget_day-value')[0],
    additionalIncomeItem = document.querySelectorAll('.additional_income-item')[0],
    targetMonthValue = document.getElementsByClassName('target_month-value')[0],
    incomPeriodValue = document.getElementsByClassName('income_period-value')[0],
    expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0],
    additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0],
    additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0],
    expensesItems = document.querySelectorAll('.expenses-items'),
    incomeTitle = document.querySelector('.income-title'),
    targetAmount = document.querySelector('.target-amount'),
    periodSelect = document.querySelector('input[type="range"]'),
    periodAmount = document.querySelector('.period-amount'),
    salaryAmount = document.querySelector('.salary-amount'),
    incomeItems = document.querySelectorAll('.income-items'),
    expensesTitle = document.querySelector('.expenses-title'),
    additionalExpensesItem = document.querySelector('.additional_expenses-item');

let isNumber = function (n) { 
return !isNaN(parseFloat(n)) && isFinite(n) 
}; 

let money; 
      

let appData = { 
    income: {},
    incomeMonth: 0,
    addIncome: [], 
    expenses: {}, 
    addExpenses: [], 
    deposit: false, 
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
    if (salaryAmount.value === '') {
        btnCalc.removeEventListener('click', start);
      } else {
        btnCalc.addEventListener('click', appData.start);
    };
      appData.budget = +salaryAmount.value;
      appData.getExpenses();
      appData.getIncome();
      appData.getExpensesMonth();
      appData.getAddExpenses();
      appData.getBudget();
      appData.calcPeriod();

      appData.showResult();
  
    },
      showResult: function(){
      budgetMonthValue.value = appData.budgetMonth;
      budgetDayValue.value = appData.budgetDay;
      expensesMonthValue.value = appData.expensesMonth;
      additionalExpensesValue.value = appData.addExpenses.join(', ');
      additionalIncomeValue.value = appData.addIncome.join(', ');
      targetMonthValue.value = Math.ceil(appData.getTargetMonth());
      
      periodSelect.addEventListener('change', function () {
        incomPeriodValue.value = appData.calcPeriod();
      })
    },
    addExpensesBlock: function(){
      
      let cloneExpensesItems = expensesItems[0].cloneNode(true);
      expensesItems[0].parentNode.insertBefore(cloneExpensesItems, btnAddExpenses);
      expensesItems = document.querySelectorAll('.expenses-items');
      if(expensesItems.length === 3){
        btnAddExpenses.style.display = 'none';
      }
    },
    addIncomeBlock: function(){
      
      let cloneIncomeItems = incomeItems[0].cloneNode(true);
      incomeItems[0].parentNode.insertBefore(cloneIncomeItems, btnAddIncome);
      incomeItems = document.querySelectorAll('.income-items');
      if(incomeItems.length === 3){
        btnAddIncome.style.display = 'none';
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
    getIncome: function () {
      incomeItems.forEach(function (item){
        let itemIncome = item.querySelector('.income-title').value;
        let cashIncome = item.querySelector('.income-amount').value;
        appData.income[itemIncome] = cashIncome;
        for (let key in appData.income) {
            appData.incomeMonth += +appData.income[key]
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
    getExpensesMonth: function () { 
    for (let key in appData.expenses) {
      appData.expensesMonth += +appData.expenses[key];
      }
    }, 
    getBudget: function () { 
    console.log(appData.budget);
    appData.budgetMonth = appData.budget + appData.incomeMonth - appData.expensesMonth;
    appData.budgetDay = Math.ceil(appData.budgetMonth / 30);
    }, 
    getTargetMonth: function () { 
    appData.period = Math.ceil(targetAmount.value / appData.budgetMonth) 
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
    appData.deposit = confirm('Есть ли у вас депозит в банке?');
    if (appData.deposit) {
      do {
        appData.percentDeposit = prompt('Какой годовой процент?');
      } while (!isNumber(appData.percentDeposit));
      do {
        appData.moneyDeposit = prompt('Какая сумма заложена?');
      }while(!isNumber(appData.moneyDeposit));
    }
  },
  calcPeriod: function () {
    return appData.budgetMonth * periodSelect.value;
  }

};

periodSelect.addEventListener('change', function () {
  periodAmount.innerHTML = periodSelect.value;
}, false);

btnCalc.addEventListener('click', appData.start);
btnAddExpenses.addEventListener('click', appData.addExpensesBlock);
btnAddIncome.addEventListener('click', appData.addIncomeBlock);
