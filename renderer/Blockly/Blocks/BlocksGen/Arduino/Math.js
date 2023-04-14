import  Blockly from 'blockly/core';
import '../../../ArduinoUtils/generator_arduino'

Blockly.Arduino.math_numbers = function () {
    // Numeric value.
    var code = window.parseFloat(this.getFieldValue('NUM'));
    // -4 is actually an operator and a number.  Reflect this in the order.
    var order = code < 0 ?
        Blockly.Arduino.ORDER_UNARY_PREFIX : Blockly.Arduino.ORDER_ATOMIC;
    return [code, order];
};

Blockly.Arduino.math_number = function () {
    // Numeric value.
    var code = window.parseFloat(this.getFieldValue('NUM'));
    // -4 is actually an operator and a number.  Reflect this in the order.
    var order = code < 0 ?
        Blockly.Arduino.ORDER_UNARY_PREFIX : Blockly.Arduino.ORDER_ATOMIC;
    return [code, order];
};

Blockly.Arduino.math_arithmetic = function () {
    // Basic arithmetic operators, and power.
    var mode = this.getFieldValue('OP');
    var tuple = Blockly.Arduino.math_arithmetic.OPERATORS[mode];
    var operator = tuple[0];
    var order = tuple[1];
    var argument0 = Blockly.Arduino.valueToCode(this, 'A', order) || '0';
    var argument1 = Blockly.Arduino.valueToCode(this, 'B', order) || '0';
    var code;
    if (!operator) {
        code = 'pow(' + argument0 + ', ' + argument1 + ')';
        return [code, Blockly.Arduino.ORDER_UNARY_POSTFIX];
    }
    code = argument0 + operator + argument1;
    return [code, order];
};

