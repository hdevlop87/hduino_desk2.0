import  Blockly from 'blockly/core';
import Colors from "../Colors";
import ultrason_ico from '../../../../assets/img/ico/ultrason_ico.png';
import lm35_ico from '../../../../assets/img/ico/lm35_ico.png';
import DHT11_ico from '../../../../assets/img/ico/DHT11_ico.png';
import line_follower from '../../../../assets/img/ico/line_follower.png';
import ldr_ico from '../../../../assets/img/ico/ldr_ico.png';
import pir_ico from '../../../../assets/img/ico/pir_ico.png';
import module_rfid from '../../../../assets/img/ico/module_rfid.png'
//===================================================================================================//
Blockly.Blocks['Ultrasonic'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldImage('/img/ico/ultrason_ico.png', 60, 30, { alt: "*", flipRtl: "FALSE" }))
            .appendField("Ultrasonic")
            .appendField(new Blockly.FieldDropdown(Blockly.Arduino.onlyVar), 'VAR')
        this.appendDummyInput()
            .appendField(Blockly.Msg.VARIABLES_SET_CONST)
            .appendField('Trig   to')
            .appendField(new Blockly.FieldDropdown(Blockly.Arduino.Boards.selected.digitalPins), 'PIN0')
        this.appendDummyInput()
            .appendField(Blockly.Msg.VARIABLES_SET_CONST)
            .appendField('Echo to')
            .appendField(new Blockly.FieldDropdown(Blockly.Arduino.Boards.selected.digitalPins), 'PIN1') 
        this.setColour(Colors.sensor.primary);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip(Blockly.Msg.ARDUINO_VAR_CONST_tooltip);
        this.setHelpUrl(Blockly.Msg.HELPURL);
    },
    updateFields: function () {
        Blockly.Arduino.Boards.refreshBlockFieldDropdown(this, 'VAR', 'onlyVar');
        Blockly.Arduino.Boards.refreshBlockFieldDropdown( this, 'PIN0', 'digitalPins');
        Blockly.Arduino.Boards.refreshBlockFieldDropdown(this, 'PIN1', 'digitalPins');
    }
};
//===================================================================================================//
Blockly.Blocks['Ultrasonic_read'] = {
    init: function () {
        this.setHelpUrl('http://arduino.cc/en/Reference/DigitalRead');
        this.setColour(Colors.sensor.primary);
        this.appendDummyInput()
            .appendField(new Blockly.FieldImage('/img/ico/ultrason_ico.png', 60, 30, { alt: "*", flipRtl: "FALSE" }))
            .appendField('Distance Of')
            .appendField(new Blockly.FieldDropdown(Blockly.Arduino.onlyVar), 'PIN')
        this.setOutput(true, Blockly.Types.NUMBER);
        this.setTooltip(Blockly.Msg.ARD_DIGITALREAD_TIP);
    },
    getBlockType: function () {
        return Blockly.Types.NUMBER;
    },
    updateFields: function () { 
        Blockly.Arduino.Boards.refreshBlockFieldDropdown(this, 'PIN', 'onlyVar');
    },
    blockCreated: function (workspace) {
        let Arr = workspace.getBlocksByType('Ultrasonic');
        if (Arr.length == 0){
            let baseBeginBlock = workspace.getBlocksByType('base_begin')[0];
            var connection = baseBeginBlock.getInput('base_begin').connection;
            let UltrasonicInit = workspace.newBlock('Ultrasonic', 'Ultrasonic');
            UltrasonicInit.initSvg();
            UltrasonicInit.render();
            connection.connect(UltrasonicInit.previousConnection);
            connection = UltrasonicInit.nextConnection;
        }
    },
};
//===================================================================================================//
Blockly.Blocks["SENSOR_dht11"] = {
    init: function () {
        this.setColour(Colors.sensor.primary);
        this.setHelpUrl("http://nagashur.com/blog/2013/06/18/lire-la-valeur-dune-sonde-de-temperature-et-d%E2%80%99hygrometrie-dht11/");
        this.appendDummyInput()
            .appendField(new Blockly.FieldImage('/img/ico/DHT11_ico.png', 60, 45))
            .appendField(new Blockly.FieldDropdown([["Humidity", "h"], ["Temperature", "t"]]), "choix")
            .appendField(new Blockly.FieldDropdown(Blockly.Arduino.AllPins), 'PIN')
            .appendField(Blockly.Msg.pin);
        this.setOutput(true, Blockly.Types.NUMBER);
        this.setTooltip("returns moisture (from 0 to 100%) temperature (from 0 to 80 degrees Celsius) received by the sensor")
    },
    updateFields: function () {
        Blockly.Arduino.Boards.refreshBlockFieldDropdown(this, 'PIN', 'AllPins');
    },
};
//===================================================================================================//
Blockly.Blocks["SENSOR_line_follower"] = {
    init: function () {
        this.setColour(Colors.sensor.primary);
        this.setHelpUrl(Blockly.Msg.HELPURL);
        this.appendValueInput("PIN", "Number")
            .appendField(new Blockly.FieldImage('/img/ico/line_follower.png', 100, 35))
            .appendField("black line detected of");
        this.setOutput(true, "Boolean");
        this.setTooltip("returns true (false) if a black line is (not) detected")
    }
};
//===================================================================================================//
Blockly.Blocks["SENSOR_lm35"] = {
    init: function () {
        this.setColour(Colors.sensor.primary);
        this.setHelpUrl("");
        this.appendDummyInput()
            .appendField(new Blockly.FieldImage('/img/ico/lm35_ico.png', 32, 50))
            .appendField("temperature of ")
            .appendField(new Blockly.FieldDropdown(Blockly.Arduino.AllPins), 'PIN')
        this.setOutput(true, Blockly.Types.NUMBER);
        this.setTooltip(Blockly.Msg.lm35_2)
    },
    getBlockType: function () {
        return Blockly.Types.NUMBER;
    },
    updateFields: function () {
        Blockly.Arduino.Boards.refreshBlockFieldDropdown(this, 'PIN', 'AllPinsAnalog');
    },
};
//===================================================================================================//
Blockly.Blocks["SENSOR_light_sensor"] = {
    init: function () {
        this.setColour(Colors.sensor.primary);
        this.setHelpUrl("https://www.carnetdumaker.net/articles/mesurer-la-luminosite-ambiante-avec-une-photoresistance-et-une-carte-arduino-genuino/");
        this.appendDummyInput()
            .appendField(new Blockly.FieldImage('/img/ico/ldr_ico.png', 40, 40))
            .appendField("daylight In ")
            .appendField(new Blockly.FieldDropdown(Blockly.Arduino.AllPins), 'PIN')
        this.setOutput(true, Blockly.Types.NUMBER);
        this.setTooltip("returns a value based on brightness: darkness:full light")
    },
    updateFields: function () {
        Blockly.Arduino.Boards.refreshBlockFieldDropdown(this, 'PIN', 'AllPinsAnalog');
    },
};
//===================================================================================================//
Blockly.Blocks["SENSOR_PIR"] = {
    init: function () {
        this.setColour(Colors.sensor.primary);
        this.setHelpUrl("https://www.carnetdumaker.net/articles/mesurer-la-luminosite-ambiante-avec-une-photoresistance-et-une-carte-arduino-genuino/");
        this.appendDummyInput()
            .appendField(new Blockly.FieldImage('/img/ico/pir_ico.png', 40, 40))
            .appendField("Motion State In ")
            .appendField(new Blockly.FieldDropdown(Blockly.Arduino.AllPins), 'PIN')
        this.setOutput(true, Blockly.Types.NUMBER);
        this.setTooltip("returns a value based on brightness: darkness:full light")
    },
    updateFields: function () {
        Blockly.Arduino.Boards.refreshBlockFieldDropdown(this, 'PIN', 'AllPins');
    },
};

Blockly.Blocks.RFID_module = {
    init: function () {
        this.setColour(Colors.sensor.primary);
        this.setHelpUrl(Blockly.Msg.RFID_HELPURL);
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_LEFT)
            .appendField(Blockly.Msg.RFID_module_TEXT)
            .appendField(new Blockly.FieldImage('/img/ico/module_rfid.png', 100, 50))
        this.appendValueInput("SDA")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(Blockly.Msg.RFID_module_INPUT1)
            .setCheck('Number');
        this.appendValueInput("SCK")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(Blockly.Msg.RFID_module_INPUT2)
            .setCheck('Number');
        this.appendValueInput("MOSI")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(Blockly.Msg.RFID_module_INPUT3)
            .setCheck('Number');
        this.appendValueInput("MISO")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(Blockly.Msg.RFID_module_INPUT4)
            .setCheck('Number');
        this.appendValueInput("RST")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(Blockly.Msg.RFID_module_INPUT5)
            .setCheck('Number');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip(Blockly.Msg.RFID_module_TOOLTIP);
    }
};
