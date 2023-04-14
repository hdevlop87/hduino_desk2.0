import  Blockly from 'blockly/core';

//===================================================================================================//
Blockly.Arduino["switch_button_read"] = function (block) {
    var pin = block.getFieldValue('PIN');
    Blockly.Arduino.variables_['button' + pin] = 'bool buttonState_' + pin + ' = false ;';
    Blockly.Arduino.loopCode_['button1' + pin] = `buttonState_${pin} = digitalRead(${pin});`;
    var code = `buttonState_${pin}`;
    return [code, Blockly.Arduino.ORDER_ATOMIC]
};
