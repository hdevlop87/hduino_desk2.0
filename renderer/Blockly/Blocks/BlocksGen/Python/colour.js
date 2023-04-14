import * as Blockly from 'blockly/core';
import '../../../ArduinoUtils/generator_ard_python';

Blockly.PyArduino['colour_picker'] = function(block) {
  // Colour picker.
  var code = Blockly.PyArduino.quote_(block.getFieldValue('COLOUR'));
  return [code, Blockly.PyArduino.ORDER_ATOMIC];
};

Blockly.PyArduino['colour_random'] = function(block) {
  // Generate a random colour.
  Blockly.PyArduino.definitions_['import_random'] = 'import random';
  var code = '\'#%06x\' % random.randint(0, 2**24 - 1)';
  return [code, Blockly.PyArduino.ORDER_FUNCTION_CALL];
};

Blockly.PyArduino['colour_rgb'] = function(block) {
  // Compose a colour from RGB components expressed as percentages.
  var functionName = Blockly.PyArduino.provideFunction_(
      'colour_rgb',
      ['def ' + Blockly.PyArduino.FUNCTION_NAME_PLACEHOLDER_ + '(r, g, b):',
       '  r = round(min(100, max(0, r)) * 2.55)',
       '  g = round(min(100, max(0, g)) * 2.55)',
       '  b = round(min(100, max(0, b)) * 2.55)',
       '  return \'#%02x%02x%02x\' % (r, g, b)']);
  var r = Blockly.PyArduino.valueToCode(block, 'RED',
                                     Blockly.PyArduino.ORDER_NONE) || 0;
  var g = Blockly.PyArduino.valueToCode(block, 'GREEN',
                                     Blockly.PyArduino.ORDER_NONE) || 0;
  var b = Blockly.PyArduino.valueToCode(block, 'BLUE',
                                     Blockly.PyArduino.ORDER_NONE) || 0;
  var code = functionName + '(' + r + ', ' + g + ', ' + b + ')';
  return [code, Blockly.PyArduino.ORDER_FUNCTION_CALL];
};

Blockly.PyArduino['colour_blend'] = function(block) {
  // Blend two colours together.
  var functionName = Blockly.PyArduino.provideFunction_(
      'colour_blend',
      ['def ' + Blockly.PyArduino.FUNCTION_NAME_PLACEHOLDER_ +
          '(colour1, colour2, ratio):',
       '  r1, r2 = int(colour1[1:3], 16), int(colour2[1:3], 16)',
       '  g1, g2 = int(colour1[3:5], 16), int(colour2[3:5], 16)',
       '  b1, b2 = int(colour1[5:7], 16), int(colour2[5:7], 16)',
       '  ratio = min(1, max(0, ratio))',
       '  r = round(r1 * (1 - ratio) + r2 * ratio)',
       '  g = round(g1 * (1 - ratio) + g2 * ratio)',
       '  b = round(b1 * (1 - ratio) + b2 * ratio)',
       '  return \'#%02x%02x%02x\' % (r, g, b)']);
  var colour1 = Blockly.PyArduino.valueToCode(block, 'COLOUR1',
      Blockly.PyArduino.ORDER_NONE) || '\'#000000\'';
  var colour2 = Blockly.PyArduino.valueToCode(block, 'COLOUR2',
      Blockly.PyArduino.ORDER_NONE) || '\'#000000\'';
  var ratio = Blockly.PyArduino.valueToCode(block, 'RATIO',
      Blockly.PyArduino.ORDER_NONE) || 0;
  var code = functionName + '(' + colour1 + ', ' + colour2 + ', ' + ratio + ')';
  return [code, Blockly.PyArduino.ORDER_FUNCTION_CALL];
};
