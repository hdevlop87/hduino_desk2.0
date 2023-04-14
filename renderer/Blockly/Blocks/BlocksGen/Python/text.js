import * as Blockly from 'blockly/core';
import '../../../ArduinoUtils/generator_ard_python';

Blockly.PyArduino['text'] = function(block) {
  // Text value.
  var code = Blockly.PyArduino.quote_(block.getFieldValue('TEXT'));
  return [code, Blockly.PyArduino.ORDER_ATOMIC];
};

Blockly.PyArduino['text_multiline'] = function(block) {
  // Text value.
  var code = Blockly.PyArduino.multiline_quote_(block.getFieldValue('TEXT'));
  var order = code.indexOf('+') != -1 ? Blockly.PyArduino.ORDER_ADDITIVE :
      Blockly.PyArduino.ORDER_ATOMIC;
  return [code, order];
};

/**
 * Enclose the provided value in 'str(...)' function.
 * Leave string literals alone.
 * @param {string} value Code evaluating to a value.
 * @return {[string, number]} Array containing code evaluating to a string and
 *    the order of the returned code.
 * @private
 */
Blockly.PyArduino.text.forceString_ = function(value) {
  if (Blockly.PyArduino.text.forceString_.strRegExp.test(value)) {
    return [value, Blockly.PyArduino.ORDER_ATOMIC];
  }
  return ['str(' + value + ')', Blockly.PyArduino.ORDER_FUNCTION_CALL];
};

/**
 * Regular expression to detect a single-quoted string literal.
 */
Blockly.PyArduino.text.forceString_.strRegExp = /^\s*'([^']|\\')*'\s*$/;

Blockly.PyArduino['text_join'] = function(block) {
  // Create a string made up of any number of elements of any type.
  //Should we allow joining by '-' or ',' or any other characters?
  switch (block.itemCount_) {
    case 0:
      return ['\'\'', Blockly.PyArduino.ORDER_ATOMIC];
      break;
    case 1:
      var element = Blockly.PyArduino.valueToCode(block, 'ADD0',
              Blockly.PyArduino.ORDER_NONE) || '\'\'';
      var codeAndOrder = Blockly.PyArduino.text.forceString_(element);
      return codeAndOrder;
      break;
    case 2:
      var element0 = Blockly.PyArduino.valueToCode(block, 'ADD0',
          Blockly.PyArduino.ORDER_NONE) || '\'\'';
      var element1 = Blockly.PyArduino.valueToCode(block, 'ADD1',
          Blockly.PyArduino.ORDER_NONE) || '\'\'';
      var code = Blockly.PyArduino.text.forceString_(element0)[0] + ' + ' +
          Blockly.PyArduino.text.forceString_(element1)[0];
      return [code, Blockly.PyArduino.ORDER_ADDITIVE];
      break;
    default:
      var elements = [];
      for (var i = 0; i < block.itemCount_; i++) {
        elements[i] = Blockly.PyArduino.valueToCode(block, 'ADD' + i,
                Blockly.PyArduino.ORDER_NONE) || '\'\'';
      }
      var tempVar = Blockly.PyArduino.nameDB_.getDistinctName('x',
          Blockly.VARIABLE_CATEGORY_NAME);
      var code = '\'\'.join([str(' + tempVar + ') for ' + tempVar + ' in [' +
          elements.join(', ') + ']])';
      return [code, Blockly.PyArduino.ORDER_FUNCTION_CALL];
  }
};

Blockly.PyArduino['text_append'] = function(block) {
  // Append to a variable in place.
  var varName = Blockly.PyArduino.nameDB_.getName(block.getFieldValue('VAR'),
      Blockly.VARIABLE_CATEGORY_NAME);
  var value = Blockly.PyArduino.valueToCode(block, 'TEXT',
      Blockly.PyArduino.ORDER_NONE) || '\'\'';
  return varName + ' = str(' + varName + ') + ' +
      Blockly.PyArduino.text.forceString_(value)[0] + '\n';
};

Blockly.PyArduino['text_length'] = function(block) {
  // Is the string null or array empty?
  var text = Blockly.PyArduino.valueToCode(block, 'VALUE',
      Blockly.PyArduino.ORDER_NONE) || '\'\'';
  return ['len(' + text + ')', Blockly.PyArduino.ORDER_FUNCTION_CALL];
};

