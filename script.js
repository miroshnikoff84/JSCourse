'use strict';

const salaryAmount = document.querySelector('.salary-amount'),
      incomeTitle = document.querySelector('.income-title'),
      btnPlusIncome = document.getElementsByTagName('button')[0],
      addIncomeInputs = document.querySelectorAll('.additional_income-item'),
      additionalIncomeItems = document.querySelectorAll('.additional_income-item'),
      expensesTitle = document.querySelector('.expenses-title'),
      btnPlusExpenses = document.getElementsByTagName('button')[1],
      addExpensesItem = document.querySelector('.additional_expenses-item'),
      depositCheckbox = document.querySelector('#deposit-check'),
      depositBank = document.querySelector('.deposit-bank'),
      depositAmount = document.querySelector('.deposit-amount'),
      depositPercent = document.querySelector('.deposit-percent'),
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
      cancelBtn = document.querySelectorAll('#cancel')[0];
    
  let allInputs = document.querySelectorAll('input[type="text"]'),
      expensesItems = document.querySelectorAll('.expenses-items'),
      incomeItems = document.querySelectorAll('.income-items'),
      allInputsSum = document.querySelectorAll('input[placeholder="Сумма"]'),
      allInputsNaming = document.querySelectorAll('input[placeholder="Наименование"]');
    
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
        this.getInfoDeposit();
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
        addExpensesVal.value = this.addExpenses;
        addIncomeVal.value = this.addIncome.join(', ');
        targetMonthVal.value = Math.ceil(this.getTargetMonth());
        incomePeriodVal.value = this.calcPeriod();

        periodSelect.addEventListener('input', () => {
            incomePeriodVal.value = this.calcPeriod();
        });
    }
    addExpensesBlock() {  // клонируем инпуты расходов
        const cloneExpensesItem = expensesItems[0].cloneNode(true);
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, btnPlusExpenses);
        expensesItems = document.querySelectorAll('.expenses-items');

        if (expensesItems.length === 3) {
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

        cancelBtn.addEventListener('click', () => {
            cloneExpensesItem.firstElementChild.value = '';
            cloneExpensesItem.lastElementChild.value = '';
            cloneExpensesItem.remove();
            btnPlusExpenses.style.display = 'block';
            btnPlusExpenses.disabled = false;
        });
    }
    addIncomeBlock() {  // клонируем инпуты доходов
        const cloneIncome = incomeItems[0].cloneNode(true);
        incomeItems[0].parentNode.insertBefore(cloneIncome, btnPlusIncome);
        incomeItems = document.querySelectorAll('.income-items');

        if (incomeItems.length === 3) {
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

        cancelBtn.addEventListener('click', () => {
            cloneIncome.firstElementChild.value = '';
            cloneIncome.lastElementChild.value = '';
            cloneIncome.remove();
            btnPlusIncome.style.display = 'block';
            btnPlusIncome.disabled = false;
        });
    }
    getExpenses() {  //получаем расходы
        expensesItems.forEach((item) => {
            let itemExpenses = item.querySelector('.expenses-title').value;
            let cashExpenses = item.querySelector('.expenses-amount').value;

            if (itemExpenses !== '' && cashExpenses !== '') {
                this.expenses[itemExpenses] = cashExpenses;
            }
        });
    }
    getIncome() {  //получаем доходы
        incomeItems.forEach((item) => {
            let itemIncome = item.querySelector('.income-title').value;
            let cashIncome = item.querySelector('.income-amount').value;

            if (itemIncome !== '' && cashIncome !== '') {
                this.income[itemIncome] = cashIncome;
            }
        });
        for (let key in +this.income) {
            this.incomeMonth += +this.income[key];
        }
    }
    getAddExpenses() {  // форматируем расходы
        let addExpenses = addExpensesItem.value.split(',');
        addExpenses = addExpenses.map(item => item.trim().charAt(0).toUpperCase() + item.trim().slice(1).toLowerCase()).join(', ');
        this.addExpenses = addExpenses.split(',');
    }
    getAddIncome() {  // форматируем доходы
        additionalIncomeItems.forEach((item) => {
            let itemValue = item.value.split(',');
            itemValue = itemValue.map(item => item.trim().charAt(0).toUpperCase() + item.trim().slice(1).toLowerCase()).join(', ');
            itemValue = itemValue.split(',');
            if (itemValue !== '') {
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
        const monthDeposit = this.moneyDeposit * (this.percentDeposit / 100);
        this.budgetMonth = +this.budget + this.incomeMonth - this.expensesMonth + monthDeposit,
            this.budgetDay = this.budgetMonth / 30;
    }
    getTargetMonth() {
        return (targetAmount.value / this.budgetMonth);
    }
    resetAllInput() {  // сброс всех инпутов
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
        depositCheckbox.checked = false;
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
        this.depositHandler();
    }
    checkInputs() {  // проверка инпутов
        const lettersDigits = /^[\u0410-\u044F+\s\.\,\-]*$/;
        const numsDigits = /^[\d]*$/;

        allInputsNaming.forEach((item) => {
            const testResult = lettersDigits.test(item.value);
            if (!testResult) {
                item.value = '';
                item.placeholder = 'Только кирилица!';
            } else {
                item.placeholder = 'Наименование';
            }
        });

        allInputsSum.forEach((item) => {
            const testResult = numsDigits.test(item.value);
            if (!testResult) {
                item.value = '';
                item.placeholder = 'Введите число!';
            } else {
                item.placeholder = 'Сумма';
            }
        });
    }
    calcPeriod() {
        return this.budgetMonth * periodSelect.value;
    }
    getInfoDeposit() { // При наличии депозита получаем значения
        if (this.deposit) {
            this.percentDeposit = depositPercent.value;
            this.moneyDeposit = depositAmount.value;
        }
    }
    changePercent() { // Изменяем процент
        const valueSelect = this.value;
        const selIndex = depositBank.selectedIndex;

        if (valueSelect === 'other' || selIndex === 6) {

            depositPercent.style.display = 'inline-block';

            if (valueSelect > 100 || valueSelect < 0) {
                alert('Введите корректное значение в поле проценты!');
                startBtn.disabled = true;
                salaryAmount.setAttribute("readonly", true);
            } else if (valueSelect < 100 && selIndex === 6) {
                depositPercent.style.display = 'inline-block';
                salaryAmount.removeAttribute("readonly");
                startBtn.disabled = false;
            }
        } else {
            depositPercent.value = valueSelect;
            depositPercent.style.display = 'none';
        }
    }
    depositHandler() { // Проверяем состояние чекбокса и контролируем поля "Депозит"
        if (depositCheckbox.checked) {
            depositBank.style.display = 'inline-block';
            depositAmount.style.display = 'inline-block';
            this.deposit = true;
            depositBank.addEventListener('change', this.changePercent);
            depositPercent.addEventListener('change', this.changePercent);
        } else {
            depositBank.style.display = 'none';
            depositAmount.style.display = 'none';
            depositPercent.style.display = 'none';
            depositBank.value = '';
            depositAmount.value = '';
            depositPercent.value = '';
            this.deposit = false;
            depositBank.removeEventListener('cahnge', this.changePercent);
            depositPercent.removeEventListener('change', this.changePercent);
        }
    }
    eventListeners() {
        startBtn.disabled = true; 
        salaryAmount.addEventListener('input', function() {
            startBtn.disabled = false;
        });  
      // Блокировка кнопки "Рассчитать" 
      startBtn.addEventListener('click', this.start.bind(this));
      // проверяем события при нажатии на кнопку "Рассчитать"
      cancelBtn.addEventListener('click', this.resetAllInput.bind(this));
      // проверяем события при нажатии на кнопку "Сбросить"
      btnPlusExpenses.addEventListener('click', this.addExpensesBlock.bind(this));
      // проверяем события при нажатии на кнопку "Плюс(расходы)"
      btnPlusIncome.addEventListener('click', this.addIncomeBlock.bind(this));
      // проверяем события при нажатии на кнопку "Плюс(доходы)"
      periodSelect.addEventListener('input', this.changPeriod.bind(this));
      // проверяем события "Период расчета"
        allInputsSum.forEach((item) => {
            item.addEventListener('input', this.checkInputs.bind(this));
        }); //  проверяем события в полях СУММА
        allInputsNaming.forEach((item) => {
            item.addEventListener('input', this.checkInputs.bind(this));
        }); // проверяем события в полях Наименование
        depositCheckbox.addEventListener('change', this.depositHandler.bind(this));
    } // Чекбокс

}

const appData = new AppData();

appData.eventListeners();