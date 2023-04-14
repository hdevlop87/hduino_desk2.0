import  Blockly from 'blockly/core';
import '../../../ArduinoUtils/generator_arduino'

Blockly.Arduino.millis = function (block) {
    var code = 'millis()';
    return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.micros = function (block) {
    var code = 'micros()';
    return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.millis_sec = function (block) {
    var code = 'millis()/1000';
    return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.base_delay = function () {
    var delay_time = Blockly.Arduino.valueToCode(this, 'DELAY_TIME', Blockly.Arduino.ORDER_ATOMIC);
    var code = 'delay(' + delay_time + ');\n';
    return code;
};

Blockly.Arduino.base_delay_sec = function () {
    var delay_time = Blockly.Arduino.valueToCode(this, 'DELAY_TIME', Blockly.Arduino.ORDER_ATOMIC);
    var code = 'delay(' + 1000 * delay_time + ');\n';
    return code;
};

Blockly.Arduino.tempo_no_delay = function(block) {
    var _u = block.getFieldValue("unite");
    var delay_time = Blockly.Arduino.valueToCode(block, "DELAY_TIME", Blockly.Arduino.ORDER_ATOMIC);
	var faire = Blockly.Arduino.statementToCode(block, "branche");
	var temps = "temps"+delay_time;
	Blockly.Arduino.definitions_["temporisation"+delay_time] = "long "+temps+" = 0 ;";
    switch (_u) {
        case "us":
            var code = "if ((micros()-"+temps+")>=" + delay_time + ") {\n  "+temps+"=micros();\n"+faire+"}\n";
            break;
        case "ms":
            var code = "if ((millis()-"+temps+")>=" + delay_time + ") {\n  "+temps+"=millis();\n"+faire+"}\n";
            break;
        case "s":
            code = "if ((millis()-"+temps+")>=" + delay_time + "*1000) {\n  "+temps+"=millis();\n"+faire+"}\n";
            break
    };
    return code
};

Blockly.Arduino.io_pulsein = function () {
    var dropdown_pin  = this.getFieldValue('PIN');
    var dropdown_stat = this.getFieldValue('STAT');

    Blockly.Arduino.setups_['setup_input_' + dropdown_pin] = 'pinMode(' + dropdown_pin + ', INPUT);';
    var code = 'pulseIn(' + dropdown_pin + ',' + dropdown_stat + ')';
    return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.io_pulsein_timeout = function () {
    var dropdown_pin  = this.getFieldValue('PIN');
    var dropdown_stat = this.getTitleValue('STAT');
    var timeout = Blockly.Arduino.valueToCode(this, 'TIMEOUT', Blockly.Arduino.ORDER_ATOMIC) || '0';
    Blockly.Arduino.setups_['setup_input_' + dropdown_pin] = 'pinMode(' + dropdown_pin + ', INPUT);';
    var code = 'pulseIn(' + dropdown_pin + ', ' + dropdown_stat + ', ' + timeout + ')';
    return [code, Blockly.Arduino.ORDER_ATOMIC];
};