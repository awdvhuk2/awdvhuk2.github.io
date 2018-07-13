$(document).ready(function(){
    var output = [];
    var stack = [];
    var input = '';
    var screen = '';
    var operation = '';
    var bracket = '';
    var inputRound = 5;
    var round = 100000;
    var result = undefined;
    var error = '';

    $('body').keydown(function() {
        var localKeyValue = '';
        if ( event.shiftKey ) {
            switch ( event.keyCode ) {
                case 187:
                localKeyValue = ' + ';
                addOperation(localKeyValue);
                return;

                case 56:
                localKeyValue = ' * ';
                addOperation(localKeyValue);
                return;

                case 57:
                bracket = ' ( ';
                addBracket(bracket);
                return;

                case 48:
                bracket = ' ) ';
                addBracket(bracket);
                return;

                case 54:
                localKeyValue = ' ^ ';
                addOperation(localKeyValue);
                return;
            }
            return;
        }
        keyID();
    });

    $('.numbers button').click(function() {
        var localButtonValue = $(this).text();
        addValue(localButtonValue);
    });

    $('.oper').click(function() {
        var operTimeButton = $(this).text();
        addOperation(operTimeButton);
    });

    $('.bracket').click(function() {
        bracket = $(this).text();
        addBracket(bracket);
    });

    $('.equality').click( equality );

    $('.backspace').click( back );

    $('.clear').click( clr );

    $('header button').click(function() {
        var enterRound = $(this).text();
        findRound(enterRound);
    });

    function addValue(localValue) {
        if ( bracket == ' ) ' ) { return; }
        if ( operation != '' ) { addToStack(operation); }
        screen += operation;
        var splitInput = input.split('');
        if ( localValue == '0' && input == '0' ) { return; }
        if ( localValue != '.' &&
            localValue != '0' &&
            input == '0'
        ) { input = ''; }
        if ( localValue == '.' ) {
            if ( splitInput[0] == undefined ) { input = '0'; }
            for ( let i = 0; i < splitInput.length; i++ ) {
                if ( splitInput[i] == '.' ) { return; }
            }
        }
        input += localValue;
        $('.calculator output').val(screen + input);
        operation = '';
        bracket = '';
    }

    function addOperation(operTime) {
        if ( operTime == '√' ) {
            if ( operation != '' ) {
                addToStack(operation); 
                screen += operation;
            }
            $('.calculator output').val(screen + operTime);
            operation = operTime;
            input = '';
            return;
        }
        if ( input == '' &&
            operation == '' &&
            bracket != ' ) ' ||
            operation == '√'
        ) { return; }
        if ( input != '' ) { addToOutput(input); }
        screen += input;
        operation = operTime;
        $('.calculator output').val(screen + operation);
        input = '';
        bracket = '';
    }

    function addBracket(_bracket) {
        if ( screen == '' &&
            input == '' &&
            _bracket == ' ( '
        ) {
            screen += _bracket;
            addToStack(_bracket);
            $('.calculator output').val(screen);
            return;
        }

        if ( _bracket == ' ( ' && input == '' ) {
            if ( operation != '' ) { addToStack(operation); }
            addToStack(_bracket);
            screen += operation + _bracket;
            operation = '';
            $('.calculator output').val(screen);

        }
        
        if ( _bracket == ' ) ' && operation == '' ) { // Веременный костыль
            for ( var i = 0; i < stack.length; i++ ) {
                if ( stack[i] == ' ( ' ) {
                    if ( input != '' ) { addToOutput(input); }
                    addToStack(_bracket);
                    screen += input + _bracket;
                    var check = screen.split('');
                    if ( check[(check.length-5)] == '(' ) {
                        addToOutput('0');
                    }
                    input = '';
                    $('.calculator output').val(screen);
                    return;
                }
            }
            bracket = '';
        }
    }

    function addToOutput(out_val) {
        output.push(out_val);
    }

    function addToStack(st_val) {
        switch (st_val) {
            case ' + ':
            case ' - ':
            for ( let i = (stack.length - 1); i >=0; i-- ) {
                if ( stack[i] == ' ( ' ) { break; }
                if ( stack[i] == ' ^ ' ) {
                    addToOutput(' ^ ');
                    stack.pop();
                }
                else break;
            }
            for ( let i = (stack.length - 1); i >=0; i-- ) {
                if ( stack[i] == ' ( ' ) { break; }
                if ( stack[i] == '√' ) {
                    addToOutput('√');
                    stack.pop();
                }
                else break;
            }
            for ( let i = (stack.length - 1); i >=0; i-- ) {
                if ( stack[i] == ' ( ' ) { break; }
                if ( stack[i] == ' * ' || stack[i] == ' / ' ) {
                    addToOutput(stack[i]);
                    stack.pop();
                }
                else break;
            }
            stack.push(st_val);
            break;

            case ' * ':
            case ' / ':
            for ( let i = (stack.length - 1); i >=0; i-- ) {
                if ( stack[i] == ' ( ' ) { break; }
                if ( stack[i] == ' ^ ' ) {
                    addToOutput(' ^ ');
                    stack.pop();
                }
                else break;
            }
            for ( let i = (stack.length - 1); i >=0; i-- ) {
                if ( stack[i] == ' ( ' ) { break; }
                if ( stack[i] == '√' ) {
                    addToOutput('√');
                    stack.pop();
                }
                else break;
            }
            stack.push(st_val);
            break;

            case ' ^ ':
            for ( let i = (stack.length - 1); i >=0; i-- ) {
                if ( stack[i] == ' ( ' ) { break; }
                if ( stack[i] == '√' ) {
                    addToOutput('√');
                    stack.pop();
                }
                else break;
            }
            stack.push(st_val);
            break;

            case '√':
            stack.push(st_val);
            break;

            case ' ( ':
            stack.push(st_val);
            break;

            case ' ) ':
                var i = stack.length - 1;
                while ( stack[i] != ' ( ' ) {
                    addToOutput(stack[i]);
                    stack.pop();
                    i--;
                }
                stack.pop();
            break;
        }
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
            localKeyValue = ' - ';
            addOperation(localKeyValue);
            return;

            case 191:
            case 111:
            localKeyValue = ' / ';
            addOperation(localKeyValue);
            return;

            case 106:
            localKeyValue = ' * ';
            addOperation(localKeyValue);
            return;

            case 107:
            localKeyValue = ' + ';
            addOperation(localKeyValue);
            return;

            case 37:
            findRound('←');
            return;

            case 39:
            findRound('→');
            return;
        }
        addValue(localKeyValue);
    }

    function calculate() {
        var finalArr = output;
        var val_1 = 0;
        var val_2 = 0;
        var oper = '';
        var i = 0;
        for ( let i = 0; i < finalArr.length; i++ ) {
            if ( finalArr[i] == ' ( ' ) {
                error = ' - Не хватает закрывающих скобок'
                finalArr.splice(i, 1);
            }
        }
        while ( finalArr.length > 1 ) {
            // alert(finalArr);
            for ( i = 0; i < finalArr.length; i++ ) {
                if ( !parseFloat(finalArr[i]) && finalArr[i] != '0' ) {
                    oper = finalArr[i];
                    val_1 = +finalArr[i-2];
                    val_2 = +finalArr[i-1];
                    break;
                }
            }
            switch(oper) {
                case ' + ':
                result = val_1 + val_2;
                break;

                case ' - ':
                result = val_1 - val_2;
                break;

                case ' * ':
                result = val_1 * val_2;
                break;

                case ' / ':
                if ( val_2 == 0 ) {
                    clr();
                    result = 'Не советую делить на ноль';
                    return;
                }
                result = val_1 / val_2;
                break;

                case '√':
                result = Math.sqrt(val_2);
                result = Math.round(result * round) / round ;
                break;

                case ' ^ ':
                result = Math.pow(val_1, val_2);
                break;
            }
            switch (oper) {
                case '√':
                finalArr.splice((i-1), 2, result);
                break;

                default:
                finalArr.splice((i-2), 3, result);
            }
        }
        if ( result == undefined ) { result = 'Маловато будет'; return; }
        result = Math.round(result * round) / round ;
    }

    function equality() {
        if ( input == '' && bracket != ' ) ' ) { return; }
        if ( bracket != ' ) ' ) { addToOutput(input); }
        for ( let i = (stack.length - 1); i >= 0; i-- ) {
            output.push(stack[i]);
        }
        calculate();
        var a = result + error;
        clr();
        $('.calculator output').val(a);
    }
    
    function back() {
        var a = input.split('');
        a.pop();
        if ( a.length == 0 ) {
            input = '';
            if ( screen == '' ) {
                $('.calculator output').val('0');
                return;
            }
        }
        input = a.join('');
        $('.calculator output').val(screen + input);
    }

    function clr() {
        output = [];
        stack = [];
        input = '';
        screen = '';
        operation = '';
        bracket = '';
        result = undefined;
        error = '';
        $('.calculator output').val('0');
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
});