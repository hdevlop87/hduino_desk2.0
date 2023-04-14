import  Blockly from 'blockly'; 
import '../../../ArduinoUtils/generator_arduino'
import {javascriptGenerator} from 'blockly/javascript';


Blockly.Arduino.variables_get = function(block) {
  var code = Blockly.Arduino.nameDB_.getName(block.getFieldValue('VAR'), Blockly.Names.NameType.VARIABLE)
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.variables_set_type = function(block) {
  var argument0 = Blockly.Arduino.valueToCode(block, 'VARIABLE_SETTYPE_INPUT', Blockly.Arduino.ORDER_ASSIGNMENT) || '0';
  var varType = Blockly.Arduino.getArduinoType_(Blockly.Types[block.getFieldValue('VARIABLE_SETTYPE_TYPE')]);
  var code = '(' + varType + ')(' + argument0 + ')';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.variables_set = function(block) {
  var argument0 = Blockly.Arduino.valueToCode(block, 'VALUE', Blockly.Arduino.ORDER_ASSIGNMENT) || '0';
  var varName = Blockly.Arduino.nameDB_.getName(block.getFieldValue('VAR'), Blockly.Names.NameType.VARIABLE) 
  var varType = Blockly.Arduino.getArduinoType_(Blockly.Types.getChildBlockType(block));
  var code = varName + ' = ' + argument0 + ';\n';
  return code;
};

Blockly.Arduino.variables_const = function(block) {
  var argument0 = Blockly.Arduino.valueToCode(block, 'VALUE', Blockly.Arduino.ORDER_ASSIGNMENT) || '0';
  var varName = Blockly.Arduino.nameDB_.getName(block.getFieldValue('VAR'), Blockly.Names.NameType.VARIABLE)
  var typeBlock = Blockly.Arduino.getArduinoType_(Blockly.Types[block.getFieldValue('VARIABLE_SETTYPE_TYPE')]);
  Blockly.Arduino.variables_[varName] = typeBlock + ' ' + varName + ';';
  return '';
};

Blockly.Arduino['variables_set_init'] = function(block){
  var argument0 = Blockly.Arduino.valueToCode(block, 'VALUE', Blockly.Arduino.ORDER_ASSIGNMENT) || '0';
  var varName = Blockly.Arduino.nameDB_.getName(block.getFieldValue('VAR'), Blockly.Names.NameType.VARIABLE)
  var varType = Blockly.Arduino.getArduinoType_(Blockly.Types[block.getFieldValue('VARIABLE_SETTYPE_TYPE')]);

  Blockly.Arduino.variables_[varName] = varType + ' ' + varName + ' = ' + argument0 + ';';
  return '';
};

//======================================================================//
Blockly.Arduino['io_VarIN'] = function (block) { 
  var argument0 = block.getFieldValue('PIN') || '2';
  var varName = block.getFieldValue('VAR');

  var pinSetupCode = '  pinMode(' + varName + ', INPUT);';
  Blockly.Arduino.addSetup('io_' + varName, pinSetupCode, false);

  Blockly.Arduino.variables_[varName] = 'const int' + ' ' + varName + ' = ' + argument0 + ';';
  return '';
};
//======================================================================//
Blockly.Arduino['io_VarOut'] = function (block) {
  var argument0 = block.getFieldValue('PIN') || '2';
  var varName = block.getFieldValue('VAR');

  var pinSetupCode = '  pinMode(' + varName + ', OUTPUT);';
  Blockly.Arduino.addSetup('io_' + varName, pinSetupCode, false);

  Blockly.Arduino.variables_[varName] = 'const int' + ' ' + varName + ' = ' + argument0 + ';';
  return '';
};

Blockly.Arduino['io_2Var'] = function (block) { 
  var argument1 = block.getFieldValue('PIN0') || '2';
  var varName1 = block.getFieldValue('VAR0');
  var argument2 = block.getFieldValue('PIN1') || '3';
  var varName2 = block.getFieldValue('VAR1');
  Blockly.Arduino.variables_[varName1] = 'const int' + ' ' + varName1 + ' = ' + argument1 + ';';
  Blockly.Arduino.variables_[varName2] = 'const int' + ' ' + varName2 + ' = ' + argument2 + ';';
  return '';
};
