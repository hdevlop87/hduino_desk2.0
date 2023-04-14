import * as Blockly from 'blockly/core';
import '../../../ArduinoUtils/generator_ard_python';


Blockly.PyArduino['controls_repeat_ext'] = function(block) {
  // Repeat n times.
  if (block.getField('TIMES')) {
    // Internal number.
    var repeats = String(parseInt(block.getFieldValue('TIMES'), 10));
  } else {
    // External number.
    var repeats = Blockly.PyArduino.valueToCode(block, 'TIMES',
      Blockly.PyArduino.ORDER_NONE) || '0';
  }
  if (Blockly.isNumber(repeats)) {
    repeats = parseInt(repeats, 10);
  } else {
    repeats = 'int(' + repeats + ')';
  }
  var branch = Blockly.PyArduino.statementToCode(block, 'DO');
  branch = Blockly.PyArduino.addLoopTrap(branch, block) || Blockly.PyArduino.PASS;
  var loopVar = Blockly.PyArduino.nameDB_.getDistinctName(
      'count', Blockly.VARIABLE_CATEGORY_NAME);
  var code = 'for ' + loopVar + ' in range(' + repeats + '):\n' + branch;
  return code;
};

Blockly.PyArduino['controls_repeat'] = Blockly.PyArduino['controls_repeat_ext'];

Blockly.PyArduino['controls_whileUntil'] = function(block) {
  // Do while/until loop.
  var until = block.getFieldValue('MODE') == 'UNTIL';
  var argument0 = Blockly.PyArduino.valueToCode(block, 'BOOL',
    until ? Blockly.PyArduino.ORDER_LOGICAL_NOT :
        Blockly.PyArduino.ORDER_NONE) || 'False';
  var branch = Blockly.PyArduino.statementToCode(block, 'DO');
  branch = Blockly.PyArduino.addLoopTrap(branch, block) || Blockly.PyArduino.PASS;
  if (until) {
    argument0 = 'not ' + argument0;
  }
  return 'while ' + argument0 + ':\n' + branch;
};

Blockly.PyArduino['controls_for'] = function(block) {
  // For loop.
  var variable0 = Blockly.PyArduino.nameDB_.getName(
      block.getFieldValue('VAR'), Blockly.VARIABLE_CATEGORY_NAME);
  var argument0 = Blockly.PyArduino.valueToCode(block, 'FROM',
    Blockly.PyArduino.ORDER_NONE) || '0';
  var argument1 = Blockly.PyArduino.valueToCode(block, 'TO',
    Blockly.PyArduino.ORDER_NONE) || '0';
  var increment = Blockly.PyArduino.valueToCode(block, 'BY',
    Blockly.PyArduino.ORDER_NONE) || '1';
  var branch = Blockly.PyArduino.statementToCode(block, 'DO');
  branch = Blockly.PyArduino.addLoopTrap(branch, block) || Blockly.PyArduino.PASS;

  var code = '';
  var range;

  // Helper functions.
  var defineUpRange = function() {
    return Blockly.PyArduino.provideFunction_(
        'upRange',
      ['def ' + Blockly.PyArduino.FUNCTION_NAME_PLACEHOLDER_ +
            '(start, stop, step):',
         '  while start <= stop:',
         '    yield start',
         '    start += abs(step)']);
  };
  var defineDownRange = function() {
    return Blockly.PyArduino.provideFunction_(
        'downRange',
      ['def ' + Blockly.PyArduino.FUNCTION_NAME_PLACEHOLDER_ +
            '(start, stop, step):',
         '  while start >= stop:',
         '    yield start',
         '    start -= abs(step)']);
  };
  // Arguments are legal Python code (numbers or strings returned by scrub()).
  var generateUpDownRange = function(start, end, inc) {
    return '(' + start + ' <= ' + end + ') and ' +
        defineUpRange() + '(' + start + ', ' + end + ', ' + inc + ') or ' +
        defineDownRange() + '(' + start + ', ' + end + ', ' + inc + ')';
  };

  if (Blockly.isNumber(argument0) && Blockly.isNumber(argument1) &&
      Blockly.isNumber(increment)) {
    // All parameters are simple numbers.
    argument0 = Number(argument0);
    argument1 = Number(argument1);
    increment = Math.abs(Number(increment));
    if (argument0 % 1 === 0 && argument1 % 1 === 0 && increment % 1 === 0) {
      // All parameters are integers.
      if (argument0 <= argument1) {
        // Count up.
        argument1++;
        if (argument0 == 0 && increment == 1) {
          // If starting index is 0, omit it.
          range = argument1;
        } else {
          range = argument0 + ', ' + argument1;
        }
        // If increment isn't 1, it must be explicit.
        if (increment != 1) {
          range += ', ' + increment;
        }
      } else {
        // Count down.
        argument1--;
        range = argument0 + ', ' + argument1 + ', -' + increment;
      }
      range = 'range(' + range + ')';
    } else {
      // At least one of the parameters is not an integer.
      if (argument0 < argument1) {
        range = defineUpRange();
      } else {
        range = defineDownRange();
      }
      range += '(' + argument0 + ', ' + argument1 + ', ' + increment + ')';
    }
  } else {
    // Cache non-trivial values to variables to prevent repeated look-ups.
    var scrub = function(arg, suffix) {
      if (Blockly.isNumber(arg)) {
        // Simple number.
        arg = Number(arg);
      } else if (arg.match(/^\w+$/)) {
        // Variable.
        arg = 'float(' + arg + ')';
      } else {
        // It's complicated.
        var varName = Blockly.PyArduino.nameDB_.getDistinctName(
            variable0 + suffix, Blockly.VARIABLE_CATEGORY_NAME);
        code += varName + ' = float(' + arg + ')\n';
        arg = varName;
      }
      return arg;
    };
    var startVar = scrub(argument0, '_start');
    var endVar = scrub(argument1, '_end');
    var incVar = scrub(increment, '_inc');

    if (typeof startVar == 'number' && typeof endVar == 'number') {
      if (startVar < endVar) {
        range = defineUpRange();
      } else {
        range = defineDownRange();
      }
      range += '(' + startVar + ', ' + endVar + ', ' + incVar + ')';
    } else {
      // We cannot determine direction statically.
      range = generateUpDownRange(startVar, endVar, incVar);
    }
  }
  code += 'for ' + variable0 + ' in ' + range + ':\n' + branch;
  return code;
};

