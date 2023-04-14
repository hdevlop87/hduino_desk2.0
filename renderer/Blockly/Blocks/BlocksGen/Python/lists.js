import * as Blockly from 'blockly/core';
import '../../../ArduinoUtils/generator_ard_python';

Blockly.PyArduino['lists_create_empty'] = function(block) {
  // Create an empty list.
  return ['[]', Blockly.PyArduino.ORDER_ATOMIC];
};

Blockly.PyArduino['lists_create_with'] = function(block) {
  // Create a list with any number of elements of any type.
  var elements = new Array(block.itemCount_);
  for (var i = 0; i < block.itemCount_; i++) {
    elements[i] = Blockly.PyArduino.valueToCode(block, 'ADD' + i,
        Blockly.PyArduino.ORDER_NONE) || 'None';
  }
  var code = '[' + elements.join(', ') + ']';
  return [code, Blockly.PyArduino.ORDER_ATOMIC];
};

Blockly.PyArduino['lists_repeat'] = function(block) {
  // Create a list with one element repeated.
  var item = Blockly.PyArduino.valueToCode(block, 'ITEM',
      Blockly.PyArduino.ORDER_NONE) || 'None';
  var times = Blockly.PyArduino.valueToCode(block, 'NUM',
      Blockly.PyArduino.ORDER_MULTIPLICATIVE) || '0';
  var code = '[' + item + '] * ' + times;
  return [code, Blockly.PyArduino.ORDER_MULTIPLICATIVE];
};

Blockly.PyArduino['lists_length'] = function(block) {
  // String or array length.
  var list = Blockly.PyArduino.valueToCode(block, 'VALUE',
      Blockly.PyArduino.ORDER_NONE) || '[]';
  return ['len(' + list + ')', Blockly.PyArduino.ORDER_FUNCTION_CALL];
};

Blockly.PyArduino['lists_isEmpty'] = function(block) {
  // Is the string null or array empty?
  var list = Blockly.PyArduino.valueToCode(block, 'VALUE',
      Blockly.PyArduino.ORDER_NONE) || '[]';
  var code = 'not len(' + list + ')';
  return [code, Blockly.PyArduino.ORDER_LOGICAL_NOT];
};

Blockly.PyArduino['lists_indexOf'] = function(block) {
  // Find an item in the list.
  var item = Blockly.PyArduino.valueToCode(block, 'FIND',
      Blockly.PyArduino.ORDER_NONE) || '[]';
  var list = Blockly.PyArduino.valueToCode(block, 'VALUE',
      Blockly.PyArduino.ORDER_NONE) || '\'\'';
  if (block.workspace.options.oneBasedIndex) {
    var errorIndex = ' 0';
    var firstIndexAdjustment = ' + 1';
    var lastIndexAdjustment = '';
  } else {
    var errorIndex = ' -1';
    var firstIndexAdjustment = '';
    var lastIndexAdjustment = ' - 1';
  }
  if (block.getFieldValue('END') == 'FIRST') {
    var functionName = Blockly.PyArduino.provideFunction_(
        'first_index',
        ['def ' + Blockly.PyArduino.FUNCTION_NAME_PLACEHOLDER_ +
            '(my_list, elem):',
         '  try: index = my_list.index(elem)' + firstIndexAdjustment,
         '  except: index =' + errorIndex,
         '  return index']);
    var code = functionName + '(' + list + ', ' + item + ')';
    return [code, Blockly.PyArduino.ORDER_FUNCTION_CALL];
  }
  var functionName = Blockly.PyArduino.provideFunction_(
      'last_index',
      ['def ' + Blockly.PyArduino.FUNCTION_NAME_PLACEHOLDER_ + '(my_list, elem):',
       '  try: index = len(my_list) - my_list[::-1].index(elem)' +
         lastIndexAdjustment,
       '  except: index =' + errorIndex,
       '  return index']);
  var code = functionName + '(' + list + ', ' + item + ')';
  return [code, Blockly.PyArduino.ORDER_FUNCTION_CALL];
};