Blockly.PyArduino['text_isEmpty'] = function(block) {
  // Is the string null or array empty?
  var text = Blockly.PyArduino.valueToCode(block, 'VALUE',
      Blockly.PyArduino.ORDER_NONE) || '\'\'';
  var code = 'not len(' + text + ')';
  return [code, Blockly.PyArduino.ORDER_LOGICAL_NOT];
};

Blockly.PyArduino['text_indexOf'] = function(block) {
  // Search the text for a substring.
  // Should we allow for non-case sensitive???
  var operator = block.getFieldValue('END') == 'FIRST' ? 'find' : 'rfind';
  var substring = Blockly.PyArduino.valueToCode(block, 'FIND',
      Blockly.PyArduino.ORDER_NONE) || '\'\'';
  var text = Blockly.PyArduino.valueToCode(block, 'VALUE',
      Blockly.PyArduino.ORDER_MEMBER) || '\'\'';
  var code = text + '.' + operator + '(' + substring + ')';
  if (block.workspace.options.oneBasedIndex) {
    return [code + ' + 1', Blockly.PyArduino.ORDER_ADDITIVE];
  }
  return [code, Blockly.PyArduino.ORDER_FUNCTION_CALL];
};

Blockly.PyArduino['text_charAt'] = function(block) {
  // Get letter at index.
  // Note: Until January 2013 this block did not have the WHERE input.
  var where = block.getFieldValue('WHERE') || 'FROM_START';
  var textOrder = (where == 'RANDOM') ? Blockly.PyArduino.ORDER_NONE :
      Blockly.PyArduino.ORDER_MEMBER;
  var text = Blockly.PyArduino.valueToCode(block, 'VALUE', textOrder) || '\'\'';
  switch (where) {
    case 'FIRST':
      var code = text + '[0]';
      return [code, Blockly.PyArduino.ORDER_MEMBER];
    case 'LAST':
      var code = text + '[-1]';
      return [code, Blockly.PyArduino.ORDER_MEMBER];
    case 'FROM_START':
      var at = Blockly.PyArduino.getAdjustedInt(block, 'AT');
      var code = text + '[' + at + ']';
      return [code, Blockly.PyArduino.ORDER_MEMBER];
    case 'FROM_END':
      var at = Blockly.PyArduino.getAdjustedInt(block, 'AT', 1, true);
      var code = text + '[' + at + ']';
      return [code, Blockly.PyArduino.ORDER_MEMBER];
    case 'RANDOM':
      Blockly.PyArduino.definitions_['import_random'] = 'import random';
      var functionName = Blockly.PyArduino.provideFunction_(
          'text_random_letter',
          ['def ' + Blockly.PyArduino.FUNCTION_NAME_PLACEHOLDER_ + '(text):',
           '  x = int(random.random() * len(text))',
           '  return text[x];']);
      code = functionName + '(' + text + ')';
      return [code, Blockly.PyArduino.ORDER_FUNCTION_CALL];
  }
  throw Error('Unhandled option (text_charAt).');
};

Blockly.PyArduino['text_getSubstring'] = function(block) {
  // Get substring.
  var where1 = block.getFieldValue('WHERE1');
  var where2 = block.getFieldValue('WHERE2');
  var text = Blockly.PyArduino.valueToCode(block, 'STRING',
      Blockly.PyArduino.ORDER_MEMBER) || '\'\'';
  switch (where1) {
    case 'FROM_START':
      var at1 = Blockly.PyArduino.getAdjustedInt(block, 'AT1');
      if (at1 == '0') {
        at1 = '';
      }
      break;
    case 'FROM_END':
      var at1 = Blockly.PyArduino.getAdjustedInt(block, 'AT1', 1, true);
      break;
    case 'FIRST':
      var at1 = '';
      break;
    default:
      throw Error('Unhandled option (text_getSubstring)');
  }
  switch (where2) {
    case 'FROM_START':
      var at2 = Blockly.PyArduino.getAdjustedInt(block, 'AT2', 1);
      break;
    case 'FROM_END':
      var at2 = Blockly.PyArduino.getAdjustedInt(block, 'AT2', 0, true);
      // Ensure that if the result calculated is 0 that sub-sequence will
      // include all elements as expected.
      if (!Blockly.isNumber(String(at2))) {
        Blockly.PyArduino.definitions_['import_sys'] = 'import sys';
        at2 += ' or sys.maxsize';
      } else if (at2 == '0') {
        at2 = '';
      }
      break;
    case 'LAST':
      var at2 = '';
      break;
    default:
      throw Error('Unhandled option (text_getSubstring)');
  }
  var code = text + '[' + at1 + ' : ' + at2 + ']';
  return [code, Blockly.PyArduino.ORDER_MEMBER];
};

