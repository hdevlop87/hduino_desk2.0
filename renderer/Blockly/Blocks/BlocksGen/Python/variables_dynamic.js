import * as Blockly from 'blockly/core';
import '../../../ArduinoUtils/generator_ard_python';

// PyArduino is dynamically typed.
Blockly.PyArduino['variables_get_dynamic'] = Blockly.PyArduino['variables_get'];
Blockly.PyArduino['variables_set_dynamic'] = Blockly.PyArduino['variables_set'];
