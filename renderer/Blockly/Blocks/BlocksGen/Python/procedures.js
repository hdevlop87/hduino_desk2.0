import * as Blockly from 'blockly/core';
import '../../../ArduinoUtils/generator_ard_python';

Blockly.PyArduino['procedures_defreturn'] = function(block) {
  // Define a procedure with a return value.
  // First, add a 'global' statement for every variable that is not shadowed by
  // a local parameter.
  var globals = [];
  var workspace = block.workspace;
  var variables = Blockly.Variables.allUsedVarModels(workspace) || [];
  for (var i = 0, variable; (variable = variables[i]); i++) {
    var varName = variable.name;
    if (block.getVars().indexOf(varName) == -1) {
      globals.push(Blockly.PyArduino.nameDB_.getName(varName,
          Blockly.VARIABLE_CATEGORY_NAME));
    }
  }
  // Add developer variables.
  var devVarList = Blockly.Variables.allDeveloperVariables(workspace);
  for (var i = 0; i < devVarList.length; i++) {
    globals.push(Blockly.PyArduino.nameDB_.getName(devVarList[i],
        Blockly.Names.DEVELOPER_VARIABLE_TYPE));
  }

  globals = globals.length ?
      Blockly.PyArduino.INDENT + 'global ' + globals.join(', ') + '\n' : '';
  var funcName = Blockly.PyArduino.nameDB_.getName(
      block.getFieldValue('NAME'), Blockly.PROCEDURE_CATEGORY_NAME);
  var xfix1 = '';
  if (Blockly.PyArduino.STATEMENT_PREFIX) {
    xfix1 += Blockly.PyArduino.injectId(Blockly.PyArduino.STATEMENT_PREFIX, block);
  }
  if (Blockly.PyArduino.STATEMENT_SUFFIX) {
    xfix1 += Blockly.PyArduino.injectId(Blockly.PyArduino.STATEMENT_SUFFIX, block);
  }
  if (xfix1) {
    xfix1 = Blockly.PyArduino.prefixLines(xfix1, Blockly.PyArduino.INDENT);
  }
  var loopTrap = '';
  if (Blockly.PyArduino.INFINITE_LOOP_TRAP) {
    loopTrap = Blockly.PyArduino.prefixLines(
        Blockly.PyArduino.injectId(Blockly.PyArduino.INFINITE_LOOP_TRAP, block),
        Blockly.PyArduino.INDENT);
  }
  var branch = Blockly.PyArduino.statementToCode(block, 'STACK');
  var returnValue = Blockly.PyArduino.valueToCode(block, 'RETURN',
      Blockly.PyArduino.ORDER_NONE) || '';
  var xfix2 = '';
  if (branch && returnValue) {
    // After executing the function body, revisit this block for the return.
    xfix2 = xfix1;
  }
  if (returnValue) {
    returnValue = Blockly.PyArduino.INDENT + 'return ' + returnValue + '\n';
  } else if (!branch) {
    branch = Blockly.PyArduino.PASS;
  }
  var args = [];
  var variables = block.getVars();
  for (var i = 0; i < variables.length; i++) {
    args[i] = Blockly.PyArduino.nameDB_.getName(variables[i],
        Blockly.VARIABLE_CATEGORY_NAME);
  }
  var code = 'def ' + funcName + '(' + args.join(', ') + '):\n' +
      globals + xfix1 + loopTrap + branch + xfix2 + returnValue;
  code = Blockly.PyArduino.scrub_(block, code);
  // Add % so as not to collide with helper functions in definitions list.
  Blockly.PyArduino.definitions_['%' + funcName] = code;
  return null;
};

// Defining a procedure without a return value uses the same generator as
// a procedure with a return value.
Blockly.PyArduino['procedures_defnoreturn'] =
    Blockly.PyArduino['procedures_defreturn'];

Blockly.PyArduino['procedures_callreturn'] = function(block) {
  // Call a procedure with a return value.
  var funcName = Blockly.PyArduino.nameDB_.getName(block.getFieldValue('NAME'),
      Blockly.PROCEDURE_CATEGORY_NAME);
  var args = [];
  var variables = block.getVars();
  for (var i = 0; i < variables.length; i++) {
    args[i] = Blockly.PyArduino.valueToCode(block, 'ARG' + i,
        Blockly.PyArduino.ORDER_NONE) || 'None';
  }
  var code = funcName + '(' + args.join(', ') + ')';
  return [code, Blockly.PyArduino.ORDER_FUNCTION_CALL];
};

Blockly.PyArduino['procedures_callnoreturn'] = function(block) {
  // Call a procedure with no return value.
  // Generated code is for a function call as a statement is the same as a
  // function call as a value, with the addition of line ending.
  var tuple = Blockly.PyArduino['procedures_callreturn'](block);
  return tuple[0] + '\n';
};

Blockly.PyArduino['procedures_ifreturn'] = function(block) {
  // Conditionally return value from a procedure.
  var condition = Blockly.PyArduino.valueToCode(block, 'CONDITION',
      Blockly.PyArduino.ORDER_NONE) || 'False';
  var code = 'if ' + condition + ':\n';
  if (Blockly.PyArduino.STATEMENT_SUFFIX) {
    // Inject any statement suffix here since the regular one at the end
    // will not get executed if the return is triggered.
    code += Blockly.PyArduino.prefixLines(
        Blockly.PyArduino.injectId(Blockly.PyArduino.STATEMENT_SUFFIX, block),
        Blockly.PyArduino.INDENT);
  }
  if (block.hasReturnValue_) {
    var value = Blockly.PyArduino.valueToCode(block, 'VALUE',
        Blockly.PyArduino.ORDER_NONE) || 'None';
    code += Blockly.PyArduino.INDENT + 'return ' + value + '\n';
  } else {
    code += Blockly.PyArduino.INDENT + 'return\n';
  }
  return code;
};
