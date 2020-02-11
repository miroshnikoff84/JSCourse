'use strict'; 


let start = document.getElementById('start'),
    btnCancel = document.getElementById('cancel'),                                                  //кнопка рассчитать
    checkbox = document.querySelector('#deposit-check'),                                        //чекбокс    
    btnAddIncome = document.getElementsByTagName('button')[0],                                  //кнопка добавить поле доп.расходы      
    btnAddExpenses = document.getElementsByTagName('button')[1],                                //кнопка добавить поле обяз.расходы 
    budgetMonthValue = document.getElementsByClassName('budget_month-value')[0],                //поле вывода дохода за месяц
    budgetDayValue = document.getElementsByClassName('budget_day-value')[0],                    //поле вывода бюджет за месяц
    additionalIncomeItem = document.querySelectorAll('.additional_income-item')[0],             //поля ввода возможного дохода
    targetMonthValue = document.getElementsByClassName('target_month-value')[0],                //поле вывода срока достижения цели в месяцах
    incomPeriodValue = document.getElementsByClassName('income_period-value')[0],               //поле вывода накопления за период
    expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0],            //поле вывода расхода за месяц
    additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0],      //поле вывода возможные доходы
    additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0],
    expensesItems = document.querySelectorAll('.expenses-items'),
    incomeTitle = document.querySelector('.income-title'),
    targetAmount = document.querySelector('.target-amount'),
    periodSelect = document.querySelector('input[type="range"]'),
    periodAmount = document.querySelector('.period-amount'),
    salaryAmount = document.querySelector('.salary-amount'),
    incomeItems = document.querySelectorAll('.income-items'),
    expensesTitle = document.querySelector('.expenses-title'),
    additionalExpensesItem = document.querySelector('.additional_expenses-item'),
    resultTotal = document.querySelectorAll('.result');

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
  itemIncome: 0,
  cashIncome: 0,
  title: 0,
  start: function () {
    this.blockStart();

    start.style.display = 'none';
    btnCancel.style.display = 'block';
    btnCancel.addEventListener('click', this.reset)

    
    this.budget = +salaryAmount.value;
    this.getExpenses();
    this.getIncome();
    this.getExpensesMonth();
    this.getAddExpenses();
    this.getBudget();
    this.calcPeriod();

    this.showResult();
    this.blockInput();
  
  },
  blockStart: function () {
    if (salaryAmount.value.trim() === '') {
      start.disabled = true;
    } else {
      start.disabled = false;
    }
    salaryAmount.addEventListener('input', appData.blockStart);
        
    },
  showResult: function () {
    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = this.budgetDay;
    expensesMonthValue.value = this.expensesMonth;
    additionalExpensesValue.value = this.addExpenses.join(', ');
    additionalIncomeValue.value = this.addIncome.join(', ');
    targetMonthValue.value = Math.ceil(this.getTargetMonth());
    incomPeriodValue.value = this.calcPeriod();
        
    periodSelect.addEventListener('change', function () {
      incomPeriodValue.value = appData.calcPeriod();
    })
      
      
  },
  addExpensesBlock: function () {
      
    let cloneExpensesItems = expensesItems[0].cloneNode(true);
    expensesItems[0].parentNode.insertBefore(cloneExpensesItems, btnAddExpenses);
    expensesItems = document.querySelectorAll('.expenses-items');
    if (expensesItems.length === 3) {
      btnAddExpenses.style.display = 'none';
    }
  },
  addIncomeBlock: function () {
      
    let cloneIncomeItems = incomeItems[0].cloneNode(true);
    incomeItems[0].parentNode.insertBefore(cloneIncomeItems, btnAddIncome);
    incomeItems = document.querySelectorAll('.income-items');
    if (incomeItems.length === 3) {
      btnAddIncome.style.display = 'none';
    }
  },
    
  getExpenses: function () {
    expensesItems.forEach(function (item) {
      let itemExpenses = item.querySelector('.expenses-title').value;
      let cashExpenses = item.querySelector('.expenses-amount').value;
      if (itemExpenses !== '' && cashExpenses !== '') {
        this.expenses[itemExpenses] = cashExpenses;
      }
    }, this);
  },
  getIncome: function () {
    incomeItems.forEach(function (item) {
      let itemIncome = item.querySelector('.income-title').value;
      let cashIncome = item.querySelector('.income-amount').value;
      appData.income[itemIncome] = cashIncome;
        
    }, this);

    for (let key in this.income) {
      this.incomeMonth += +this.income[key]
    }
  },
  getAddExpenses: function () {
    let addExpenses = additionalExpensesItem.value.split(',');
    addExpenses.forEach(function (item) {
      item = item.trim();
      if (item !== '') {
        appData.addExpenses.push(item);
      }
    })
  },
  getAddIncom: function () {
    additionalIncomeItem.forEach(function (item) {
      let itemValue = item.value.trim();
      if (itemValue !== '') {
        this.addIncome.push(itemValue);
      }
    }, this)
  },
  getExpensesMonth: function () {
    for (let key in this.expenses) {
      this.expensesMonth += +this.expenses[key];
    }
  },
  getBudget: function () {
    console.log(this.budget);
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
    this.budgetDay = Math.ceil(this.budgetMonth / 30);
  },
  getTargetMonth: function () {
    return targetAmount.value / this.budgetMonth;
  },
  getStatusIncome: function () {
    if (this.budgetDay > 1200) {
      console.log('У вас высокий уровень дохода')
    }

    if (this.budgetDay > 600 && this.budgetDay < 1199) {
      console.log('У вас средний уровень дохода')
    }

    if (this.budgetDay < 599 && this.budgetDay > 0) {
      console.log('К сожалению у вас уровень дохода ниже среднего')
    }

    if (0 > this.budgetDay) {
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
      } while (!isNumber(appData.moneyDeposit));
    }
  },
  calcPeriod: function () {
    return this.budgetMonth * periodSelect.value;
  },

  getPeriod: function () {
    return periodAmount.textContent = periodSelect.value;
  },

  blockInput: function () {
    let inputTypeText = document.querySelectorAll('[type="text"]');
    inputTypeText.forEach(function (item) {
      item.disabled = true;
    });
    let btnPlus = document.querySelectorAll('.btn_plus');
    btnPlus.forEach(function (item) {
      item.disabled = true;
    });
    return resultTotal.disabled = false;
  },
  reset: function () {
    start.style.display = 'block';
    btnCancel.style.display = 'none';
    periodSelect.value = "1";
    periodAmount.textContent = "1";
    appData.budget = 0;     
    appData.budgetDay=0;   
    appData.budgetMonth = 0;
    appData.expensesMonth = 0;  
    appData.income = {};  
    appData.incomeMonth = 0;
    appData.addIncome = [];  
    appData.expenses = {};    
    appData.addExpenses = [];  
    appData.deposit = 0;
    appData.percentDeposit = 0;
    appData.moneyDeposit = 0;

    let elem = document.querySelector('.data').querySelectorAll('input[type=text]');
    elem.forEach (item => {
      item.disabled = false;
    })

    let inputs = document.querySelectorAll('input[type = text]');

    inputs.forEach(item => {
      item.value = '';
    })

  }
};

periodSelect.addEventListener('change', function () {
  periodAmount.innerHTML = periodSelect.value;
}, false)



btnCancel.addEventListener('click', appData.reset.bind(appData));
start.addEventListener('click', appData.start.bind(appData));
btnAddExpenses.addEventListener('click', appData.addExpensesBlock);
btnAddIncome.addEventListener('click', appData.addIncomeBlock);
