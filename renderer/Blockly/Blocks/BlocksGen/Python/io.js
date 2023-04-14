import * as Blockly from 'blockly/core';
import '../../../ArduinoUtils/generator_ard_python';
//======================================================================//
Blockly.PyArduino['io_digitalwrite_Var'] = function (block) {
    var pin = Blockly.PyArduino.valueToCode(block, 'VAR', Blockly.PyArduino.ORDER_ATOMIC);
    var stateOutput = block.getFieldValue('STATE') || 'LOW';
    if (stateOutput == "HIGH") stateOutput = 1
    else stateOutput = 0

    var pinSetupCode = `  ${pin}.mode = pyfirmata.OUTPUT`;
    Blockly.PyArduino.addSetup('io_' + pin, pinSetupCode, false);
    var code =`${pin}.write(${stateOutput})\n`;
    return code;
};
//======================================================================//
Blockly.PyArduino['io_digitalwrite'] = function (block) {
    var pin = block.getFieldValue('PIN');
    var stateOutput = Blockly.PyArduino.valueToCode(
        block, 'STATE', Blockly.PyArduino.ORDER_ATOMIC) || 'LOW';
    Blockly.PyArduino.reservePin(
        block, pin, Blockly.PyArduino.PinTypes.OUTPUT, 'Digital Write');
    var pinSetupCode = 'pinMode(' + pin + ', OUTPUT);';
    Blockly.PyArduino.addSetup('io_' + pin, pinSetupCode, false);
    var code = 'digitalWrite(' + pin + ', ' + stateOutput + ');';
    return code;
};
//======================================================================//
Blockly.PyArduino['io_digitalreadVar'] = function (block) {
    var pin = block.getFieldValue('VAR');
    Blockly.PyArduino.reservePin(block, pin, Blockly.PyArduino.PinTypes.INPUT, 'Digital Read');
    var pinSetupCode = 'pinMode(' + pin + ', INPUT);';
    Blockly.PyArduino.addSetup('io_' + pin, pinSetupCode, false);
    var code = 'digitalRead(' + pin + ')';
    return [code, Blockly.PyArduino.ORDER_ATOMIC];
};
//======================================================================//
Blockly.PyArduino['io_digitalread'] = function (block) {
    var pin = block.getFieldValue('PIN');
    Blockly.PyArduino.reservePin(
        block, pin, Blockly.PyArduino.PinTypes.INPUT, 'Digital Read');
    var pinSetupCode = 'pinMode(' + pin + ', INPUT);';
    Blockly.PyArduino.addSetup('io_' + pin, pinSetupCode, false);
    var code = 'digitalRead(' + pin + ')';
    return [code, Blockly.PyArduino.ORDER_ATOMIC];
};
//======================================================================//
Blockly.PyArduino['io_builtin_led'] = function (block) {
    var pin = block.getFieldValue('BUILT_IN_LED');
    var stateOutput = Blockly.PyArduino.valueToCode(
        block, 'STATE', Blockly.PyArduino.ORDER_ATOMIC) || 'LOW';
    Blockly.PyArduino.reservePin(
        block, pin, Blockly.PyArduino.PinTypes.OUTPUT, 'Set LED');
    var pinSetupCode = 'pinMode(' + pin + ', OUTPUT);';
    Blockly.PyArduino.addSetup('io_' + pin, pinSetupCode, false);
    var code = 'digitalWrite(' + pin + ', ' + stateOutput + ');\n';
    return code;
};
//======================================================================//
Blockly.PyArduino['io_analogwrite'] = function (block) {
    var pin = block.getFieldValue('PIN');
    var stateOutput = Blockly.PyArduino.valueToCode(
        block, 'NUM', Blockly.PyArduino.ORDER_ATOMIC) || '0';
    Blockly.PyArduino.reservePin(
        block, pin, Blockly.PyArduino.PinTypes.OUTPUT, 'Analogue Write');
    var pinSetupCode = 'pinMode(' + pin + ', OUTPUT);';
    Blockly.PyArduino.addSetup('io_' + pin, pinSetupCode, false);
    if ((stateOutput < 0) || (stateOutput > 255)) {
        block.setWarningText('The analogue value set must be between 0 and 255',
            'pwm_value');
    } else {
        block.setWarningText(null, 'pwm_value');
    }
    var code = 'analogWrite(' + pin + ', ' + stateOutput + ');\n';
    return code;
};
//======================================================================//
Blockly.PyArduino['io_analogreadVar'] = function (block) {
    var pin = block.getFieldValue('VAR');
    Blockly.PyArduino.reservePin(
        block, pin, Blockly.PyArduino.PinTypes.INPUT, 'Analogue Read');
    var pinSetupCode = 'pinMode(' + pin + ', INPUT);';
    Blockly.PyArduino.addSetup('io_' + pin, pinSetupCode, false);
    var code = 'analogRead(' + pin + ')';
    return [code, Blockly.PyArduino.ORDER_ATOMIC];
};
//======================================================================//
Blockly.PyArduino['io_analogread'] = function (block) {
    var pin = block.getFieldValue('PIN');
    Blockly.PyArduino.reservePin(
        block, pin, Blockly.PyArduino.PinTypes.INPUT, 'Analogue Read');
    var pinSetupCode = 'pinMode(' + pin + ', INPUT);';
    Blockly.PyArduino.addSetup('io_' + pin, pinSetupCode, false);
    var code = 'analogRead(' + pin + ')';
    return [code, Blockly.PyArduino.ORDER_ATOMIC];
};
//======================================================================//
Blockly.PyArduino['io_highlow'] = function (block) {
    var code = block.getFieldValue('STATE');
    return [code, Blockly.PyArduino.ORDER_ATOMIC];
};

