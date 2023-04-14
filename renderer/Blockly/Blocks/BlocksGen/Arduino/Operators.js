import  Blockly from 'blockly/core';
import '../../../ArduinoUtils/generator_arduino'
//============================================================================================================//
Blockly.Arduino['logic_boolean'] = function (block) {
    var code = (block.getFieldValue('BOOL') == 'TRUE') ? 'true' : 'false';
    return [code, Blockly.Arduino.ORDER_ATOMIC];
};
//============================================================================================================//
Blockly.Arduino['logic_operation_AND'] = function (block) {
    var argument0 = Blockly.Arduino.valueToCode(block, 'A', Blockly.Arduino.ORDER_ATOMIC);
    var argument1 = Blockly.Arduino.valueToCode(block, 'B', Blockly.Arduino.ORDER_ATOMIC);
    if (!argument0 && !argument1) {
        argument0 = 'false'; 
        argument1 = 'false';
    }
    var code = argument0 + ' ' + '&&' + ' ' + argument1;
    return [code];
};
//============================================================================================================//
Blockly.Arduino['logic_operation_OR'] = function (block) {
    var argument0 = Blockly.Arduino.valueToCode(block, 'A', Blockly.Arduino.ORDER_LOGICAL_OR);
    var argument1 = Blockly.Arduino.valueToCode(block, 'B', Blockly.Arduino.ORDER_LOGICAL_OR);
    if (!argument0 && !argument1) {
        argument0 = 'false';
        argument1 = 'false';
    }
    var code = argument0 + ' ' + '||' + ' ' + argument1;
    return [code];
};
//============================================================================================================//
Blockly.Arduino['logic_operation'] = function (block) {
    var operator = (block.getFieldValue('OP') == 'AND') ? 'and' : 'or';
    var order = (operator == 'and') ? Blockly.PyArduino.ORDER_LOGICAL_AND :
        Blockly.PyArduino.ORDER_LOGICAL_OR;
    var argument0 = Blockly.Arduino.valueToCode(block, 'A', Blockly.Arduino.ORDER_LOGICAL_OR);
    var argument1 = Blockly.Arduino.valueToCode(block, 'B', Blockly.Arduino.ORDER_LOGICAL_OR);
    
    if (!argument0 && !argument1) {
        argument0 = 'False';
        argument1 = 'False';
    } else {
        var defaultArgument = (operator == 'and') ? 'True' : 'False';
        if (!argument0) {
            argument0 = defaultArgument;
        }
        if (!argument1) {
            argument1 = defaultArgument;
        }
    }
    var code = argument0 + ' ' + operator + ' ' + argument1;
    return [code, order];
};
//============================================================================================================//
Blockly.Arduino['logic_compare'] = function (block) {
    var OPERATORS = {
        'EQ': '==', 
        'NEQ': '!=',
        'LT': '<',
        'LTE': '<=',
        'GT': '>',
        'GTE': '>='
    };
    var operator = OPERATORS[block.getFieldValue('OP')];
    var order = (operator == '==' || operator == '!=') ?
        Blockly.Arduino.ORDER_EQUALITY : Blockly.Arduino.ORDER_RELATIONAL;
    var argument0 = Blockly.Arduino.valueToCode(block, 'A', order) || '0';
    var argument1 = Blockly.Arduino.valueToCode(block, 'B', order) || '0';
    var code = argument0 + ' ' + operator + ' ' + argument1;
    return [code, order];
};
//============================================================================================================//
Blockly.Arduino['logic_negate'] = function (block) {
    var order = Blockly.Arduino.ORDER_UNARY_PREFIX;
    var argument0 = Blockly.Arduino.valueToCode(block, 'BOOL', order) || 'false';
    var code = '!' + argument0;
    return [code, order];
};
//============================================================================================================//
Blockly.Arduino['logic_null'] = function (block) {
    var code = 'NULL';
    return [code, Blockly.Arduino.ORDER_ATOMIC];
};
//============================================================================================================//
Blockly.Arduino['logic_ternary'] = function (block) {
    var valueIf = Blockly.Arduino.valueToCode(block, 'IF',
        Blockly.Arduino.ORDER_CONDITIONAL) || 'false';
    var valueThen = Blockly.Arduino.valueToCode(block, 'THEN',
        Blockly.Arduino.ORDER_CONDITIONAL) || 'null';
    var valueElse = Blockly.Arduino.valueToCode(block, 'ELSE',
        Blockly.Arduino.ORDER_CONDITIONAL) || 'null';
    var code = valueIf + ' ? ' + valueThen + ' : ' + valueElse;
    return [code, Blockly.Arduino.ORDER_CONDITIONAL];
};