'use strict'

function translate() {
    let select = +prompt(`Введите: \n
    1 если решение через if \n
    2 если решение через switch \n
    3 если решение через многомерный массив \n
    4 если решение через несколько тернарных операторов`);
    
    const ruLang = 'Пн, Вт, Ср, Чт, Пт, Сб, Вс',
    enLang = 'Mon, Tue, Wed, Thu, Fri, Sat, San',
    error = 'Ошибка! Введите ru или en',
    error2 = 'Ошибка! Введите число от 1 до 4';

    function useIf () {
        let lang = prompt('Выберите язык: ru или en. (используется if)');

        if (lang == 'ru') {
            alert(ruLang);
        }else if (lang == 'en') {
            alert(enLang);
        }else{
        alert(error);
        useIf(); 
        }

        return;
    };

    function useSwitch() {
        let lang = prompt('Выберите язык: ru или en. (используется switch)');

        switch(lang) {
        case 'ru':
            alert(ruLang);
            break;
        case 'en':
            alert(enLang);
            break;
        default:
            alert(error);  
            useSwitch();      
        }
    };

    function useArray () {
        const matrix = [
            ['Пн ', 'Вт ', 'Ср ', 'Чт ', 'Пт ', 'Сб ', 'Вс '],
            ['Mon ', 'Tue ', 'Wed ', 'Thu ', 'Fri ', 'Sat ', 'San ']
        ];

        let lang = prompt('Выберите язык: ru или en. (используется многомерный массив)');
        lang === 'ru' ? alert(matrix [0]) : lang === 'en' ? alert(matrix [1]) : useArray();

        return;
        
    };

    function ternOper () {
        let namePerson = prompt('Введите имя');

        (namePerson === 'Артем') ? alert('Директор') : (namePerson === 'Максим') ? alert('Преподаватель') : alert('Студент');
        return;

    };

    switch(select) {
    case 1:
        useIf();
        break;
    case 2:
        useSwitch();
        break;
    case 3:
        useArray();
        break;
    case 4:
        ternOper();
        break;    
    default:
        alert(error2);
        translate();

    };

    return;

};

translate();