Blockly.PyArduino['lists_getIndex'] = function(block) {
  // Get element at index.
  // Note: Until January 2013 this block did not have MODE or WHERE inputs.
  var mode = block.getFieldValue('MODE') || 'GET';
  var where = block.getFieldValue('WHERE') || 'FROM_START';
  var listOrder = (where == 'RANDOM') ? Blockly.PyArduino.ORDER_NONE :
      Blockly.PyArduino.ORDER_MEMBER;
  var list = Blockly.PyArduino.valueToCode(block, 'VALUE', listOrder) || '[]';

  switch (where) {
    case 'FIRST':
      if (mode == 'GET') {
        var code = list + '[0]';
        return [code, Blockly.PyArduino.ORDER_MEMBER];
      } else if (mode == 'GET_REMOVE') {
        var code = list + '.pop(0)';
        return [code, Blockly.PyArduino.ORDER_FUNCTION_CALL];
      } else if (mode == 'REMOVE') {
        return list + '.pop(0)\n';
      }
      break;
    case 'LAST':
      if (mode == 'GET') {
        var code = list + '[-1]';
        return [code, Blockly.PyArduino.ORDER_MEMBER];
      } else if (mode == 'GET_REMOVE') {
        var code = list + '.pop()';
        return [code, Blockly.PyArduino.ORDER_FUNCTION_CALL];
      } else if (mode == 'REMOVE') {
        return list + '.pop()\n';
      }
      break;
    case 'FROM_START':
      var at = Blockly.PyArduino.getAdjustedInt(block, 'AT');
      if (mode == 'GET') {
        var code = list + '[' + at + ']';
        return [code, Blockly.PyArduino.ORDER_MEMBER];
      } else if (mode == 'GET_REMOVE') {
        var code = list + '.pop(' + at + ')';
        return [code, Blockly.PyArduino.ORDER_FUNCTION_CALL];
      } else if (mode == 'REMOVE') {
        return list + '.pop(' + at + ')\n';
      }
      break;
    case'FROM_END':
      var at = Blockly.PyArduino.getAdjustedInt(block, 'AT', 1, true);
      if (mode == 'GET') {
        var code = list + '[' + at + ']';
        return [code, Blockly.PyArduino.ORDER_MEMBER];
      } else if (mode == 'GET_REMOVE') {
        var code = list + '.pop(' + at + ')';
        return [code, Blockly.PyArduino.ORDER_FUNCTION_CALL];
      } else if (mode == 'REMOVE') {
        return list + '.pop(' + at + ')\n';
      }
      break;
    case 'RANDOM':
      Blockly.PyArduino.definitions_['import_random'] = 'import random';
      if (mode == 'GET') {
        code = 'random.choice(' + list + ')';
        return [code, Blockly.PyArduino.ORDER_FUNCTION_CALL];
      } else {
        var functionName = Blockly.PyArduino.provideFunction_(
            'lists_remove_random_item',
            ['def ' + Blockly.PyArduino.FUNCTION_NAME_PLACEHOLDER_ + '(myList):',
              '  x = int(random.random() * len(myList))',
              '  return myList.pop(x)']);
        code = functionName + '(' + list + ')';
        if (mode == 'GET_REMOVE') {
          return [code, Blockly.PyArduino.ORDER_FUNCTION_CALL];
        } else if (mode == 'REMOVE') {
          return code + '\n';
        }
      }
      break;
  }
  throw Error('Unhandled combination (lists_getIndex).');
};

Blockly.PyArduino['lists_setIndex'] = function(block) {
  // Set element at index.
  // Note: Until February 2013 this block did not have MODE or WHERE inputs.
  var list = Blockly.PyArduino.valueToCode(block, 'LIST',
      Blockly.PyArduino.ORDER_MEMBER) || '[]';
  var mode = block.getFieldValue('MODE') || 'GET';
  var where = block.getFieldValue('WHERE') || 'FROM_START';
  var value = Blockly.PyArduino.valueToCode(block, 'TO',
      Blockly.PyArduino.ORDER_NONE) || 'None';
  // Cache non-trivial values to variables to prevent repeated look-ups.
  // Closure, which accesses and modifies 'list'.
  function cacheList() {
    if (list.match(/^\w+$/)) {
      return '';
    }
    var listVar = Blockly.PyArduino.nameDB_.getDistinctName(
        'tmp_list', Blockly.VARIABLE_CATEGORY_NAME);
    var code = listVar + ' = ' + list + '\n';
    list = listVar;
    return code;
  }

  switch (where) {
    case 'FIRST':
      if (mode == 'SET') {
        return list + '[0] = ' + value + '\n';
      } else if (mode == 'INSERT') {
        return list + '.insert(0, ' + value + ')\n';
      }
      break;
    case 'LAST':
        if (mode == 'SET') {
          return list + '[-1] = ' + value + '\n';
        } else if (mode == 'INSERT') {
          return list + '.append(' + value + ')\n';
        }
      break;
    case 'FROM_START':
      var at = Blockly.PyArduino.getAdjustedInt(block, 'AT');
        if (mode == 'SET') {
          return list + '[' + at + '] = ' + value + '\n';
        } else if (mode == 'INSERT') {
          return list + '.insert(' + at + ', ' + value + ')\n';
        }
      break;
    case 'FROM_END':
      var at = Blockly.PyArduino.getAdjustedInt(block, 'AT', 1, true);
        if (mode == 'SET') {
          return list + '[' + at + '] = ' + value + '\n';
        } else if (mode == 'INSERT') {
          return list + '.insert(' + at + ', ' + value + ')\n';
        }
      break;
    case 'RANDOM':
        Blockly.PyArduino.definitions_['import_random'] = 'import random';
        var code = cacheList();
        var xVar = Blockly.PyArduino.nameDB_.getDistinctName(
            'tmp_x', Blockly.VARIABLE_CATEGORY_NAME);
        code += xVar + ' = int(random.random() * len(' + list + '))\n';
        if (mode == 'SET') {
          code += list + '[' + xVar + '] = ' + value + '\n';
          return code;
        } else if (mode == 'INSERT') {
          code += list + '.insert(' + xVar + ', ' + value + ')\n';
          return code;
        }
      break;
  }
  throw Error('Unhandled combination (lists_setIndex).');
};

