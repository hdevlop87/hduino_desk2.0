import  Blockly from "blockly/core";

//======================================================================//
Blockly.Arduino["motor_servo_init"] = function (block) {
  var argument0 = block.getFieldValue("PIN") || "2";
  var varName = block.getFieldValue("VAR");
  Blockly.Arduino.includes_["include-Servo"] = "#include <Servo.h>";
  Blockly.Arduino.includes_["define_Servo"+varName] = `Servo ${varName};`;
  Blockly.Arduino.setups_["setup_Servo"+varName] = `  ${varName}.attach(${argument0});`; 
  return "";
};
//======================================================================//
Blockly.Arduino["motor_servo_write"] = function (block) {
  var varName = block.getFieldValue("VAR");
  var Deg = block.getFieldValue("DEG");
  var code = `${varName}.write(${Deg});\n`;
  return code;
};
//======================================================================//
Blockly.Arduino["motor_servo_detach"] = function (block) {
  var varName = block.getFieldValue("VAR");
  var varSTATE = block.getFieldValue("STATE");
  var code = `${varName}.${varSTATE}();\n`;
  return code;
};
//======================================================================//
//======================================================================//
Blockly.Arduino["DC_Motor_init"] = function (block) {
  var PIN0 = block.getFieldValue("PIN0");
  var PIN1 = block.getFieldValue("PIN1");
  var PIN2 = block.getFieldValue("PIN2");
  var PIN3 = block.getFieldValue("PIN3");
  var varName = block.getFieldValue("VAR");

  Blockly.Arduino.includes_["init-motor"] =
    `int ${varName}A1  = ${PIN0}; 
int ${varName}A2 = ${PIN1}; 
int ${varName}B1 = ${PIN2}; 
int ${varName}B2 = ${PIN3};`

  Blockly.Arduino.setups_["setup_motor"] = 
  `pinMode(${varName}A1, OUTPUT);
  pinMode(${varName}A2, OUTPUT);
  pinMode(${varName}B1, OUTPUT);
  pinMode(${varName}B2, OUTPUT);`;

  const FuncForward = 
    `void ${varName}_Forward(){
  digitalWrite(${varName}A1, LOW);
  digitalWrite(${varName}A2, HIGH);
  digitalWrite(${varName}B1, LOW);
  digitalWrite(${varName}B2, HIGH);
}`
const FuncBackward =
  `void ${varName}_Backward(){
  digitalWrite(${varName}A1, HIGH);
  digitalWrite(${varName}A2, LOW);
  digitalWrite(${varName}B1, HIGH);
  digitalWrite(${varName}B2, LOW);
}`
const FuncLeft =
  `void ${varName}_Left(){
  digitalWrite(${varName}A1, HIGH);
  digitalWrite(${varName}A2, LOW);
  digitalWrite(${varName}B1, LOW);
  digitalWrite(${varName}B2, HIGH);
}`
const FuncRight =
  `void ${varName}_Right(){
  digitalWrite(${varName}A1, LOW);
  digitalWrite(${varName}A2, HIGH);
  digitalWrite(${varName}B1, HIGH);
  digitalWrite(${varName}B2, LOW);
}`
  const FuncStop =
    `void ${varName}_Stop(){
  digitalWrite(${varName}A1, LOW);
  digitalWrite(${varName}A2, LOW);
  digitalWrite(${varName}B1, LOW);
  digitalWrite(${varName}B2, LOW);
}`

  Blockly.Arduino.addFunction('FuncForward', FuncForward, true);
  Blockly.Arduino.addFunction('FuncBackward', FuncBackward, true);
  Blockly.Arduino.addFunction('FuncLeft', FuncLeft, true);
  Blockly.Arduino.addFunction('FuncRight', FuncRight, true);
  Blockly.Arduino.addFunction('FuncStop', FuncStop, true);

  return "";
};
//======================================================================//
Blockly.Arduino["DC_Motor_State"] = function (block) {
  var varName = block.getFieldValue("VAR");
  var varSTATE = block.getFieldValue("STATE");
  return `${varName}_${varSTATE}();\n`;
};
