import  Blockly from "blockly/core";
import Colors from "../Colors";

//======================================================================//
Blockly.Blocks["motor_servo_init"] = {
  init: function () {
    this.appendDummyInput()
      .appendField("ServoM")
      .appendField(new Blockly.FieldImage("/img/ico/motorServo_ico.png", 140, 40, {alt: "*",flipRtl: "FALSE",}));
    this.appendDummyInput()
      .appendField("Attach ")
      .appendField(new Blockly.FieldDropdown(Blockly.Arduino.onlyVar), 'VAR')
      .appendField(" To ")
      .appendField(new Blockly.FieldDropdown(Blockly.Arduino.Boards.selected.digitalPins),"PIN");
    this.setColour(Colors.motors.primary);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.Msg.ARDUINO_VAR_CONST_tooltip);
    this.setHelpUrl(Blockly.Msg.HELPURL);
  },
  updateFields: function () {
    Blockly.Arduino.Boards.refreshBlockFieldDropdown(this, 'VAR', 'onlyVar');
  }
};
//======================================================================//
Blockly.Blocks["motor_servo_write"] = {
  init: function () {
    this.appendDummyInput().appendField(new Blockly.FieldImage("/img/ico/motorServo_ico.png", 140, 40, {alt: "*",flipRtl: "FALSE",}));
    this.appendDummyInput()
      .appendField(new Blockly.FieldDropdown(Blockly.Arduino.onlyVar), 'VAR')
      .appendField(" Rotate ")
      .appendField(new Blockly.FieldAngle("90"), "DEG");
    this.setColour(Colors.motors.primary);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.Msg.ARDUINO_VAR_CONST_tooltip);
    this.setHelpUrl(Blockly.Msg.HELPURL);
  },
  getBlockType: function () {
    return Blockly.Types.NUMBER;
  },
  updateFields: function () {
    Blockly.Arduino.Boards.refreshBlockFieldDropdown(this, 'VAR', 'onlyVar');
  },
  blockCreated: function (workspace) {
    let Arr = workspace.getBlocksByType('motor_servo_init');
    if (Arr.length == 0) {
      let baseBeginBlock = workspace.getBlocksByType('base_begin')[0];
      var connection = baseBeginBlock.getInput('base_begin').connection;
      let UltrasonicInit = workspace.newBlock('motor_servo_init', 'motor_servo_init');
      UltrasonicInit.initSvg();
      UltrasonicInit.render();
      connection.connect(UltrasonicInit.previousConnection);
      connection = UltrasonicInit.nextConnection;
    }
  },
};
//======================================================================//
Blockly.Blocks["motor_servo_detach"] = {
  init: function () {
    this.appendDummyInput().appendField(
      new Blockly.FieldImage("/img/ico/motorServo_ico.png", 140, 40, {
        alt: "*",
        flipRtl: "FALSE",
      })
    );
    this.appendDummyInput()
      .appendField(new Blockly.FieldDropdown([['Attach', 'attach'], ['Detach', 'detach']]),'STATE')
      .appendField(new Blockly.FieldDropdown(Blockly.Arduino.onlyVar), 'VAR')
    this.setColour(Colors.motors.primary);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.Msg.ARDUINO_VAR_CONST_tooltip);
    this.setHelpUrl(Blockly.Msg.HELPURL);
  },
  updateFields: function () {
    Blockly.Arduino.Boards.refreshBlockFieldDropdown(this, 'VAR', 'onlyVar');
  },
};

//======================================================================//
Blockly.Blocks["DC_Motor_init"] = {
  init: function () {
    this.appendDummyInput()
      .appendField("   Driver Motor ")
      .appendField(new Blockly.FieldTextInput("MT"), "VAR");
    this.appendDummyInput()
      .appendField("   ")
      .appendField(new Blockly.FieldImage("/img/ico/icHBridgeL293D.png",100, 45, { alt: "", flipRtl: "FALSE" }));
    this.appendDummyInput()
      .appendField("MA1")
      .appendField(new Blockly.FieldDropdown(Blockly.Arduino.Boards.selected.digitalPins), 'PIN0')
      .appendField("MA2")
      .appendField(new Blockly.FieldDropdown(Blockly.Arduino.Boards.selected.digitalPins), 'PIN1');
    this.appendDummyInput()
      .appendField("MB1")
      .appendField(new Blockly.FieldDropdown(Blockly.Arduino.Boards.selected.digitalPins), 'PIN2')
      .appendField("MB2")
      .appendField(new Blockly.FieldDropdown(Blockly.Arduino.Boards.selected.digitalPins), 'PIN3')
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Colors.motors.primary);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};
//======================================================================//
Blockly.Blocks["DC_Motor_State"] = {
  init: function () {
    this.appendDummyInput()
      .appendField("   Driver Motor ")
      .appendField(new Blockly.FieldTextInput("MT"), "VAR");
    this.appendDummyInput()
      .appendField("   ")
      .appendField(new Blockly.FieldImage("/img/ico/icHBridgeL293D.png", 100, 45, { alt: "", flipRtl: "FALSE" }))
      this.appendDummyInput()
      .appendField("MOTOR")
        .appendField(new Blockly.FieldDropdown([['Forward', 'Forward'], ['Backward', 'Backward'], ['Left', 'Left'], ['Right', 'Right'], ['Stop', 'Stop']]), 'STATE')
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Colors.motors.primary);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};