Blockly.PyArduino['lists_getSublist'] = function(block) {
  // Get sublist.
  var list = Blockly.PyArduino.valueToCode(block, 'LIST',
      Blockly.PyArduino.ORDER_MEMBER) || '[]';
  var where1 = block.getFieldValue('WHERE1');
  var where2 = block.getFieldValue('WHERE2');
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
      throw Error('Unhandled option (lists_getSublist)');
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
      throw Error('Unhandled option (lists_getSublist)');
  }
  var code = list + '[' + at1 + ' : ' + at2 + ']';
  return [code, Blockly.PyArduino.ORDER_MEMBER];
};

Blockly.PyArduino['lists_sort'] = function(block) {
  // Block for sorting a list.
  var list = (Blockly.PyArduino.valueToCode(block, 'LIST',
      Blockly.PyArduino.ORDER_NONE) || '[]');
  var type = block.getFieldValue('TYPE');
  var reverse = block.getFieldValue('DIRECTION') === '1' ? 'False' : 'True';
  var sortFunctionName = Blockly.PyArduino.provideFunction_('lists_sort',
  ['def ' + Blockly.PyArduino.FUNCTION_NAME_PLACEHOLDER_ +
      '(my_list, type, reverse):',
    '  def try_float(s):',
    '    try:',
    '      return float(s)',
    '    except:',
    '      return 0',
    '  key_funcs = {',
    '    "NUMERIC": try_float,',
    '    "TEXT": str,',
    '    "IGNORE_CASE": lambda s: str(s).lower()',
    '  }',
    '  key_func = key_funcs[type]',
    '  list_cpy = list(my_list)', // Clone the list.
    '  return sorted(list_cpy, key=key_func, reverse=reverse)'
  ]);

  var code = sortFunctionName +
      '(' + list + ', "' + type + '", ' + reverse + ')';
  return [code, Blockly.PyArduino.ORDER_FUNCTION_CALL];
};

Blockly.PyArduino['lists_split'] = function(block) {
  // Block for splitting text into a list, or joining a list into text.
  var mode = block.getFieldValue('MODE');
  if (mode == 'SPLIT') {
    var value_input = Blockly.PyArduino.valueToCode(block, 'INPUT',
        Blockly.PyArduino.ORDER_MEMBER) || '\'\'';
    var value_delim = Blockly.PyArduino.valueToCode(block, 'DELIM',
        Blockly.PyArduino.ORDER_NONE);
    var code = value_input + '.split(' + value_delim + ')';
  } else if (mode == 'JOIN') {
    var value_input = Blockly.PyArduino.valueToCode(block, 'INPUT',
        Blockly.PyArduino.ORDER_NONE) || '[]';
    var value_delim = Blockly.PyArduino.valueToCode(block, 'DELIM',
        Blockly.PyArduino.ORDER_MEMBER) || '\'\'';
    var code = value_delim + '.join(' + value_input + ')';
  } else {
    throw Error('Unknown mode: ' + mode);
  }
  return [code, Blockly.PyArduino.ORDER_FUNCTION_CALL];
};

Blockly.PyArduino['lists_reverse'] = function(block) {
  // Block for reversing a list.
  var list = Blockly.PyArduino.valueToCode(block, 'LIST',
      Blockly.PyArduino.ORDER_NONE) || '[]';
  var code = 'list(reversed(' + list + '))';
  return [code, Blockly.PyArduino.ORDER_FUNCTION_CALL];
};
