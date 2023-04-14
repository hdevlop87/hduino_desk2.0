import * as Blockly from 'blockly/core';
import '../../../ArduinoUtils/generator_ard_python';

Blockly.PyArduino['controls_if'] = function(block) {
  var n = 0;
  var code = '', branchCode, conditionCode;
  if (Blockly.PyArduino.STATEMENT_PREFIX) {
    code += Blockly.PyArduino.injectId(Blockly.PyArduino.STATEMENT_PREFIX, block);
  }
  do {
    conditionCode = Blockly.PyArduino.valueToCode(block, 'IF' + n,
      Blockly.PyArduino.ORDER_NONE) || 'False';
    branchCode = Blockly.PyArduino.statementToCode(block, 'DO' + n) ||
      Blockly.PyArduino.PASS;
    if (Blockly.PyArduino.STATEMENT_SUFFIX) {
      branchCode = Blockly.PyArduino.prefixLines(
        Blockly.PyArduino.injectId(Blockly.PyArduino.STATEMENT_SUFFIX, block),
          Blockly.PyArduino.INDENT) + branchCode;
    }
    code += (n == 0 ? 'if ' : 'elif ') + conditionCode + ':\n' + branchCode;
    ++n;
  } while (block.getInput('IF' + n));

  if (block.getInput('ELSE') || Blockly.PyArduino.STATEMENT_SUFFIX) {
    branchCode = Blockly.PyArduino.statementToCode(block, 'ELSE') ||
      Blockly.PyArduino.PASS;
    if (Blockly.PyArduino.STATEMENT_SUFFIX) {
      branchCode = Blockly.PyArduino.prefixLines(
        Blockly.PyArduino.injectId(Blockly.PyArduino.STATEMENT_SUFFIX, block),
        Blockly.PyArduino.INDENT) + branchCode;
    }
    code += 'else:\n' + branchCode;
  }
  return code;
};

Blockly.PyArduino['controls_ifelse'] = Blockly.Python['controls_if'];

Blockly.PyArduino['logic_compare'] = function(block) {
  // Comparison operator.
  var OPERATORS = {
    'EQ': '==',
    'NEQ': '!=',
    'LT': '<',
    'LTE': '<=',
    'GT': '>',
    'GTE': '>='
  };
  var operator = OPERATORS[block.getFieldValue('OP')];
  var order = Blockly.PyArduino.ORDER_RELATIONAL;
  var argument0 = Blockly.PyArduino.valueToCode(block, 'A', order) || '0';
  var argument1 = Blockly.PyArduino.valueToCode(block, 'B', order) || '0';
  var code = argument0 + ' ' + operator + ' ' + argument1;
  return [code, order];
};

Blockly.PyArduino['logic_operation'] = function(block) {
  // Operations 'and', 'or'.
  var operator = (block.getFieldValue('OP') == 'AND') ? 'and' : 'or';
  var order = (operator == 'and') ? Blockly.PyArduino.ORDER_LOGICAL_AND :
    Blockly.PyArduino.ORDER_LOGICAL_OR;
  var argument0 = Blockly.PyArduino.valueToCode(block, 'A', order);
  var argument1 = Blockly.PyArduino.valueToCode(block, 'B', order);
  if (!argument0 && !argument1) {
    // If there are no arguments, then the return value is false.
    argument0 = 'False';
    argument1 = 'False';
  } else {
    // Single missing arguments have no effect on the return value.
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

Blockly.PyArduino['logic_negate'] = function(block) {
  // Negation.
  var argument0 = Blockly.PyArduino.valueToCode(block, 'BOOL',
    Blockly.PyArduino.ORDER_LOGICAL_NOT) || 'True';
  var code = 'not ' + argument0;
  return [code, Blockly.PyArduino.ORDER_LOGICAL_NOT];
};

Blockly.PyArduino['logic_boolean'] = function(block) {
  // Boolean values true and false.
  var code = (block.getFieldValue('BOOL') == 'TRUE') ? 'True' : 'False';
  return [code, Blockly.PyArduino.ORDER_ATOMIC];
};

Blockly.PyArduino['logic_null'] = function(block) {
  // Null data type.
  return ['None', Blockly.PyArduino.ORDER_ATOMIC];
};

Blockly.PyArduino['logic_ternary'] = function(block) {
  // Ternary operator.
  var value_if = Blockly.PyArduino.valueToCode(block, 'IF',
    Blockly.PyArduino.ORDER_CONDITIONAL) || 'False';
  var value_then = Blockly.PyArduino.valueToCode(block, 'THEN',
    Blockly.PyArduino.ORDER_CONDITIONAL) || 'None';
  var value_else = Blockly.PyArduino.valueToCode(block, 'ELSE',
    Blockly.PyArduino.ORDER_CONDITIONAL) || 'None';
  var code = value_then + ' if ' + value_if + ' else ' + value_else;
  return [code, Blockly.PyArduino.ORDER_CONDITIONAL];
};
