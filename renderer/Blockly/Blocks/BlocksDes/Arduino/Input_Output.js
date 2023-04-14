import Blockly from 'blockly';
import Colors from "../Colors";


// //======================================================================//
Blockly.Blocks['io_digitalwrite_Var'] = {
    init: function () {
        this.jsonInit({
            "type": "digitalwrite",
            "message0": "set digital %1 to %2",
            "args0": [
                {
                    "type": "input_value", 
                    "name": "VAR"
                },
                {
                    "type": "field_dropdown",
                    "name": "STATE",
                    "options": [
                        [
                            "ON",
                            "HIGH"
                        ],
                        [
                            "OFF",
                            "LOW"
                        ]
                    ]
                }
            ],
            "inputsInline": true,
            "previousStatement": null,
            "nextStatement": null,
            "colour": '#018790',
            "tooltip": "",
            "helpUrl": ""
        });
    },

    getBlockType: function () {
        return Blockly.Types.NUMBER;
    },
    getVarType: function (varName) {
        return Blockly.Types.NUMBER;
    },
};
// //======================================================================//
Blockly.Blocks['io_digitalwrite'] = {
    init: function () {
        this.setHelpUrl('http://arduino.cc/en/Reference/DigitalWrite');
        this.setColour(Colors.ArduinoIO.primary);
        this.appendValueInput('STATE')
            .appendField(Blockly.Msg.ARD_DIGITALWRITE)
            .appendField(new Blockly.FieldDropdown(Blockly.Arduino.AllPins), 'PIN')
            .appendField(Blockly.Msg.ARD_WRITE_TO)
            .setCheck("Boolean");
        this.setInputsInline(false);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip(Blockly.Msg.ARD_DIGITALWRITE_TIP);
    },
    updateFields: function () {
        Blockly.Arduino.Boards.refreshBlockFieldDropdown(this, 'PIN', 'AllPins');
    }
};
// //======================================================================//
Blockly.Blocks['io_digitalreadVar'] = {

    init: function () {
        this.setHelpUrl('http://arduino.cc/en/Reference/DigitalRead');
        this.setColour(Colors.ArduinoIO.primary);
        this.appendDummyInput()
            .appendField('read digital pin ')
            .appendField(new Blockly.FieldVariable('item'), 'VAR')
        this.setOutput(true, "Boolean");
        this.setTooltip(Blockly.Msg.ARD_DIGITALREAD_TIP);
    },

    updateFields: function () {
        Blockly.Arduino.Boards.refreshBlockFieldDropdown(
            this, 'PIN', 'digitalPins');
    }
};
// //======================================================================//
Blockly.Blocks['io_digitalread'] = { 

    init: function () {
        this.setHelpUrl('http://arduino.cc/en/Reference/DigitalRead');
        this.setColour(Colors.ArduinoIO.primary);
        this.appendDummyInput()
            .appendField(Blockly.Msg.ARD_DIGITALREAD)
            .appendField(new Blockly.FieldDropdown(Blockly.Arduino.AllPins), 'PIN')
        this.setOutput(true, "Boolean");
        this.setTooltip(Blockly.Msg.ARD_DIGITALREAD_TIP);
    },

    updateFields: function () {  
        Blockly.Arduino.Boards.refreshBlockFieldDropdown(this, 'PIN', 'AllPins');
    },
    getBlockType: function () {
        return Blockly.Types.NUMBER;
    },
};
// //======================================================================//
Blockly.Blocks['io_builtin_led'] = {
    init: function () {
        this.setHelpUrl('http://arduino.cc/en/Reference/DigitalWrite');
        this.setColour(Colors.ArduinoIO.primary);
        this.appendDummyInput()
            .appendField(Blockly.Msg.ARD_BUILTIN_LED)
            .appendField(new Blockly.FieldDropdown(Blockly.Arduino.Boards.selected.builtinLed), 'BUILT_IN_LED')
            .appendField('to')
            .appendField(new Blockly.FieldDropdown([['ON', 'HIGH'], ['OFF', 'LOW']]), 'STATE')
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip(Blockly.Msg.ARD_BUILTIN_LED_TIP);
    },

    updateFields: function () {
        Blockly.Arduino.Boards.refreshBlockFieldDropdown(
            this, 'BUILT_IN_LED', 'builtinLed');
    },

    getBlockType: function () {
        return Blockly.Types.BOOLEAN;
    },
};
// //======================================================================//
Blockly.Blocks['io_analogwrite'] = {
    init: function () {
        this.setHelpUrl('http://arduino.cc/en/Reference/AnalogWrite');
        this.setColour(Colors.ArduinoIO.primary);
        this.appendValueInput('NUM')
            .appendField(Blockly.Msg.ARD_ANALOGWRITE)
            .appendField(new Blockly.FieldDropdown(Blockly.Arduino.Boards.selected.pwmPins), 'PIN')
            .appendField(Blockly.Msg.ARD_WRITE_TO)
            .setCheck("Number");
        this.setInputsInline(false);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip(Blockly.Msg.ARD_ANALOGWRITE_TIP);
    },
    updateFields: function () {
        Blockly.Arduino.Boards.refreshBlockFieldDropdown(this, 'PIN', 'pwmPins');
    },
    getBlockType: function () {
        return Blockly.Types.NUMBER;
    },
};
// //======================================================================//
Blockly.Blocks['io_analogreadVar'] = {

    init: function () {
        this.setHelpUrl('http://arduino.cc/en/Reference/AnalogRead');
        this.setColour(Colors.ArduinoIO.primary);
        this.appendDummyInput()
            .appendField('read analog ')
            .appendField(new Blockly.FieldVariable('item'), 'VAR')
        this.setOutput(true);
        this.setTooltip(Blockly.Msg.ARD_ANALOGREAD_TIP);
    },
    getBlockType: function () {
        return Blockly.Types.NUMBER;
    },
    updateFields: function () {
        Blockly.Arduino.Boards.refreshBlockFieldDropdown(this, 'PIN', 'analogPins');
    }
};
// //======================================================================//
Blockly.Blocks['io_analogread'] = {

    init: function () {
        this.setHelpUrl('http://arduino.cc/en/Reference/AnalogRead');
        this.setColour(Colors.ArduinoIO.primary);
        this.appendDummyInput()
            .appendField(Blockly.Msg.ARD_ANALOGREAD)
            .appendField(new Blockly.FieldDropdown(Blockly.Arduino.AllPinsAnalog), 'PIN');
        this.setOutput(true, Blockly.Types.NUMBER.output);
        this.setTooltip(Blockly.Msg.ARD_ANALOGREAD_TIP);
    },
    getBlockType: function () {
        return Blockly.Types.NUMBER;
    },
    updateFields: function () {
        Blockly.Arduino.Boards.refreshBlockFieldDropdown(this, 'PIN', 'AllPinsAnalog');
    }
};
// //======================================================================//
Blockly.Blocks['io_highlow'] = {

    init: function () {
        this.setHelpUrl('http://arduino.cc/en/Reference/Constants');
        this.setColour(Colors.ArduinoIO.primary);
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown([['ON', 'HIGH'], ['OFF', 'LOW']]),'STATE');
        this.setOutput(true);
        this.setTooltip(Blockly.Msg.ARD_HIGHLOW_TIP);
    },

    getBlockType: function () {
        return Blockly.Types.BOOLEAN;
    }
};
