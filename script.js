'use strict';

let salaryAmount = document.querySelector('.salary-amount'),
    incomeTitle = document.querySelector('.income-title'),
    incomeItems = document.querySelectorAll('.income-items'),
    btnPlusIncome = document.getElementsByTagName('button')[0],
    addIncomeInputs = document.querySelectorAll('.additional_income-item'),
    additionalIncomeItems = document.querySelectorAll('.additional_income-item'),
    expensesTitle = document.querySelector('.expenses-title'),
    expensesItems = document.querySelectorAll('.expenses-items'),
    btnPlusExpenses = document.getElementsByTagName('button')[1],
    addExpensesItem = document.querySelector('.additional_expenses-item'),
    depositCheckbox = document.querySelector('#deposit-check'),
    targetAmount = document.querySelector('.target-amount'),
    periodSelect = document.querySelector('.period-select'),
    periodAmount = document.querySelector('.period-amount'),
    budgetDayVal = document.getElementsByClassName('budget_day-value')[0],
    budgetMonthVal = document.getElementsByClassName('budget_month-value')[0],
    expensesMonthVal = document.getElementsByClassName('expenses_month-value')[0],
    addIncomeVal = document.getElementsByClassName('additional_income-value')[0],
    addExpensesVal = document.getElementsByClassName('additional_expenses-value')[0],
    incomePeriodVal = document.getElementsByClassName('income_period-value')[0],
    targetMonthVal = document.getElementsByClassName('target_month-value')[0],
    startBtn = document.querySelectorAll('#start')[0],
    cancelBtn = document.querySelectorAll('#cancel')[0],
    allInputs = document.querySelectorAll('input[type="text"]'),
    allInputsSum = document.querySelectorAll('input[placeholder="Сумма"]'),
    allInputsNaming = document.querySelectorAll('input[placeholder="Наименование"]');

