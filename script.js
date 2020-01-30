'use strict';
alert('hello');
console.log('hello');

// let money = 6000000;                    //Доход за месяц
let income = 45324;                        //Дополнительный доход за месяц
// const addExpenses = 798;                //Дополнительные расходы
// let deposit = true;                     //Наличие депозита
// const mission = 120000000;              //Сумма которую нужно накопить
let period = 31;                           //Период   

// var num = 266219;
// var arr = [];
// var arr2 = [];
// for (var temp = num;
//          Math.round(temp) != 0;
//          temp /= 10, temp = Math.floor(temp)){

//          arr.unshift(temp%10);
// }

// var total = arr.reduceRight(function(a, b) {
//   return a * b;
// });

// console.log(total);
// var pow = total ** 3; 

// console.log(pow);

// for (var temp = pow;
//          Math.round(temp) != 0;
//          temp /= 10, temp = Math.floor(temp)){

//          arr2.unshift(temp%10);
// }
// console.log(arr2);
// for (let i = 0; i < 2; i++){
  
//   console.log(arr2[i]);
// }



let money = prompt('Ваш ежемесячный доход?');
console.log(money);
let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
let deposit = confirm('Есть ли у вас депозит в банке?');
let expenses1 = prompt('Введите обязательную статью расходов');
let amount1 = prompt('Во сколько это обойдется?');
let expenses2 = prompt('Введите обязательную статью расходов');
let amount2 = prompt('Во сколько это обойдется?');
let budgetMount = (amount1 + amount2 + addExpenses);
console.log(budgetMount);
let mission = prompt('Ваша цель заработать');
console.log(mission / ((money + income) - (expenses1 + expenses2 + addExpenses)));
let budgetDay = (budgetMount / 31);
if (budgetDay > 1200) {
  alert('У вас высокий уровень дохода'); 
}

if (budgetDay > 600) {
  alert('У вас средний уровень дохода');
}

if (budgetDay < 0) {
  alert('Что то пошло не так');
}