Blockly.PyArduino['text_changeCase'] = function(block) {
  // Change capitalization.
  var OPERATORS = {
    'UPPERCASE': '.upper()',
    'LOWERCASE': '.lower()',
    'TITLECASE': '.title()'
  };
  var operator = OPERATORS[block.getFieldValue('CASE')];
  var text = Blockly.PyArduino.valueToCode(block, 'TEXT',
      Blockly.PyArduino.ORDER_MEMBER) || '\'\'';
  var code = text + operator;
  return [code, Blockly.PyArduino.ORDER_FUNCTION_CALL];
};

Blockly.PyArduino['text_trim'] = function(block) {
  // Trim spaces.
  var OPERATORS = {
    'LEFT': '.lstrip()',
    'RIGHT': '.rstrip()',
    'BOTH': '.strip()'
  };
  var operator = OPERATORS[block.getFieldValue('MODE')];
  var text = Blockly.PyArduino.valueToCode(block, 'TEXT',
      Blockly.PyArduino.ORDER_MEMBER) || '\'\'';
  var code = text + operator;
  return [code, Blockly.PyArduino.ORDER_FUNCTION_CALL];
};

Blockly.PyArduino['text_print'] = function(block) {
  // Print statement.
  var msg = Blockly.PyArduino.valueToCode(block, 'TEXT',
      Blockly.PyArduino.ORDER_NONE) || '\'\'';
  return 'print(' + msg + ')\n';
};

Blockly.PyArduino['text_prompt_ext'] = function(block) {
  // Prompt function.
  var functionName = Blockly.PyArduino.provideFunction_(
      'text_prompt',
      ['def ' + Blockly.PyArduino.FUNCTION_NAME_PLACEHOLDER_ + '(msg):',
       '  try:',
       '    return raw_input(msg)',
       '  except NameError:',
       '    return input(msg)']);
  if (block.getField('TEXT')) {
    // Internal message.
    var msg = Blockly.PyArduino.quote_(block.getFieldValue('TEXT'));
  } else {
    // External message.
    var msg = Blockly.PyArduino.valueToCode(block, 'TEXT',
        Blockly.PyArduino.ORDER_NONE) || '\'\'';
  }
  var code = functionName + '(' + msg + ')';
  var toNumber = block.getFieldValue('TYPE') == 'NUMBER';
  if (toNumber) {
    code = 'float(' + code + ')';
  }
  return [code, Blockly.PyArduino.ORDER_FUNCTION_CALL];
};

Blockly.PyArduino['text_prompt'] = Blockly.PyArduino['text_prompt_ext'];

Blockly.PyArduino['text_count'] = function(block) {
  var text = Blockly.PyArduino.valueToCode(block, 'TEXT',
      Blockly.PyArduino.ORDER_MEMBER) || '\'\'';
  var sub = Blockly.PyArduino.valueToCode(block, 'SUB',
      Blockly.PyArduino.ORDER_NONE) || '\'\'';
  var code = text + '.count(' + sub + ')';
  return [code, Blockly.PyArduino.ORDER_FUNCTION_CALL];
};

Blockly.PyArduino['text_replace'] = function(block) {
  var text = Blockly.PyArduino.valueToCode(block, 'TEXT',
      Blockly.PyArduino.ORDER_MEMBER) || '\'\'';
  var from = Blockly.PyArduino.valueToCode(block, 'FROM',
      Blockly.PyArduino.ORDER_NONE) || '\'\'';
  var to = Blockly.PyArduino.valueToCode(block, 'TO',
      Blockly.PyArduino.ORDER_NONE) || '\'\'';
  var code = text + '.replace(' + from + ', ' + to + ')';
  return [code, Blockly.PyArduino.ORDER_MEMBER];
};

Blockly.PyArduino['text_reverse'] = function(block) {
  var text = Blockly.PyArduino.valueToCode(block, 'TEXT',
      Blockly.PyArduino.ORDER_MEMBER) || '\'\'';
  var code = text + '[::-1]';
  return [code, Blockly.PyArduino.ORDER_MEMBER];
};
