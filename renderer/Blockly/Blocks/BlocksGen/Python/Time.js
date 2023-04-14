import * as Blockly from 'blockly/core';
import '../../../ArduinoUtils/generator_ard_python';

Blockly.PyArduino.millis = function (block) {
    var code = 'millis()';
    return [code, Blockly.PyArduino.ORDER_ATOMIC];
};

Blockly.PyArduino.millis_sec = function (block) {
    var code = 'millis()/1000';
    return [code, Blockly.PyArduino.ORDER_ATOMIC];
};

Blockly.PyArduino.base_delay = function () {
    var delay_time = Blockly.PyArduino.valueToCode(this, 'DELAY_TIME', Blockly.PyArduino.ORDER_ATOMIC);
    var code = `time.sleep(${delay_time / 1000})\n`;
    return code;
};

Blockly.PyArduino.base_delay_sec = function () {
    var delay_time = Blockly.PyArduino.valueToCode(this, 'DELAY_TIME', Blockly.PyArduino.ORDER_ATOMIC);
    var code = `time.sleep(${delay_time})\n`;
    return code;
};

Blockly.PyArduino.tempo_no_delay = function(block) {
    var _u = block.getFieldValue("unite");
    var delay_time = Blockly.PyArduino.valueToCode(block, "DELAY_TIME", Blockly.PyArduino.ORDER_ATOMIC);
	var faire = Blockly.PyArduino.statementToCode(block, "branche");
	var temps = "temps"+delay_time;
	Blockly.PyArduino.definitions_["temporisation"+delay_time] = "long "+temps+" = 0 ;";
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