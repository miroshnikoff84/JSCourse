'use strict';


let start = document.getElementById('start'),
    btnCancel = document.getElementById('cancel'),
    checkbox = document.querySelector('#deposit-check'),
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
    additionalExpensesItem = document.querySelector('.additional_expenses-item'),
    resultTotal = document.querySelectorAll('.result'),
    allInputs = document.querySelectorAll('input');

let isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

start.disabled = true;

const AppData = function() {

    this.budget = 0;
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.income = {};
    this.incomeMonth = 0;
    this.addIncome = [];
    this.expenses = {};
    this.expensesMonth = 0;
    this.deposit = false;
    this.percentDeposit = 0;
    this.moneyDeposit = 0;
    this.addExpenses = [];
    

};
AppData.prototype.eventListeners = function() {
    start.addEventListener('click', appData.start.bind(appData));
    btnAddExpenses.addEventListener('click', appData.addExpensesBlock);
    btnAddIncome.addEventListener('click', appData.addIncomeBlock);
    salaryAmount.addEventListener('input', appData.blockStart);
    btnCancel.addEventListener('click', appData.reset.bind(appData));
    periodSelect.addEventListener('input', function() {
        periodAmount.innerHTML = periodSelect.value;
    }, false);
};
AppData.prototype.blockStart = function () {
    if (salaryAmount.value === '' || !isNumber(salaryAmount.value)) {
        start.disabled = true;
        salaryAmount.placeholder = "Введите число";
    } else {
        start.disabled = false;
    }
};
AppData.prototype.start = function() {
    start.style.display = 'none';
    btnCancel.style.display = 'block';
    this.budget = +salaryAmount.value;
    this.eventListeners();
    this.getExpenses();
    this.getIncome();
    this.getExpensesMonth();
    this.getAddExpenses();
    this.getBudget();
    this.calcPeriod();
    this.showResult();
    this.blockInput();

};
AppData.prototype.showResult = function() {
    const _this = this;
    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = this.budgetDay;
    expensesMonthValue.value = this.expensesMonth;
    additionalExpensesValue.value = this.addExpenses.join(', ');
    additionalIncomeValue.value = this.addIncome.join(', ');
    targetMonthValue.value = Math.ceil(this.getTargetMonth());
    incomPeriodValue.value = this.calcPeriod();
    periodSelect.addEventListener('input', function() {
        incomPeriodValue.value = _this.calcPeriod();
    });
};
AppData.prototype.addExpensesBlock = function() {

    let cloneExpensesItem = expensesItems[0].cloneNode(true);
    cloneExpensesItem.children[0].value = '';
    cloneExpensesItem.children[1].value = '';

    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, btnAddExpenses);
    expensesItems = document.querySelectorAll('.expenses-items');
    if (expensesItems.length === 3) {
        btnAddExpenses.style.display = 'none';
    }
    btnCancel.addEventListener('click', () => {
        cloneExpensesItem.children[0].value = '';
        cloneExpensesItem.children[1].value = '';
        cloneExpensesItem.remove();
        btnAddExpenses.style.display = 'block';
        btnAddExpenses.disabled = false;
    });
};
AppData.prototype.addIncomeBlock = function() {

    let cloneIncomeItem = incomeItems[0].cloneNode(true);
    cloneIncomeItem.children[0].value = '';
    cloneIncomeItem.children[1].value = '';
    incomeItems[0].parentNode.insertBefore(cloneIncomeItem, btnAddIncome);
    incomeItems = document.querySelectorAll('.income-items');

    if (incomeItems.length === 3) {
        btnAddIncome.style.display = 'none';
    }
    btnCancel.addEventListener('click', () => {
        cloneIncomeItem.children[0].value = '';
        cloneIncomeItem.children[1].value = '';
        cloneIncomeItem.remove();
        btnAddIncome.style.display = 'block';
        btnAddIncome.disabled = false;
    });
};
AppData.prototype.getExpenses = function() {
    const _this = this;
    expensesItems.forEach(function(item) {
        let itemExpenses = item.querySelector('.expenses-title').value;
        let cashExpenses = item.querySelector('.expenses-amount').value;
        if (itemExpenses !== '' && cashExpenses !== '') {
            _this.expenses[itemExpenses] = cashExpenses;
        }
    });
};
AppData.prototype.getIncome = function() {
    const _this = this;
    incomeItems.forEach(function(item) {
        let itemIncome = item.querySelector('.income-title').value;
        let cashIncome = item.querySelector('.income-amount').value;
        if (itemIncome !== '' && cashIncome !== '') {
            this.income[itemIncome] = cashIncome;
        }
    }, this);

    for (let key in this.income) {
        this.incomeMonth += +this.income[key];
    }
};
AppData.prototype.getAddExpenses = function() {
    let addExpenses = additionalExpensesItem.value.split(',');
    const _this = this;
    addExpenses.forEach(function(item) {
        item = item.trim();
        if (item !== '') {
            _this.addExpenses.push(item);
        }
    });
};
AppData.prototype.getAddIncom = function() {
    const _this = this;
    additionalIncomeItem.forEach(function(item) {
        let itemValue = item.value.trim();
        if (itemValue !== '') {
            this.addIncome.push(itemValue);
        }
    }, this);
};
AppData.prototype.getExpensesMonth = function() {
    for (let key in this.expenses) {
        this.expensesMonth += +this.expenses[key];
    }
};
AppData.prototype.getBudget = function() {
    console.log(this.budget);
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
    this.budgetDay = Math.ceil(this.budgetMonth / 30);
};
AppData.prototype.getTargetMonth = function() {
    return targetAmount.value / this.budgetMonth;
};
AppData.prototype.getStatusIncome = function() {
    if (this.budgetDay > 1200) {
        console.log('У вас высокий уровень дохода');
    }

    if (this.budgetDay > 600 && this.budgetDay < 1199) {
        console.log('У вас средний уровень дохода');
    }

    if (this.budgetDay < 599 && this.budgetDay > 0) {
        console.log('К сожалению у вас уровень дохода ниже среднего');
    }

    if (0 > this.budgetDay) {
        console.log('Что то пошло не так');
    }
};
AppData.prototype.calcPeriod = function() {
    return this.budgetMonth * periodSelect.value;
};