Blockly.Arduino.inout_angle_maths = function () {
    // Just angle
    var angle = this.getFieldValue('ANGLE');
    // TODO: Change ORDER_NONE to the correct strength.
    return [angle, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.math_arithmetic.OPERATORS = {
    ADD: [' + ', Blockly.Arduino.ORDER_ADDITIVE],
    MINUS: [' - ', Blockly.Arduino.ORDER_ADDITIVE],
    MULTIPLY: [' * ', Blockly.Arduino.ORDER_MULTIPLICATIVE],
    DIVIDE: [' / ', Blockly.Arduino.ORDER_MULTIPLICATIVE],
    POWER: [null, Blockly.Arduino.ORDER_NONE]  // Handle power separately.
};

Blockly.Arduino['math_single'] = function (block) {
    var operator = block.getFieldValue('OP');
    var code;
    var arg;
    if (operator == 'NEG') {
        // Negation is a special case given its different operator precedents.
        arg = Blockly.Arduino.valueToCode(block, 'NUM',
            Blockly.Arduino.ORDER_UNARY_PREFIX) || '0';
        if (arg[0] == '-') {
            // --3 is not legal in C++ in this context.
            arg = ' ' + arg;
        }
        code = '-' + arg;
        return [code, Blockly.Arduino.ORDER_UNARY_PREFIX];
    }
    if (operator == 'ABS' || operator.substring(0, 5) == 'ROUND') {
        arg = Blockly.Arduino.valueToCode(block, 'NUM',
            Blockly.Arduino.ORDER_UNARY_POSTFIX) || '0';
    } else if (operator == 'SIN' || operator == 'COS' || operator == 'TAN') {
        arg = Blockly.Arduino.valueToCode(block, 'NUM',
            Blockly.Arduino.ORDER_MULTIPLICATIVE) || '0';
    } else {
        arg = Blockly.Arduino.valueToCode(block, 'NUM',
            Blockly.Arduino.ORDER_NONE) || '0';
    }
    // First, handle cases which generate values that don't need parentheses.
    switch (operator) {
        case 'ABS':
            code = 'abs(' + arg + ')';
            break;
        case 'ROOT':
            code = 'sqrt(' + arg + ')';
            break;
        case 'LN':
            code = 'log(' + arg + ')';
            break;
        case 'EXP':
            code = 'exp(' + arg + ')';
            break;
        case 'POW10':
            code = 'pow(10,' + arg + ')';
            break;
        case 'ROUND':
            code = 'round(' + arg + ')';
            break;
        case 'ROUNDUP':
            code = 'ceil(' + arg + ')';
            break;
        case 'ROUNDDOWN':
            code = 'floor(' + arg + ')';
            break;
        case 'SIN':
            code = 'sin(' + arg + ' / 180 * M_PI)';
            break;
        case 'COS':
            code = 'cos(' + arg + ' / 180 * M_PI)';
            break;
        case 'TAN':
            code = 'tan(' + arg + ' / 180 * M_PI)';
            break;
    }
    if (code) {
        return [code, Blockly.Arduino.ORDER_UNARY_POSTFIX];
    }
    // Second, handle cases which generate values that may need parentheses.
    switch (operator) {
        case 'LOG10':
            code = 'log(' + arg + ') / log(10)';
            break;
        case 'ASIN':
            code = 'asin(' + arg + ') / M_PI * 180';
            break;
        case 'ACOS':
            code = 'acos(' + arg + ') / M_PI * 180';
            break;
        case 'ATAN':
            code = 'atan(' + arg + ') / M_PI * 180';
            break;
        default:
            throw 'Unknown math operator: ' + operator;
    }
    return [code, Blockly.Arduino.ORDER_MULTIPLICATIVE];
};

Blockly.Arduino['math_constant'] = function () {
    // Constants: PI, E, the Golden Ratio, sqrt(2), 1/sqrt(2), INFINITY.
    var CONSTANTS = {
        'PI': ['M_PI', Blockly.Arduino.ORDER_MEMBER],
        'E': ['E', Blockly.Arduino.ORDER_MEMBER],
        'GOLDEN_RATIO':
            ['(1 + sqrt(5)) / 2', Blockly.Arduino.ORDER_DIVISION],
        'SQRT2': ['SQRT2', Blockly.Arduino.ORDER_MEMBER],
        'SQRT1_2': ['SQRT1_2', Blockly.Arduino.ORDER_MEMBER],
        'INFINITY': ['Infinity', Blockly.Arduino.ORDER_ATOMIC]
    };
    return CONSTANTS[this.getFieldValue('CONSTANT')];
};

Blockly.Arduino['math_number_property'] = function (block) {
    var number_to_check = Blockly.Arduino.valueToCode(block, 'NUMBER_TO_CHECK',
        Blockly.Arduino.ORDER_MULTIPLICATIVE) || '0';
    var dropdown_property = block.getFieldValue('PROPERTY');
    var code;
    if (dropdown_property == 'PRIME') {
        var func = [
            'boolean ' + Blockly.Arduino.DEF_FUNC_NAME + '(int n) {',
            '  // https://en.wikipedia.org/wiki/Primality_test#Naive_methods',
            '  if (n == 2 || n == 3) {',
            '    return true;',
            '  }',
            '  // False if n is NaN, negative, is 1.',
            '  // And false if n is divisible by 2 or 3.',
            '  if (isnan(n) || (n <= 1) || (n == 1) || (n % 2 == 0) || ' +
            '(n % 3 == 0)) {',
            '    return false;',
            '  }',
            '  // Check all the numbers of form 6k +/- 1, up to sqrt(n).',
            '  for (int x = 6; x <= sqrt(n) + 1; x += 6) {',
            '    if (n % (x - 1) == 0 || n % (x + 1) == 0) {',
            '      return false;',
            '    }',
            '  }',
            '  return true;',
            '}'];
        var funcName = Blockly.Arduino.addFunction('mathIsPrime', func.join('\n'));
        Blockly.Arduino.addInclude('math', '#include <math.h>');
        code = funcName + '(' + number_to_check + ')';
        return [code, Blockly.Arduino.ORDER_UNARY_POSTFIX];
    }
    switch (dropdown_property) {
        case 'EVEN':
            code = number_to_check + ' % 2 == 0';
            break;
        case 'ODD':
            code = number_to_check + ' % 2 == 1';
            break;
        case 'WHOLE':
            Blockly.Arduino.addInclude('math', '#include <math.h>');
            code = '(floor(' + number_to_check + ') == ' + number_to_check + ')';
            break;
        case 'POSITIVE':
            code = number_to_check + ' > 0';
            break;
        case 'NEGATIVE':
            code = number_to_check + ' < 0';
            break;
        case 'DIVISIBLE_BY':
            var divisor = Blockly.Arduino.valueToCode(block, 'DIVISOR',
                Blockly.Arduino.ORDER_MULTIPLICATIVE) || '0';
            code = number_to_check + ' % ' + divisor + ' == 0';
            break;
    }
    return [code, Blockly.Arduino.ORDER_EQUALITY];
};

Blockly.Arduino['math_change'] = function () {
    // Add to a variable in place.
    var argument0 = Blockly.Arduino.valueToCode(this, 'DELTA', Blockly.Arduino.ORDER_ADDITIVE) || '0';
    var varName = Blockly.Arduino.nameDB_.getName(this.getFieldValue('VAR'), Blockly.Names.NameType.VARIABLE);
    var code = varName + ' = ' + varName + ' + ' + argument0 + ';\n';
    return code;
};

// Rounding functions have a single operand.
Blockly.Arduino['math_round'] = Blockly.Arduino['math_single'];

// Trigonometry functions have a single operand.
Blockly.Arduino['math_trig'] = Blockly.Arduino['math_single'];

Blockly.Arduino['math_on_list'] = Blockly.Arduino.noGeneratorCodeInline;

Blockly.Arduino['math_modulo'] = function (block) {
    var argument0 = Blockly.Arduino.valueToCode(block, 'DIVIDEND',
        Blockly.Arduino.ORDER_MULTIPLICATIVE) || '0';
    var argument1 = Blockly.Arduino.valueToCode(block, 'DIVISOR',
        Blockly.Arduino.ORDER_MULTIPLICATIVE) || '0';
    var code = argument0 + ' % ' + argument1;
    return [code, Blockly.Arduino.ORDER_MULTIPLICATIVE];
};

Blockly.Arduino['math_constrain'] = function (block) {
    // Constrain a number between two limits.
    var argument0 = Blockly.Arduino.valueToCode(block, 'VALUE',
        Blockly.Arduino.ORDER_NONE) || '0';
    var argument1 = Blockly.Arduino.valueToCode(block, 'LOW',
        Blockly.Arduino.ORDER_NONE) || '0';
    var argument2 = Blockly.Arduino.valueToCode(block, 'HIGH',
        Blockly.Arduino.ORDER_NONE) || '0';
    var code = '(' + argument0 + ' < ' + argument1 + ' ? ' + argument1 +
        ' : ( ' + argument0 + ' > ' + argument2 + ' ? ' + argument2 + ' : ' +
        argument0 + '))';
    return [code, Blockly.Arduino.ORDER_UNARY_POSTFIX];
};

Blockly.Arduino['math_random_int'] = function (block) {
    var argument0 = Blockly.Arduino.valueToCode(block, 'FROM',
        Blockly.Arduino.ORDER_NONE) || '0';
    var argument1 = Blockly.Arduino.valueToCode(block, 'TO',
        Blockly.Arduino.ORDER_NONE) || '0';
    var functionName = Blockly.Arduino.nameDB_.getDistinctName(
        'math_random_int', Blockly.Generator.NAME_TYPE);
    Blockly.Arduino.math_random_int.random_function = functionName;
    var func = [
        'int ' + Blockly.Arduino.DEF_FUNC_NAME + '(int min, int max) {',
        '  if (min > max) {',
        '    // Swap min and max to ensure min is smaller.',
        '    int temp = min;',
        '    min = max;',
        '    max = temp;',
        '  }',
        '  return min + (rand() % (max - min + 1));',
        '}'];
    var funcName = Blockly.Arduino.addFunction('mathRandomInt', func.join('\n'));
    var code = funcName + '(' + argument0 + ', ' + argument1 + ')';
    return [code, Blockly.Arduino.ORDER_UNARY_POSTFIX];
};

Blockly.Arduino['math_random_float'] = function (block) {
    return ['(rand() / RAND_MAX)', Blockly.Arduino.ORDER_UNARY_POSTFIX];
};

Blockly.Arduino['math_atan2'] = function (block) {
    var argument0 = Blockly.Arduino.valueToCode(block, 'X',
        Blockly.Arduino.ORDER_NONE) || '0';
    var argument1 = Blockly.Arduino.valueToCode(block, 'Y',
        Blockly.Arduino.ORDER_NONE) || '0';
    return ['atan2(' + argument1 + ', ' + argument0 + ') / M_PI * 180',
        Blockly.Arduino.ORDER_MULTIPLICATIVE];
};