import  Blockly from 'blockly/core';
import '../../../ArduinoUtils/generator_arduino'
//============================================================================================================//
Blockly.Arduino['controls_If'] = function(block) {
    var n = 0;
    var argument = Blockly.Arduino.valueToCode(block, 'IF' + n,
        Blockly.Arduino.ORDER_NONE) || 'false';
    var branch = Blockly.Arduino.statementToCode(block, 'DO' + n);
    var code = 'if (' + argument + ') {\n' + branch + '}';
    for (n = 1; n <= block.elseifCount_; n++) {
      argument = Blockly.Arduino.valueToCode(block, 'IF' + n,
          Blockly.Arduino.ORDER_NONE) || 'false';
      branch = Blockly.Arduino.statementToCode(block, 'DO' + n);
      code += ' else if (' + argument + ') {\n' + branch + '}';
    }
    if (block.elseCount_) {
      branch = Blockly.Arduino.statementToCode(block, 'ELSE');
      code += ' else {\n' + branch + '}';
    }
    return code + '\n';
  };
//============================================================================================================//
Blockly.Arduino['controls_Wait'] = function() {
    var delay_time = Blockly.Arduino.valueToCode(this, 'DELAY_TIME', Blockly.Arduino.ORDER_ATOMIC);
    var code = 'delay(' + delay_time + ');\n';
    return code;
};

//============================================================================================================//
Blockly.Arduino['controls_for'] = function(block) {
  var variable0 = Blockly.Arduino.nameDB_.getName(block.getFieldValue('VAR'), Blockly.Names.NameType.VARIABLE); 
  var argument0 = Blockly.Arduino.valueToCode(block, 'FROM',Blockly.Arduino.ORDER_ASSIGNMENT) || '0';
  var argument1 = Blockly.Arduino.valueToCode(block, 'TO',Blockly.Arduino.ORDER_ASSIGNMENT) || '0';
  var increment = Blockly.Arduino.valueToCode(block, 'BY',Blockly.Arduino.ORDER_ASSIGNMENT) || '1';

  var branch = Blockly.Arduino.statementToCode(block, 'DO');
  branch = Blockly.Arduino.addLoopTrap(branch, block.id);
  var code;

  // console.log(Blockly.getMainWorkspace());
  // console.log(block.getChildren()[3].getNextBlock().getNextBlock());

  var connectedBlock = ""
  let child = block.getChildren()[3]
  while (child != null) {
    connectedBlock += child.type + ","
    child = child.getNextBlock();
  }

  
  if (connectedBlock.includes("digitalwrite")){
    var up = parseFloat(argument0) <= parseFloat(argument1);
    code = '  for (int ' + variable0 + ' = ' + argument0 + '; ' + variable0 + (up ? ' <= ' : ' >= ') + argument1 + '; ' + variable0;
    var step = Math.abs(parseFloat(increment));
    if (step == 1) { code += up ? '++' : '--'; }
    else {
      code += (up ? ' += ' : ' -= ') + step;
    }
    code += ') {\n' + "    pinMode(" + variable0 + ", OUTPUT);" + '\n  }\n';

    Blockly.Arduino.addSetup('io_' + variable0 , code, false);
  }



  if (Blockly.isNumber(argument0) && Blockly.isNumber(argument1) && Blockly.isNumber(increment)) {

    var up = parseFloat(argument0) <= parseFloat(argument1);
    code = 'for (int ' + variable0 + ' = ' + argument0 + '; ' +variable0 + (up ? ' <= ' : ' >= ') + argument1 + '; ' +variable0;
    var step = Math.abs(parseFloat(increment)); 
    if (step == 1) {code += up ? '++' : '--';}
    else {
      code += (up ? ' += ' : ' -= ') + step;
    }
    code += ') {\n' + branch + '}\n';

    
  } 
  return code;
};

//============================================================================================================//
Blockly.Arduino.controls_if = function() {
  // If/elseif/else condition.
  var n = 0;
  var argument = Blockly.Arduino.valueToCode(this, 'IF' + n,
      Blockly.Arduino.ORDER_NONE) || 'false';
  var branch = Blockly.Arduino.statementToCode(this, 'DO' + n);
  var code = 'if (' + argument + ') {\n' + branch + '\n}';
  for (n = 1; n <= this.elseifCount_; n++) {
    argument = Blockly.Arduino.valueToCode(this, 'IF' + n,
      Blockly.Arduino.ORDER_NONE) || 'false';
    branch = Blockly.Arduino.statementToCode(this, 'DO' + n);
    code += ' else if (' + argument + ') {\n' + branch + '}';
  }
  if (this.elseCount_) {
    branch = Blockly.Arduino.statementToCode(this, 'ELSE');
    code += ' else {\n' + branch + '\n}';
  }
  return code + '\n';
};
//============================================================================================================//
Blockly.Arduino.controls_repeat = function() {
  // Repeat n times.
  var repeats = this.getFieldValue ('TIMES');
  var branch = Blockly.Arduino.statementToCode(this, 'DO');
  if (Blockly.Arduino.INFINITE_LOOP_TRAP) {
    branch = Blockly.Arduino.INFINITE_LOOP_TRAP.replace(/%1/g,
        '\'' + this.id + '\'') + branch;
  }
  var loopVar = Blockly.Arduino.nameDB_.getDistinctName(
      'count', Blockly.Variables.NAME_TYPE);
  var code = 'for (int ' + loopVar + ' = 0; ' +
      loopVar + ' < ' + repeats + '; ' +
      loopVar + '++) {\n' +
      branch + '}\n';
  return code;
};
//============================================================================================================//
Blockly.Arduino.controls_repeat_ext = function() {
  // Repeat n times.
  var repeats = Blockly.Arduino.valueToCode(this, 'TIMES',
      Blockly.Arduino.ORDER_ASSIGNMENT) || '0';
  var branch = Blockly.Arduino.statementToCode(this, 'DO');
  if (Blockly.Arduino.INFINITE_LOOP_TRAP) {
    branch = Blockly.Arduino.INFINITE_LOOP_TRAP.replace(/%1/g,
        '\'' + this.id + '\'') + branch;
  }
  var loopVar = Blockly.Arduino.nameDB_.getName('count', Blockly.Names.NameType.VARIABLE);
  var code = 'for (int ' + loopVar + ' = 0; ' +
      loopVar + ' < ' + repeats + '; ' +
      loopVar + '++) {\n' +
      branch + '}\n';
  return code;
};
//============================================================================================================//
Blockly.Arduino.controls_whileUntil = function() {
  // Do while/until loop.
  var argument0 = Blockly.Arduino.valueToCode(this, 'BOOL',
      Blockly.Arduino.ORDER_NONE) || 'false';
  var branch = Blockly.Arduino.statementToCode(this, 'DO');
  if (Blockly.Arduino.INFINITE_LOOP_TRAP) {
    branch = Blockly.Arduino.INFINITE_LOOP_TRAP.replace(/%1/g,
        '\'' + this.id + '\'') + branch;
  }
  if (this.getFieldValue ('MODE') == 'UNTIL') {
    if (!argument0.match(/^\w+$/)) {
      argument0 = '(' + argument0 + ')';
    }
    argument0 = '!' + argument0;
  }
  return 'while (' + argument0 + ') {\n' + branch + '}\n';
};
//============================================================================================================//
Blockly.Arduino.controls_flow_statements = function() {
  // Flow statements: continue, break.
  switch (this.getFieldValue ('FLOW')) {
    case 'BREAK':
      return 'break;\n';
    case 'CONTINUE':
      return 'continue;\n';
  }
  throw 'Unknown flow statement.';
};
