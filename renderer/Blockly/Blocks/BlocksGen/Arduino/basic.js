import  Blockly from 'blockly/core';
import '../../../ArduinoUtils/generator_arduino'

Blockly.Arduino.base_begin = function () {
    var branch = Blockly.Arduino.statementToCode(this, 'base_begin');
    if (Blockly.Arduino.INFINITE_LOOP_TRAP) {
        branch = Blockly.Arduino.INFINITE_LOOP_TRAP.replace(/%1/g, '\'' + this.id + '\'') + branch;
    }
    var code =
        branch;
    var setup_key = Blockly.Arduino.nameDB_.getDistinctName('base_begin', Blockly.Variables.NAME_TYPE);
    Blockly.Arduino.setups_[setup_key] = code;
    return "";
};
//======================================================================//
Blockly.Arduino.base_setup = function () {
    var branch = Blockly.Arduino.statementToCode(this, 'DO');
    if (Blockly.Arduino.INFINITE_LOOP_TRAP) {
        branch = Blockly.Arduino.INFINITE_LOOP_TRAP.replace(/%1/g, '\'' + this.id + '\'') + branch;
    }
    var code = //'{\n' +
        branch;// + '\n}\n';
    var setup_key = Blockly.Arduino.nameDB_.getDistinctName('base_setup', Blockly.Variables.NAME_TYPE);
    Blockly.Arduino.setups_[setup_key] = code;
    return ""; //do not return any actual code
};
//======================================================================//
Blockly.Arduino.pinmode = function () {
    return [this.getFieldValue('PINMODE'), Blockly.Arduino.ORDER_ATOMIC];
};
//======================================================================//
Blockly.Arduino['base_define_name'] = function () {
    var code = this.getFieldValue('NAME');
    return [code, Blockly.Arduino.ORDER_ATOMIC];
};
//======================================================================//
Blockly.Arduino.base_define = function () {
    // Text value.
    var value_text1 = Blockly.Arduino.valueToCode(this, 'NAME', Blockly.Arduino.ORDER_ATOMIC);
    var value_text2 = this.getFieldValue('PIN');
    Blockly.Arduino.includes_[value_text1] = '#define ' + value_text1 + ' ' + value_text2; 
    return "";
}; 

//======================================================================//
Blockly.Arduino.base_loop = function (block) {
    function statementToCodeNoTab(block, name) {
        var targetBlock = block.getInputTargetBlock(name);
        var code = Blockly.Arduino.blockToCode(targetBlock);
        return code;
    }
    var setupBranch = Blockly.Arduino.statementToCode(block, 'SETUP_FUNC');
    if (setupBranch) {
        Blockly.Arduino.addSetup('userSetupCode', setupBranch, true);
    }
    var loopBranch = statementToCodeNoTab(block, 'LOOP_FUNC');
    if (loopBranch) {
        Blockly.Arduino.addLoop('userLoopCode', loopBranch, true);
    }
    return '';
};
//======================================================================//
Blockly.Arduino['base_setup_loop'] = function (block) {
    function statementToCodeNoTab(block, name) {
        var targetBlock = block.getInputTargetBlock(name);
        var code = Blockly.Arduino.blockToCode(targetBlock);
        return code;
    }
    var setupBranch = Blockly.Arduino.statementToCode(block, 'SETUP_FUNC');
    if (setupBranch) {
        Blockly.Arduino.addSetup('userSetupCode', setupBranch, true);
    }
    var loopBranch = statementToCodeNoTab(block, 'LOOP_FUNC');
    return loopBranch;
};

Blockly.Arduino.base_define_bloc = function () {
    var branch = Blockly.Arduino.statementToCode(this, 'DO');
    if (Blockly.Arduino.INFINITE_LOOP_TRAP) {
        branch = Blockly.Arduino.INFINITE_LOOP_TRAP.replace(/%1/g, '\'' + this.id + '\'') + branch;
    }
    var setup_key = Blockly.Arduino.nameDB_.getDistinctName('base_setup', Blockly.Variables.NAME_TYPE);
    Blockly.Arduino.variables_[setup_key] = branch;

    // branch = Blockly.Arduino.scrub_(block, branch);
    // Blockly.Arduino.variables_[setup_key] = branch;

    return "";
};



Blockly.Arduino.base_code = function () {
    // Text value.
    var code = this.getFieldValue('TEXT') + '\n';
    return code;
};

Blockly.Arduino.base_comment = function () {
    // Text value.
    var code = '// ' + this.getFieldValue('TEXT') + '\n';
    return code;
};

Blockly.Arduino.base_end = function () {
    // Forever loop.
    var code = 'while(true);\n';
    return code;
};