'use strict';

class First {
    hello(){
        console.log('Я метод родителя!');
    }
}

class Second extends First{
    hello(){
        super.hello();
        console.log('Я наследуемый метод!');
    }
}
const two = new Second();

two.hello();