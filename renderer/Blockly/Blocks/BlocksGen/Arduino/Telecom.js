import  Blockly from "blockly/core";

//======================================================================//
Blockly.Arduino["bluetooth_init"] = function (block) {
  var PIN0 = block.getFieldValue("PIN0");
  var PIN1 = block.getFieldValue("PIN1");
  var SPEED = block.getFieldValue("SPEED");

  Blockly.Arduino.includes_["bluetooth_Soft"] = `\n#include <SoftwareSerial.h>`
  Blockly.Arduino.includes_["bluetooth_init"] =`SoftwareSerial BT(${PIN1}, ${PIN0}); // RX, TX`

  Blockly.Arduino.setups_["setup_bluetooth"] = `  BT.begin(${SPEED});`;

  return "";
};
//======================================================================//
Blockly.Arduino["serial_init"] = function (block) {
  var SPEED = block.getFieldValue("SPEED");
  var SERIAL = block.getFieldValue("SERIAL");
  Blockly.Arduino.setups_["setup_bluetooth_speed"] = `  ${SERIAL}.begin(${SPEED});`;

  return "";
};
//======================================================================//
Blockly.Arduino["serial_receive"] = function (block) {

  return ["Serial.available() > 0", Blockly.Arduino.ORDER_ATOMIC];
};
//======================================================================//
Blockly.Arduino["serial_receive_byte"] = function (block) {

  return ["Serial.read()", Blockly.Arduino.ORDER_ATOMIC];
};
//======================================================================//
//======================================================================//
Blockly.Arduino["bluetooth_receive"] = function (block) {

  return ["BT.available() > 0", Blockly.Arduino.ORDER_ATOMIC];
};
//======================================================================//
Blockly.Arduino["bluetooth_receive_byte"] = function (block) {

  return ["BT.read()", Blockly.Arduino.ORDER_ATOMIC];
};
//======================================================================//
Blockly.Arduino['serial_write'] = function (block) {
  // Append to a variable in place.
  var argument0 = Blockly.Arduino.valueToCode(block, 'SERIAL', Blockly.Arduino.ORDER_UNARY_POSTFIX);
  return `Serial.write(${argument0});`
};
//======================================================================//
Blockly.Arduino['bluetooth_write'] = function (block) {
  // Append to a variable in place.
  var argument0 = Blockly.Arduino.valueToCode(block, 'BT', Blockly.Arduino.ORDER_UNARY_POSTFIX);
  return `BT.write(${argument0});`
};