AppData.prototype.getPeriod = function() {
    return (periodAmount.textContent = periodSelect.value);
};

AppData.prototype.blockInput = function() {
    let inputTypeText = document.querySelectorAll('[type="text"]');
    inputTypeText.forEach(function(item) {
        item.disabled = true;
    });
    let btnPlus = document.querySelectorAll('.btn_plus');
    btnPlus.forEach(function(item) {
        item.disabled = true;
    });
    return (resultTotal.disabled = false);
};
AppData.prototype.reset = function() {
    if (isNumber(salaryAmount.value) && salaryAmount.value > 0) {
        start.removeAttribute('disabled');
    }

    if (!isNumber(salaryAmount.value)) {
        start.setAttribute('disabled', true);
        salaryAmount.placeholder = "Введите число";
    }
    start.style.display = 'block';
    start.disabled = true;
    btnCancel.style.display = 'none';
    periodSelect.value = "1";
    periodAmount.textContent = "1";
    this.budget = 0;
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.expensesMonth = 0;
    this.income = {};
    this.incomeMonth = 0;
    this.addIncome = [];
    this.expenses = {};
    this.addExpenses = [];
    this.deposit = 0;
    this.percentDeposit = 0;
    this.moneyDeposit = 0;


    let elem = document.querySelector('.data').querySelectorAll('input[type=text]');
    elem.forEach(item => {
        item.disabled = false;
    });

    let inputs = document.querySelectorAll('input[type = text]');

    inputs.forEach(item => {
        item.value = '';
    });
};




const appData = new AppData();
appData.eventListeners();
console.log(appData);