let isNumber = function (n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

const AppData = function () {
    this.budget = 0;
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.expenses = {};
    this.addExpenses = [];
    this.expensesMonth = 0;
    this.income = {};
    this.incomeMonth = 0;
    this.addIncome = [];
    this.deposit = false;
    this.percentDeposit = 0;
    this.moneyDeposit = 0;
};

const appData = new AppData();

AppData.prototype.start = function() {
    this.budget = +salaryAmount.value;
    
    this.checkInputs();
    this.getExpenses();
    this.getIncome();
    this.getExpensesMonth();
    this.getAddExpenses();
    this.getAddIncome();
    this.getBudget();
    this.showResult();
    allInputs = document.querySelectorAll('input[type="text"]');
    allInputs.forEach(function(item) {
        return item.setAttribute("readonly", true);
    });

    startBtn.parentNode.insertBefore(cancelBtn, startBtn);
    startBtn.style.display = 'none';
    cancelBtn.style.display = 'block';
};
AppData.prototype.showResult = function() {
    budgetDayVal.value = Math.ceil(this.budgetDay);
    budgetMonthVal.value = this.budgetMonth;
    expensesMonthVal.value = this.expensesMonth;
    addExpensesVal.value = this.addExpenses;
    addIncomeVal.value = this.addIncome.join(', ');
    targetMonthVal.value = Math.ceil(this.getTargetMonth());
    incomePeriodVal.value = this.calcPeriod();

    periodSelect.addEventListener('input', () => {
        incomePeriodVal.value = this.calcPeriod();
    });
};
AppData.prototype.addExpensesBlock = function() {
    let cloneExpensesItem = expensesItems[0].cloneNode(true);
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, btnPlusExpenses);
    expensesItems = document.querySelectorAll('.expenses-items');
    
    if(expensesItems.length === 3) {
        btnPlusExpenses.style.display = 'none';
    }

    cloneExpensesItem.firstElementChild.value = '';
    cloneExpensesItem.lastElementChild.value = '';

    allInputsNaming = document.querySelectorAll('input[placeholder="Наименование"]');
    allInputsSum = document.querySelectorAll('input[placeholder="Сумма"]');

    allInputsSum.forEach(function (item) {
        item.addEventListener('input', this.checkInputs.bind(appData));
    }, this);

    allInputsNaming.forEach(function (item) {
        item.addEventListener('input', this.checkInputs.bind(appData));
    }, this);

        cancelBtn.addEventListener('click', () => {
        cloneExpensesItem.firstElementChild.value = '';
        cloneExpensesItem.lastElementChild.value = '';
        cloneExpensesItem.remove();
        btnPlusExpenses.style.display = 'block';
        btnPlusExpenses.disabled = false;
    });
};
AppData.prototype.addIncomeBlock = function() {
    let cloneIncome = incomeItems[0].cloneNode(true);
    incomeItems[0].parentNode.insertBefore(cloneIncome, btnPlusIncome);
    incomeItems = document.querySelectorAll('.income-items');
    
    if(incomeItems.length === 3) {
        btnPlusIncome.style.display = 'none';
    }

    cloneIncome.firstElementChild.value = '';
    cloneIncome.lastElementChild.value = '';

    allInputsNaming = document.querySelectorAll('input[placeholder="Наименование"]');
    allInputsSum = document.querySelectorAll('input[placeholder="Сумма"]');

    allInputsSum.forEach(function (item) {
        item.addEventListener('input', this.checkInputs.bind(appData));
    }, this);

    allInputsNaming.forEach( function(item) {
        item.addEventListener('input', this.checkInputs.bind(appData));
    }, this);

        cancelBtn.addEventListener('click', () => {
        cloneIncome.firstElementChild.value = '';
        cloneIncome.lastElementChild.value = '';
        cloneIncome.remove();
        btnPlusIncome.style.display = 'block';
        btnPlusIncome.disabled = false;
    });
};
AppData.prototype.getExpenses = function() {
    expensesItems.forEach(function(item) {
        let itemExpenses = item.querySelector('.expenses-title').value;
        let cashExpenses = item.querySelector('.expenses-amount').value;

        if(itemExpenses !== '' && cashExpenses !== ''){
            this.expenses[itemExpenses] = cashExpenses;
        }
    }, this);
};
AppData.prototype.getIncome = function() {
    incomeItems.forEach(function(item) {
        let itemIncome = item.querySelector('.income-title').value;
        let cashIncome = item.querySelector('.income-amount').value;

        if(itemIncome !== '' && cashIncome !== '') {
            this.income[itemIncome] = cashIncome;
        }    
    }, this);
    for(let key in +this.income) {
        this.incomeMonth += +this.income[key];
    }
};
AppData.prototype.getAddExpenses = function() {
    let addExpenses = addExpensesItem.value.split(',');
    addExpenses = addExpenses.map(item => item.trim().charAt(0).toUpperCase() + item.trim().slice(1).toLowerCase()).join(', ');
    this.addExpenses = addExpenses.split(',');
};
AppData.prototype.getAddIncome = function() {
    additionalIncomeItems.forEach((item) => {
      let itemValue = item.value.split(',');
      itemValue = itemValue.map(item => item.trim().charAt(0).toUpperCase() + item.trim().slice(1).toLowerCase()).join(', ');
      itemValue = itemValue.split(',');
      if (itemValue !== '') {
        this.addIncome.push(itemValue);
      }
    });
};
AppData.prototype.changPeriod = function() {
    periodAmount.textContent = periodSelect.value;
};
AppData.prototype.getExpensesMonth = function() { 
    for (let key in this.expenses) {
        this.expensesMonth += +this.expenses[key];
    }
};
AppData.prototype.getBudget = function() { 
    this.budgetMonth = +this.budget + this.incomeMonth - this.expensesMonth,
    this.budgetDay = +this.budgetMonth / 30;
};
AppData.prototype.getTargetMonth = function() {
    return (targetAmount.value / this.budgetMonth);
};
AppData.prototype.resetAllInput = function() {
    allInputs = document.querySelectorAll('input[type="text"]');
    allInputs.forEach(function(item) {
        item.value = '';
        item.removeAttribute("readonly");
    });
    periodSelect.value = "1";
    this.changPeriod();

    cancelBtn.parentNode.insertBefore(startBtn, cancelBtn);
    cancelBtn.style.display = 'none';
    startBtn.disabled = true;
    startBtn.style.display = 'block';

    this.budget = 0;
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.expenses = {};
    this.addExpenses = [];
    this.expensesMonth = 0;
    this.income = {};
    this.incomeMonth = 0;
    this.addIncome = [];
    this.deposit = false;
    this.percentDeposit = 0;
    this.moneyDeposit = 0;
};
AppData.prototype.checkInputs = function() {
    let lettersDigits = /^[\u0410-\u044F+\s\.\,\-]*$/;
    let numsDigits = /^[\d]*$/;
    
    allInputsNaming.forEach(function(item) {
        let testResult = lettersDigits.test(item.value);
        if(!testResult) {
            item.value = '';
            item.placeholder = 'Только кирилица!';
        } else if (testResult){
            item.placeholder = 'Наименование';
        } else {
            item.placeholder = 'Наименование';
        }
    });
    
    allInputsSum.forEach(function(item) {
        let testResult = numsDigits.test(item.value);
        if(!testResult) {
            item.value = '';
            item.placeholder = 'Введите число!';
        } else if (testResult) {
            item.placeholder = 'Сумма';
        } else {
            item.placeholder = 'Сумма';
        }
    });
};
AppData.prototype.calcPeriod = function() {
    return this.budgetMonth * periodSelect.value;
};
AppData.prototype.eventListeners = function() {

    startBtn.disabled = true;
    salaryAmount.addEventListener('input', function() {
        startBtn.disabled = false;
    });

    startBtn.addEventListener('click', AppData.prototype.start.bind(appData));
    cancelBtn.addEventListener('click', AppData.prototype.resetAllInput.bind(appData));

    btnPlusExpenses.addEventListener('click', AppData.prototype.addExpensesBlock.bind(appData));
    btnPlusIncome.addEventListener('click', AppData.prototype.addIncomeBlock.bind(appData));
    periodSelect.addEventListener('input',  AppData.prototype.changPeriod.bind(appData));

    allInputsSum.forEach( (item) => {
        if(allInputsSum.length > 5) {
            item.addEventListener('input', AppData.prototype.checkInputs.bind(appData));
        } else {
            item.addEventListener('input', AppData.prototype.checkInputs.bind(appData));
        }
    });
    allInputsNaming.forEach((item) => {
        if(allInputsNaming.length > 4) {
            item.addEventListener('input', AppData.prototype.checkInputs.bind(appData));
        } else {
            item.addEventListener('input', AppData.prototype.checkInputs.bind(appData));
        }
    });
};

appData.eventListeners();

console.log(appData);
