import * as Blockly from 'blockly/core';
import '../../../ArduinoUtils/generator_ard_python';

Blockly.PyArduino['variables_get'] = function (block) {
  var code = Blockly.PyArduino.nameDB_.getName(block.getFieldValue('VAR'), Blockly.VARIABLE_CATEGORY_NAME);
  return [code, Blockly.PyArduino.ORDER_ATOMIC];
};

Blockly.PyArduino['variables_set'] = function (block) {
  var argument0 = Blockly.PyArduino.valueToCode(block, 'VALUE', Blockly.PyArduino.ORDER_NONE) || '0';
  var varName = Blockly.PyArduino.nameDB_.getName(block.getFieldValue('VAR'), Blockly.VARIABLE_CATEGORY_NAME);
  return varName + ' = ' + argument0 + '\n';
};

Blockly.PyArduino['variables_set_type'] = function (block) {
  var argument0 = Blockly.PyArduino.valueToCode(block, 'VARIABLE_SETTYPE_INPUT', Blockly.PyArduino.ORDER_NONE) || '0';
  var varType = Blockly.PyArduino.getArduinoType_(Blockly.Types[block.getFieldValue('VARIABLE_SETTYPE_TYPE')]);
  var code = '(' + varType + ')(' + argument0 + ')';
  return [code, Blockly.PyArduino.ORDER_ATOMIC];
};

Blockly.PyArduino['variables_set_init'] = function (block) {
  var argument0 = Blockly.PyArduino.valueToCode(block, 'VALUE', Blockly.PyArduino.ORDER_NONE) || '0';
  var varName = Blockly.PyArduino.nameDB_.getName(block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
  var varType = Blockly.PyArduino.getArduinoType_(Blockly.Types[block.getFieldValue('VARIABLE_SETTYPE_TYPE')]);

  Blockly.PyArduino.variables_[varName] = varType + ' ' + varName + ' = ' + argument0 + ';';
  return '';
};

Blockly.PyArduino.variables_const = function (block) {
  var argument0 = Blockly.PyArduino.valueToCode(block, 'VALUE', Blockly.PyArduino.ORDER_NONE) || '0';
  var varName = Blockly.PyArduino.nameDB_.getName(block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
  var typeBlock = Blockly.PyArduino.getArduinoType_(Blockly.Types[block.getFieldValue('VARIABLE_SETTYPE_TYPE')]);
  Blockly.PyArduino.variables_[varName] = typeBlock + ' ' + varName + ';';
  return '';
};

//======================================================================//
Blockly.PyArduino['io_VarIN'] = function (block) {
  var argument0 = block.getFieldValue('PIN') || '2';
  var varName = block.getFieldValue('VAR');

  var pinSetupCode = `  ${varName}.mode = pyfirmata.INPUT`;
  Blockly.PyArduino.addSetup('io_' + varName, pinSetupCode, false);

  Blockly.PyArduino.variables_[varName] = `${varName} = board.digital[${argument0}]`;
  return '';
};
//======================================================================//
Blockly.PyArduino['io_VarOut'] = function (block) {
  var argument0 = block.getFieldValue('PIN') || '2';
  var varName = block.getFieldValue('VAR');

  var pinSetupCode = `  ${varName}.mode = pyfirmata.OUTPUT`;
  Blockly.PyArduino.addSetup('io_' + varName, pinSetupCode, false);

  Blockly.PyArduino.variables_[varName] = `${varName} = board.digital[${argument0}]`;
  return '';
};
//======================================================================//
Blockly.PyArduino['io_2Var'] = function (block) {
  var argument1 = block.getFieldValue('PIN0') || '2';
  var varName1 = block.getFieldValue('VAR0');
  var argument2 = block.getFieldValue('PIN1') || '3';
  var varName2 = block.getFieldValue('VAR1');
  Blockly.PyArduino.variables_[varName1] = 'const int' + ' ' + varName1 + ' = ' + argument1 + ';';
  Blockly.PyArduino.variables_[varName2] = 'const int' + ' ' + varName2 + ' = ' + argument2 + ';';
  return '';
};