'use strict';


let salaryAmount = document.querySelector('.salary-amount'),
    incomeTitle = document.querySelector('.income-title'),
    incomeItems = document.querySelectorAll('.income-items'),
    btnPlusIncome = document.getElementsByTagName('button')[0],
    addIncomeInputs = document.querySelectorAll('.additional_income-item'),
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

const isNumber = function (n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

class AppData {
    constructor() {
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
}

start() {
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
    allInputs.forEach((item) => {
        return item.setAttribute("readonly", true);
    });

    startBtn.parentNode.insertBefore(cancelBtn, startBtn);
    startBtn.style.display = 'none';
    cancelBtn.style.display = 'block';
}
showResult() {
    budgetDayVal.value = Math.ceil(this.budgetDay);
    budgetMonthVal.value = this.budgetMonth;
    expensesMonthVal.value = this.expensesMonth;
    addExpensesVal.value = this.addExpenses.join(', ');
    addIncomeVal.value = this.addIncome.join(', ');
    targetMonthVal.value = Math.ceil(this.getTargetMonth());
    incomePeriodVal.value = this.calcPeriod();

    periodSelect.addEventListener('input', () => {
        incomePeriodVal.value = this.calcPeriod();
    });
}
addExpensesBlock() {
    const cloneExpensesItem = expensesItems[0].cloneNode(true);
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, btnPlusExpenses);
    expensesItems = document.querySelectorAll('.expenses-items');
    
    if(expensesItems.length === 3) {
        btnPlusExpenses.style.display = 'none';
    }

    cloneExpensesItem.firstElementChild.value = '';
    cloneExpensesItem.lastElementChild.value = '';

    allInputsNaming = document.querySelectorAll('input[placeholder="Наименование"]');
    allInputsSum = document.querySelectorAll('input[placeholder="Сумма"]');

    allInputsSum.forEach((item) => {
        item.addEventListener('input', this.checkInputs);
    });

    allInputsNaming.forEach((item) => {
        item.addEventListener('input', this.checkInputs);
    });
}
addIncomeBlock() {
    const cloneIncome = incomeItems[0].cloneNode(true);
    incomeItems[0].parentNode.insertBefore(cloneIncome, btnPlusIncome);
    incomeItems = document.querySelectorAll('.income-items');
    
    if(incomeItems.length === 3) {
        btnPlusIncome.style.display = 'none';
    }

    cloneIncome.firstElementChild.value = '';
    cloneIncome.lastElementChild.value = '';

    allInputsNaming = document.querySelectorAll('input[placeholder="Наименование"]');
    allInputsSum = document.querySelectorAll('input[placeholder="Сумма"]');

    allInputsSum.forEach((item) => {
        item.addEventListener('input', this.checkInputs);
    });

    allInputsNaming.forEach((item) => {
        item.addEventListener('input', this.checkInputs);
    });
}
getExpenses() {
    expensesItems.forEach((item) => {
        let itemExpenses = item.querySelector('.expenses-title').value;
        let cashExpenses = item.querySelector('.expenses-amount').value;

        if(itemExpenses !== '' && cashExpenses !== ''){
            this.expenses[itemExpenses] = cashExpenses;
        }
    });
}
getIncome() {
    incomeItems.forEach((item) => {
        let itemIncome = item.querySelector('.income-title').value;
        let cashIncome = item.querySelector('.income-amount').value;

        if(itemIncome !== '' && cashIncome !== '') {
            this.income[itemIncome] = cashIncome;
        }    
    });
    for(let key in +this.income) {
        this.incomeMonth += +this.income[key];
    }
}
getAddExpenses() {
    let addExpenses = addExpensesItem.value.split(',');
    addExpenses.forEach((item) => {
        item = item.trim();
        
        if(item !== '') {
            this.addExpenses.push(item);
        }
    });
}
getAddIncome() {
    addIncomeInputs.forEach((item) => {
        let itemValue = item.value.trim();
        
        if(itemValue !== '') {
            this.addIncome.push(itemValue);
        }
    });
}
changPeriod() {
    periodAmount.textContent = periodSelect.value;
}
getExpensesMonth() { 
    for (let key in this.expenses) {
        this.expensesMonth += +this.expenses[key];
    }
}
getBudget() { 
    this.budgetMonth = +this.budget + this.incomeMonth - this.expensesMonth,
    this.budgetDay = +this.budgetMonth / 30;
}
getTargetMonth() {
    return (targetAmount.value / this.budgetMonth);
}
resetAllInput() {
    allInputs = document.querySelectorAll('input[type="text"]');
    allInputs.forEach((item) => {
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
}
checkInputs() {
    const lettersDigits = /^[\u0410-\u044F+\s\.\,\-]*$/;
    const numsDigits = /^[\d]*$/;
    
    allInputsNaming.forEach((item) => {
        const testResult = lettersDigits.test(item.value);
        if(!testResult) {
            item.value = '';
            item.placeholder = 'Только кирилица!';
        } else if (testResult){
            item.placeholder = 'Наименование';
        } else {
            item.placeholder = 'Наименование';
        }
    })
    
    allInputsSum.forEach((item) => {
        const testResult = numsDigits.test(item.value);
        if(!testResult) {
            item.value = '';
            item.placeholder = 'Введите число!';
        } else if (testResult) {
            item.placeholder = 'Сумма';
        } else {
            item.placeholder = 'Сумма';
        }
    });
}
calcPeriod() {
    return this.budgetMonth * periodSelect.value;
}
eventListeners() {

    startBtn.disabled = true;
    salaryAmount.addEventListener('input', function() {
        startBtn.disabled = false;
    });

    startBtn.addEventListener('click', this.start.bind(this));
    cancelBtn.addEventListener('click', this.resetAllInput.bind(this));

    btnPlusExpenses.addEventListener('click', this.addExpensesBlock.bind(this));
    btnPlusIncome.addEventListener('click', this.addIncomeBlock.bind(this));
    periodSelect.addEventListener('input',  this.changPeriod.bind(this));

    allInputsSum.forEach( (item) => {
        if(allInputsSum.length > 5) {
            item.addEventListener('input', this.checkInputs.bind(this));
        } else {
            item.addEventListener('input', this.checkInputs.bind(this));
        }
    });
    allInputsNaming.forEach((item) => {
        if(allInputsNaming.length > 4) {
            item.addEventListener('input', this.checkInputs.bind(this));
        } else {
            item.addEventListener('input', this.checkInputs.bind(this));
        }
    });
  }

}

const appData = new AppData();

appData.eventListeners();
