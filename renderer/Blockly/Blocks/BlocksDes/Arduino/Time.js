import Blockly from 'blockly/core';
import Colors from "../Colors";


Blockly.Blocks['math_number'] = {
    init: function () {
        this.setHelpUrl(Blockly.Msg.MATH_NUMBER_HELPURL);
        this.setColour(Colors.control.primary);
        this.appendDummyInput()
            .appendField(
                new Blockly.FieldTextInput(
                    '0', Blockly.FieldTextInput.numberValidator),
                'NUM');
        this.setOutput(true, Blockly.Types.NUMBER.output);
        var thisBlock = this;
        this.setTooltip(function () {
            var parent = thisBlock.getParent();
            return (parent && parent.getInputsInline() && parent.tooltip) ||
                Blockly.Msg.MATH_NUMBER_TOOLTIP;
        });
    },
    getBlockType: function () {
        var numString = this.getFieldValue('NUM');
        return Blockly.Types.identifyNumber(numString);
    }
};

Blockly.Blocks.micros = {
    init: function () {
        this.setColour(Colors.control.primary);
        this.setHelpUrl(Blockly.Msg.ARDUINO_SINCE_PROGRAM_STARTED_HELPURL);
        this.appendDummyInput("")
            .appendField("micros");
        this.setOutput(true, 'Number');
        this.setTooltip(Blockly.Msg.ARDUINO_SINCE_PROGRAM_STARTED_TOOLTIP);
    }
};

Blockly.Blocks.millis = {
    init: function () {
        this.setColour(Colors.control.primary);
        this.setHelpUrl(Blockly.Msg.ARDUINO_SINCE_PROGRAM_STARTED_HELPURL);
        this.appendDummyInput("")
            .appendField("millis");
        this.setOutput(true, 'Number');
        this.setTooltip(Blockly.Msg.ARDUINO_SINCE_PROGRAM_STARTED_TOOLTIP);
    }
};

Blockly.Blocks.millis_sec = {
    init: function () {
        this.setColour(Colors.control.primary);
        this.setHelpUrl(Blockly.Msg.ARDUINO_SINCE_PROGRAM_STARTED_HELPURL);
        this.appendDummyInput("")
            .appendField("secondis");
        this.setOutput(true, 'Number');
        this.setTooltip(Blockly.Msg.ARDUINO_SINCE_PROGRAM_STARTED_TOOLTIP);
    }
};

Blockly.Blocks.base_delay = {
    init: function () {
        this.setColour(Colors.control.primary);
        this.setHelpUrl(Blockly.Msg.ARDUINO_BASE_DELAY_HELPURL);
        this.appendValueInput("DELAY_TIME", 'Number')
            .appendField(Blockly.Msg.ARDUINO_BASE_DELAY_DELAY_TIME)
            .setCheck('Number');
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip(Blockly.Msg.ARDUINO_BASE_DELAY_TOOLTIP);
    }
};

Blockly.Blocks.base_delay_sec = {
    init: function () {
        this.setColour(Colors.control.primary);
        this.setHelpUrl(Blockly.Msg.ARDUINO_BASE_DELAY_HELPURL);
        this.appendValueInput("DELAY_TIME", 'Number')
            .appendField(Blockly.Msg.ARDUINO_BASE_DELAY_DELAY_TIME_SEC)
            .setCheck('Number');
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip(Blockly.Msg.ARDUINO_BASE_DELAY_TOOLTIP);
    }
};

Blockly.Blocks.tempo_no_delay = {
    init: function () {
        this.appendValueInput("DELAY_TIME")
            .setCheck("Number")
            .appendField(Blockly.Msg.ARDUINO_BASE_TEMPO1);
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown(Blockly.Msg.ARDUINO_BASE_TEMPO_TIME), "unite")
            .appendField(Blockly.Msg.ARDUINO_BASE_TEMPO2);
        this.appendStatementInput("branche");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(Colors.control.primary);
        this.setTooltip(Blockly.Msg.ARDUINO_BASE_TEMPO_TOOLTIP);
        this.setHelpUrl(Blockly.Msg.ARDUINO_BASE_TEMPO_HELPURL);
    }
};

Blockly.Blocks.io_pulsein = {
    init: function () {
        this.setColour(Colors.control.primary);
        this.setHelpUrl('http://arduino.cc/en/Reference/pulseIn');
        this.appendDummyInput()
            .appendField(Blockly.Msg.ARDUINO_PULSEIN)
            .appendField(new Blockly.FieldDropdown(Blockly.Arduino.Boards.selected.digitalPins), 'PIN')
            .appendField(Blockly.Msg.ARDUINO_INOUT_STAT)
            .appendField(new Blockly.FieldDropdown(Blockly.Msg.FIELDDROPDOWN), 'STAT');
        this.setInputsInline(true);
        this.setOutput(true, 'Number');
        this.setTooltip('Reads a pulse (either HIGH or LOW) on a pin. For example, if value is HIGH, pulseIn() waits for the pin to go HIGH, starts timing, then waits for the pin to go LOW and stops timing. Returns the length of the pulse in microseconds. Gives up and returns 0 if no pulse starts within a specified time out.');
    },
    getBlockType: function () {
        return Blockly.Types.NUMBER;
    }
};

Blockly.Blocks.io_pulsein_timeout = {
    init: function () {
        this.setColour(Colors.control.primary);
        this.setHelpUrl('http://arduino.cc/en/Reference/pulseIn');
        this.appendDummyInput()
            .appendField(Blockly.Msg.ARDUINO_PULSEIN)
            .appendField(new Blockly.FieldDropdown(Blockly.Arduino.Boards.selected.digitalPins), 'PIN')
            .appendField(Blockly.Msg.ARDUINO_INOUT_STAT)
            .appendField(new Blockly.FieldDropdown(Blockly.Msg.FIELDDROPDOWN), 'STAT');
        this.appendValueInput("TIMEOUT")
            .setCheck("Number")
            .appendField(Blockly.Msg.ARDUINO_PULSEIN_TIMEOUT);
        this.setInputsInline(true);
        this.setOutput(true, 'Number');
        this.setTooltip('Reads a pulse (either HIGH or LOW) on a pin. For example, if value is HIGH, pulseIn() waits for the pin to go HIGH, starts timing, then waits for the pin to go LOW and stops timing. Returns the length of the pulse in microseconds. Gives up and returns 0 if no pulse starts within a specified time out.');
    },
    getBlockType: function () {
        return Blockly.Types.NUMBER;
    }
};