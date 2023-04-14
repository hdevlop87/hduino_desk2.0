import * as Blockly from 'blockly/core';
import '../../../ArduinoUtils/generator_ard_python';

Blockly.PyArduino.base_begin = function () {
    var branch = Blockly.PyArduino.statementToCode(this, 'base_begin');
    if (Blockly.PyArduino.INFINITE_LOOP_TRAP) {
        branch = Blockly.PyArduino.INFINITE_LOOP_TRAP.replace(/%1/g, '\'' + this.id + '\'') + branch;
    }
    var code = branch;
    var setup_key = Blockly.PyArduino.nameDB_.getDistinctName('base_begin', Blockly.Variables.NAME_TYPE);
    Blockly.PyArduino.setups_[setup_key] = code;
    return "";
};
//======================================================================//
Blockly.PyArduino.base_setup = function () {
    var branch = Blockly.PyArduino.statementToCode(this, 'DO');
    if (Blockly.PyArduino.INFINITE_LOOP_TRAP) {
        branch = Blockly.PyArduino.INFINITE_LOOP_TRAP.replace(/%1/g, '\'' + this.id + '\'') + branch;
    }
    var code = branch;
    var setup_key = Blockly.PyArduino.nameDB_.getDistinctName('base_setup', Blockly.Variables.NAME_TYPE);
    Blockly.PyArduino.setups_[setup_key] = code;
    return ""; 
};
//======================================================================//
Blockly.PyArduino.pinmode = function () {
    return [this.getFieldValue('PINMODE'), Blockly.PyArduino.ORDER_ATOMIC];
};
//======================================================================//
Blockly.PyArduino['base_define_name'] = function () {
    var code = this.getFieldValue('NAME');
    return [code, Blockly.PyArduino.ORDER_ATOMIC];
};
//======================================================================//
Blockly.PyArduino.base_define = function () {
    // Text value.
    var value_text1 = Blockly.PyArduino.valueToCode(this, 'NAME', Blockly.PyArduino.ORDER_ATOMIC);
    var value_text2 = this.getFieldValue('PIN');
    Blockly.PyArduino.includes_[value_text1] = '#define ' + value_text1 + ' ' + value_text2;
    return "";
};
//======================================================================//
Blockly.PyArduino.base_loop = function (block) {
    function statementToCodeNoTab(block, name) {
        var targetBlock = block.getInputTargetBlock(name);
        var code = Blockly.PyArduino.blockToCode(targetBlock);
        return code;
    }
    var setupBranch = Blockly.PyArduino.statementToCode(block, 'SETUP_FUNC');
    if (setupBranch) {
        Blockly.PyArduino.addSetup('userSetupCode', setupBranch, true);
    }
    var loopBranch = statementToCodeNoTab(block, 'LOOP_FUNC');
    if (loopBranch) {
        Blockly.PyArduino.addLoop('userLoopCode', loopBranch, true);
    }
    return '';
};
//======================================================================//
Blockly.PyArduino['base_setup_loop'] = function (block) {
    function statementToCodeNoTab(block, name) {
        var targetBlock = block.getInputTargetBlock(name);
        var code = Blockly.PyArduino.blockToCode(targetBlock);
        return code;
    }
    var setupBranch = Blockly.PyArduino.statementToCode(block, 'SETUP_FUNC');
    if (setupBranch) {
        Blockly.PyArduino.addSetup('userSetupCode', setupBranch, true);
    }
    var loopBranch = statementToCodeNoTab(block, 'LOOP_FUNC');
    return loopBranch;
};

Blockly.PyArduino.base_define_bloc = function () {
    var branch = Blockly.PyArduino.statementToCode(this, 'DO');
    if (Blockly.PyArduino.INFINITE_LOOP_TRAP) {
        branch = Blockly.PyArduino.INFINITE_LOOP_TRAP.replace(/%1/g, '\'' + this.id + '\'') + branch;
    }
    var setup_key = Blockly.PyArduino.nameDB_.getDistinctName('base_setup', Blockly.Variables.NAME_TYPE);
    Blockly.PyArduino.variables_[setup_key] = branch;

    // branch = Blockly.PyArduino.scrub_(block, branch);
    // Blockly.PyArduino.variables_[setup_key] = branch;

    return "";
};
//======================================================================//
Blockly.PyArduino.base_code = function () {
    // Text value.
    var code = this.getFieldValue('TEXT') + '\n';
    return code;
};
//======================================================================//
Blockly.PyArduino.base_comment = function () {
    // Text value.
    var code = '// ' + this.getFieldValue('TEXT') + '\n';
    return code;
};
//======================================================================//
Blockly.PyArduino.base_end = function () {
    // Forever loop.
    var code = 'while(true);\n';
    return code;
};