Blockly.PyArduino['controls_forEach'] = function(block) {
  // For each loop.
  var variable0 = Blockly.PyArduino.nameDB_.getName(
      block.getFieldValue('VAR'), Blockly.VARIABLE_CATEGORY_NAME);
  var argument0 = Blockly.PyArduino.valueToCode(block, 'LIST',
    Blockly.PyArduino.ORDER_RELATIONAL) || '[]';
  var branch = Blockly.PyArduino.statementToCode(block, 'DO');
  branch = Blockly.PyArduino.addLoopTrap(branch, block) || Blockly.PyArduino.PASS;
  var code = 'for ' + variable0 + ' in ' + argument0 + ':\n' + branch;
  return code;
};

Blockly.PyArduino['controls_flow_statements'] = function(block) {
  // Flow statements: continue, break.
  var xfix = '';
  if (Blockly.PyArduino.STATEMENT_PREFIX) {
    // Automatic prefix insertion is switched off for this block.  Add manually.
    xfix += Blockly.PyArduino.injectId(Blockly.PyArduino.STATEMENT_PREFIX, block);
  }
  if (Blockly.PyArduino.STATEMENT_SUFFIX) {
    // Inject any statement suffix here since the regular one at the end
    // will not get executed if the break/continue is triggered.
    xfix += Blockly.PyArduino.injectId(Blockly.PyArduino.STATEMENT_SUFFIX, block);
  }
  if (Blockly.PyArduino.STATEMENT_PREFIX) {
    var loop = Blockly.Constants.Loops
        .CONTROL_FLOW_IN_LOOP_CHECK_MIXIN.getSurroundLoop(block);
    if (loop && !loop.suppressPrefixSuffix) {
      // Inject loop's statement prefix here since the regular one at the end
      // of the loop will not get executed if 'continue' is triggered.
      // In the case of 'break', a prefix is needed due to the loop's suffix.
      xfix += Blockly.PyArduino.injectId(Blockly.PyArduino.STATEMENT_PREFIX, loop);
    }
  }
  switch (block.getFieldValue('FLOW')) {
    case 'BREAK':
      return xfix + 'break\n';
    case 'CONTINUE':
      return xfix + 'continue\n';
  }
  throw Error('Unknown flow statement.');
};
