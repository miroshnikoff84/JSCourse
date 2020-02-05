'use strict'

let books = document.querySelectorAll('.books'),
  book = document.querySelectorAll('.book');

console.log(books, book);
books[0].appendChild(book[1]);   // 1
books[0].appendChild(book[0]);   // 2
books[0].appendChild(book[4]);   // 3
books[0].appendChild(book[3]);   // 4
books[0].appendChild(book[5]);   // 5
books[0].appendChild(book[2]);   // 6

let body = document.getElementsByTagName("body");
document.body.style.backgroundImage = "url('./image/you-dont-know-js.jpg')";
document.querySelector('.adv').remove();
let header = document.querySelectorAll('.book h2 a')[2];
header.textContent = "Книга 3. this и Прототипы Объектов";

let charterTwoWrap = document.querySelectorAll('ul')[1],
  charterTwoWrapElements = charterTwoWrap.querySelectorAll('li');
charterTwoWrap.appendChild(charterTwoWrapElements[0]);
charterTwoWrap.appendChild(charterTwoWrapElements[1]);
charterTwoWrap.appendChild(charterTwoWrapElements[3]);
charterTwoWrap.appendChild(charterTwoWrapElements[6]);
charterTwoWrap.appendChild(charterTwoWrapElements[8]);
charterTwoWrap.appendChild(charterTwoWrapElements[4]);
charterTwoWrap.appendChild(charterTwoWrapElements[5]);
charterTwoWrap.appendChild(charterTwoWrapElements[7]);
charterTwoWrap.appendChild(charterTwoWrapElements[9]);
charterTwoWrap.appendChild(charterTwoWrapElements[2]);
charterTwoWrap.appendChild(charterTwoWrapElements[10]);
  


let charterFiveWrap = document.querySelectorAll('ul')[4],
  charterFiveWrapElements = charterFiveWrap.querySelectorAll('li');
charterFiveWrap.appendChild(charterFiveWrapElements[0]);
charterFiveWrap.appendChild(charterFiveWrapElements[1]);
charterFiveWrap.appendChild(charterFiveWrapElements[9]);
charterFiveWrap.appendChild(charterFiveWrapElements[3]);
charterFiveWrap.appendChild(charterFiveWrapElements[4]);
charterFiveWrap.appendChild(charterFiveWrapElements[2]);
charterFiveWrap.appendChild(charterFiveWrapElements[6]);
charterFiveWrap.appendChild(charterFiveWrapElements[7]);
charterFiveWrap.appendChild(charterFiveWrapElements[5]);
charterFiveWrap.appendChild(charterFiveWrapElements[8]);
charterFiveWrap.appendChild(charterFiveWrapElements[10]);

let charterSixWrap = document.querySelectorAll('ul')[5],
  charterSixWrapElements = charterSixWrap.querySelectorAll('li'),
  theNewLi = document.createElement('li');
  theNewLi.textContent = "Глава 8: За пределами ES6"
  charterSixWrap.appendChild(theNewLi);