import  Blockly from "blockly/core";
import Colors from "../Colors";
//======================================================================//
Blockly.Blocks["bluetooth_init"] = {
  init: function () {
    this.appendDummyInput()
      .appendField(new Blockly.FieldImage('img/ico/Bluetooth.png', 35, 35))
      .appendField("", "VAR")
      .appendField("RX ")
      .appendField(new Blockly.FieldDropdown(Blockly.Arduino.AllPins), 'PIN1')
      .appendField("TX ")
      .appendField(new Blockly.FieldDropdown(Blockly.Arduino.AllPins), 'PIN0')
      .appendField(new Blockly.FieldDropdown([["9600", "9600"], ["19200", "19200"], ["57600", "57600"], ["115200", "115200"], ["250000", "250000"]]), "SPEED");

    this.setColour(Colors.telecom.primary);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.Msg.ARDUINO_VAR_CONST_tooltip);
    this.setHelpUrl(Blockly.Msg.HELPURL);
  },
};
//======================================================================//
Blockly.Blocks["serial_init"] = {
  init: function () {
    this.appendDummyInput()
      .appendField(new Blockly.FieldImage('img/ico/serial.png', 60, 35))
      .appendField(new Blockly.FieldDropdown([["Serial", "Serial"], ["Serial1", "Serial1"]]), "SERIAL")
      .appendField(new Blockly.FieldDropdown([["9600", "9600"], ["19200", "19200"], ["57600", "57600"], ["115200", "115200"], ["250000", "250000"]]), "SPEED")

    this.setColour(Colors.telecom.primary);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.Msg.ARDUINO_VAR_CONST_tooltip);
    this.setHelpUrl(Blockly.Msg.HELPURL);
  },
};
//======================================================================//
Blockly.Blocks["serial_receive"] = {
  init: function () {
    this.appendDummyInput()
      .appendField(new Blockly.FieldImage('img/ico/serial.png', 60, 35))
      .appendField("Data Received ??")
    this.setOutput(true, null);
    this.setColour(Colors.telecom.primary);
    this.setTooltip(Blockly.Msg.ARDUINO_VAR_CONST_tooltip);
    this.setHelpUrl(Blockly.Msg.HELPURL);
  },
};
//======================================================================//
Blockly.Blocks["serial_receive_byte"] = {
  init: function () {
    this.appendDummyInput()
      .appendField(new Blockly.FieldImage('img/ico/serial.png', 60, 35))
      .appendField("Receive byte")
    this.setOutput(true, null);
    this.setColour(Colors.telecom.primary);
    this.setTooltip(Blockly.Msg.ARDUINO_VAR_CONST_tooltip);
    this.setHelpUrl(Blockly.Msg.HELPURL);
  },
};
//======================================================================//
Blockly.Blocks['serial_write'] = {
  /**
   * Block for appending to a variable in place.
   * @this Blockly.Block
   */
  init: function () {
    this.setHelpUrl(Blockly.Msg.TEXT_APPEND_HELPURL);
    this.setColour(Colors.telecom.primary);
    this.appendValueInput('SERIAL')
      .appendField(new Blockly.FieldImage('img/ico/serial.png', 60, 35))
      .appendField("Serial Write")
    this.setPreviousStatement(true);
    this.setNextStatement(true);

    var thisBlock = this;
    this.setTooltip(function () {
      return Blockly.Msg.TEXT_APPEND_TOOLTIP.replace('%1',
        thisBlock.getFieldValue('VAR'));
    });
  },
  getVarType: function (varName) {
    return Blockly.Types.TEXT;
  }
};
//======================================================================//
Blockly.Blocks["bluetooth_receive"] = {
  init: function () {
    this.appendDummyInput()
      .appendField(new Blockly.FieldImage('img/ico/Bluetooth.png', 35, 35))
      .appendField("Data Received ??")
    this.setOutput(true, null);
    this.setColour(Colors.telecom.primary);
    this.setTooltip(Blockly.Msg.ARDUINO_VAR_CONST_tooltip);
    this.setHelpUrl(Blockly.Msg.HELPURL);
  },
};
//======================================================================//
Blockly.Blocks["bluetooth_receive_byte"] = {
  init: function () {
    this.appendDummyInput()
      .appendField(new Blockly.FieldImage('img/ico/Bluetooth.png', 35, 35))
      .appendField("Receive byte")
    this.setOutput(true, null);
    this.setColour(Colors.telecom.primary);
    this.setTooltip(Blockly.Msg.ARDUINO_VAR_CONST_tooltip);
    this.setHelpUrl(Blockly.Msg.HELPURL);
  },
};
//======================================================================//
//======================================================================//
Blockly.Blocks['bluetooth_write'] = {
  init: function () {
    this.setHelpUrl(Blockly.Msg.TEXT_APPEND_HELPURL);
    this.setColour(Colors.telecom.primary);
    this.appendValueInput('BT')
      .appendField(new Blockly.FieldImage('img/ico/Bluetooth.png', 35, 35))
      .appendField("bluetooth Write")
    this.setPreviousStatement(true);
    this.setNextStatement(true);

    var thisBlock = this;
    this.setTooltip(function () {
      return Blockly.Msg.TEXT_APPEND_TOOLTIP.replace('%1',
        thisBlock.getFieldValue('VAR'));
    });
  },
  getVarType: function (varName) {
    return Blockly.Types.TEXT;
  }
};