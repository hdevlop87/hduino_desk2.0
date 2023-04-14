import  Blockly from 'blockly/core';
import '../../../ArduinoUtils/generator_arduino'
//======================================================================//

Blockly.Arduino['io_digitalwrite_Var'] = function (block) {

    var pin = Blockly.Arduino.valueToCode(block, 'VAR', Blockly.Arduino.ORDER_ATOMIC); 

    var stateOutput = block.getFieldValue('STATE') || 'LOW';

    var pinSetupCode = '  pinMode(' + pin + ', OUTPUT);';

    Blockly.Arduino.addSetup('io_' + pin, pinSetupCode, false);

    var code = 'digitalWrite(' + pin + ', ' + stateOutput + ');\n';
    return code;
};
//===================================================================== =//
Blockly.Arduino['io_digitalwrite'] = function (block) {
    var pin = block.getFieldValue('PIN');
    var stateOutput = Blockly.Arduino.valueToCode(block, 'STATE', Blockly.Arduino.ORDER_ATOMIC) || 'LOW';
    var varName = "";
    Blockly.Arduino.reservePin(block, pin, Blockly.Arduino.PinTypes.OUTPUT, 'Digital Write');

    var pinSetupCode = '  pinMode(' + pin + ', OUTPUT);';
    Blockly.Arduino.addSetup('io_' + pin, pinSetupCode, false);

    var code = 'digitalWrite(' + pin + ', ' + stateOutput + ');\n';
    return code;
};
//======================================================================//
Blockly.Arduino['io_digitalreadVar'] = function (block) {
    var pin = block.getFieldValue('VAR');
    Blockly.Arduino.reservePin(block, pin, Blockly.Arduino.PinTypes.INPUT, 'Digital Read');

    var pinSetupCode = '  pinMode(' + pin + ', INPUT);';
    Blockly.Arduino.addSetup('io_' + pin, pinSetupCode, false);

    var code = 'digitalRead(' + pin + ')';
    return [code, Blockly.Arduino.ORDER_ATOMIC];
};
//======================================================================//
Blockly.Arduino['io_digitalread'] = function (block) {
    var pin = block.getFieldValue('PIN');
    Blockly.Arduino.reservePin(
        block, pin, Blockly.Arduino.PinTypes.INPUT, 'Digital Read');

    var pinSetupCode = '  pinMode(' + pin + ', INPUT);';
    Blockly.Arduino.addSetup('io_' + pin, pinSetupCode, false);

    var code = 'digitalRead(' + pin + ')';
    return [code, Blockly.Arduino.ORDER_ATOMIC];
};
//======================================================================//
Blockly.Arduino['io_builtin_led'] = function (block) {
    var pin = block.getFieldValue('BUILT_IN_LED');
    var stateOutput = block.getFieldValue('STATE');

    Blockly.Arduino.reservePin(
        block, pin, Blockly.Arduino.PinTypes.OUTPUT, 'Set LED');

    var pinSetupCode = '  pinMode(' + pin + ', OUTPUT);';
    Blockly.Arduino.addSetup('io_' + pin, pinSetupCode, false);

    var code = 'digitalWrite(' + pin + ', ' + stateOutput + ');\n';
    return code;
};
//======================================================================//
Blockly.Arduino['io_analogwrite'] = function (block) {
    var pin = block.getFieldValue('PIN');
    var stateOutput = Blockly.Arduino.valueToCode(
        block, 'NUM', Blockly.Arduino.ORDER_ATOMIC) || '0';

    Blockly.Arduino.reservePin(
        block, pin, Blockly.Arduino.PinTypes.OUTPUT, 'Analogue Write');

    var pinSetupCode = '  pinMode(' + pin + ', OUTPUT);';
    Blockly.Arduino.addSetup('io_' + pin, pinSetupCode, false);

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
Blockly.Arduino['io_analogreadVar'] = function (block) {
    var pin = block.getFieldValue('VAR');
    Blockly.Arduino.reservePin(
        block, pin, Blockly.Arduino.PinTypes.INPUT, 'Analogue Read');

    var pinSetupCode = '  pinMode(' + pin + ', INPUT);';
    Blockly.Arduino.addSetup('io_' + pin, pinSetupCode, false);

    var code = 'analogRead(' + pin + ')';
    return [code, Blockly.Arduino.ORDER_ATOMIC];
};
//======================================================================//
Blockly.Arduino['io_analogread'] = function (block) {
    var pin = block.getFieldValue('PIN');
    Blockly.Arduino.reservePin(
        block, pin, Blockly.Arduino.PinTypes.INPUT, 'Analogue Read');

    var pinSetupCode = '  pinMode(' + pin + ', INPUT);';
    Blockly.Arduino.addSetup('io_' + pin, pinSetupCode, false);

    var code = 'analogRead(' + pin + ')';
    return [code, Blockly.Arduino.ORDER_ATOMIC];
};
//======================================================================//
Blockly.Arduino['io_highlow'] = function (block) {
    var code = block.getFieldValue('STATE');
    return [code, Blockly.Arduino.ORDER_ATOMIC];
};

