import  Blockly from "blockly/core";
import Colors from "../Colors";
import Button from "../../../../assets/img/ico/button_ico.png";
//======================================================================//
Blockly.Blocks["switch_button_read"] = {
  init: function () {
    this.appendDummyInput()
      .appendField(new Blockly.FieldImage("/img/ico/button_ico.png", 35, 35))
      .appendField("BT State")
      .appendField(new Blockly.FieldDropdown(Blockly.Arduino.AllPins), 'PIN')
    this.setOutput(true, Blockly.Types.NUMBER);
    this.setColour(Colors.switch.primary);
    this.setTooltip(Blockly.Msg.ARDUINO_VAR_CONST_tooltip);
    this.setHelpUrl(Blockly.Msg.HELPURL);
  },
  updateFields: function () {
    Blockly.Arduino.Boards.refreshBlockFieldDropdown(this, 'PIN', 'AllPins');
  },
};

//======================================================================//
Blockly.Blocks['io_highlow'] = {
  init: function () {
    this.setHelpUrl('http://arduino.cc/en/Reference/Constants');
    this.setColour(Colors.switch.primary);
    this.appendDummyInput()
      .appendField(new Blockly.FieldDropdown([['ON', 'HIGH'], ['OFF', 'LOW']]),'STATE');
    this.setOutput(true);
    this.setTooltip(Blockly.Msg.ARD_HIGHLOW_TIP);
  },
  getBlockType: function () {
    return Blockly.Types.BOOLEAN;
  }
};
