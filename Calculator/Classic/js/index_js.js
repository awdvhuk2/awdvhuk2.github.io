$(document).ready(function(){

    var value1 = undefined;
    var value2 = undefined;
    var operation = '';
    var result = undefined;
    var screen = '';
    var valTime = '';
    var inputRound = 5;
    var round = 100000;

    $('body').keydown(function() {
        var localKeyValue = '';
        if ( event.shiftKey ) {
            switch ( event.keyCode ) {
                case 187:
                localKeyValue = '+';
                addOperation(localKeyValue);
                return;

                case 56:
                localKeyValue = '*';
                addOperation(localKeyValue);
                return;
            }
            return;
        }
        keyID();
    });

    $('.numbers button').click(function() {
        var localButtonValue = $(this).text();
        add(localButtonValue);
    });

    $('.oper').click(function() {
        operTimeButton = $(this).text();
        addOperation(operTimeButton);
    });

    $('.equality').click( equality );

    $('.backspace').click( back );

    $('.clear').click( clr );

    $('header button').click(function() {
        var enterRound = $(this).text();
        findRound(enterRound);
    });

    function add(localValue) {
        if ( operation != '' && value2 == undefined ) { valTime = ''; }
        if ( operation == '' && result != undefined ) { clr(); }
        if ( localValue == '0' && valTime == '0' ) { return; }
        if ( localValue != '.' && valTime == '0' ) { valTime = ''; }
        var valueSplit = valTime.split('');
        if (
            localValue == '.' &&
            (valueSplit[0] == '-' || valueSplit.length == 0)
        ) { localValue = '0.'; }
        for ( i = 0; i < valueSplit.length; i++ ) {
            if ( valueSplit[i] == '.' && localValue == '.' )
            return;
        }
        valTime += localValue;
        if ( operation != '' ) { value2 = +valTime }
        $('.calculator output').val(screen + valTime);
        lengthCheck();
    }

    function addOperation(operTime) {
        if ( valTime == '' ) {
            if ( operTime == '-') {
                valTime += '-';
                $('.calculator output').val(valTime);
                return;
            }
            valTime = '0';
        }
        if ( value2 != undefined ) {
            if (
              operation == 'X2' ||
              operation == 'X3' ||
              operation == 'Xy' || 
              operation == '√'
            ) { return; }

            calculate();
            screen = result + ' ' + operTime + ' ';
            operation = operTime;
            valTime = '';
            $('.calculator output').val(screen);
            lengthCheck();
            return;
        }
        if ( result == undefined ) { value1 = +valTime; }
        operation = operTime;
        if ( operTime == 'Xy' ) { operTime = 'в степени'; }
        if (
            operation == 'X2' ||
            operation == 'X3' ||
            operation == '√'
        ) {
            calculate();
            screen = result + '';
            $('.calculator output').val(screen);
            lengthCheck();
            return;
        }
        screen = value1 + ' ' + operTime + ' ';
        $('.calculator output').val(screen);
        lengthCheck();
    }

    function keyID () {
        var localKeyValue = '';
        switch(event.keyCode) {
            case 91: // comand
            return;

            case 49:
            case 97:
            localKeyValue = '1';
            break;

            case 50:
            case 98:
            localKeyValue = '2';
            break;

            case 51:
            case 99:
            localKeyValue = '3';
            break;
        
            case 52:
            case 100:
            localKeyValue = '4';
            break;
            
            case 53:
            case 101:
            localKeyValue = '5';
            break;
            
            case 54:
            case 102:
            localKeyValue = '6';
            break;
            
            case 55:
            case 103:
            localKeyValue = '7';
            break;
            
            case 56:
            case 104:
            localKeyValue = '8';
            break;
            
            case 57:
            case 105:
            localKeyValue = '9';
            break;
            
            case 48:
            case 96:
            localKeyValue = '0';
            break;

            case 190:
            case 110:
            localKeyValue = '.';
            break;

            case 13:  // enter
            equality();
            return;

            case 187:  // Равно
            equality();
            return;
            
            case 46: // Delete
            case 67: // Кнопка "С"
            localKeyValue = 'clear';
            clr();
            return;

            case 8:
            back();
            return;

            case 189:
            case 109:
            localKeyValue = '-';
            addOperation(localKeyValue);
            return;

            case 191:
            case 111:
            localKeyValue = '/';
            addOperation(localKeyValue);
            return;

            case 106:
            localKeyValue = '*';
            addOperation(localKeyValue);
            return;

            case 107:
            localKeyValue = '+';
            addOperation(localKeyValue);
            return;

            case 37:
            findRound('←');
            return;

            case 39:
            findRound('→');
            return;
        }
        add(localKeyValue);
    }

    function calculate() {
        switch(operation) {
            case '+':
            result = value1 + value2;
            break;

            case '-':
            result = value1 - value2;
            break;

            case '*':
            result = value1 * value2;
            break;

            case '/':
            if ( value2 == 0 ) {
                clr();
                result = 'Не надо ТАК';
                return;
            }
            result = value1 / value2;
            break;

            case 'X2':
            result = value1 * value1;
            operation = '';
            break;

            case 'X3':
            result = value1 * value1 * value1;
            operation = '';
            break;

            case '√':
            result = Math.sqrt(value1);
            operation = '';
            break;

            case 'Xy':
            result = Math.pow(value1, value2);
            break;

            case '%':
            result = (value1 / 100) * value2;
            break;
        }
        result = Math.round(result * round) / round ;
        value2 = undefined;
        value1 = result;
    }

    function equality() {
        if ( value2 == undefined ) { return; }
        calculate();
        $('.calculator output').val(result);
        lengthCheck();
        operation = '';
    }
    
    function back() {
        if (
            result != undefined &&
            operation == ''
        ) { clr(); return; }
        var a = valTime.split('');
        a.pop();
        if ( a.length == 0 ) {
            valTime = '';
            if ( screen == '' ) {
                $('.calculator output').val('0');
                return;
            }
        }
        valTime = a.join('');
        $('.calculator output').val(screen + valTime);
        lengthCheck();
    }

    function clr() {
        $('.calculator output').val('0');
        value1 = undefined;
        value2 = undefined;
        operation = '';
        result = undefined;
        screen = '';
        valTime = '';
    }

    function findRound(enterRound) {
        switch ( enterRound ) {
            case '←':
            if ( inputRound == 0 ) { return; }
            inputRound--;
            round /= 10;
            break;

            case '→':
            if ( inputRound == 20 ) { return; }
            inputRound++;
            round *= 10;
            break;
        }
        $('p output').val(inputRound);
    }

    function lengthCheck() {
        var a = $('.calculator output').val() + '';
        var split = a.split('');
        if ( split.length > 16 ) {
            $('.calculator output').val('Ту мач циферок...');
        }
    }
});