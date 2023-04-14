import  Blockly from 'blockly/core';
import '../../../ArduinoUtils/generator_arduino'

Blockly.Arduino.procedures_defreturn = function (block) {
    var funcName = Blockly.Arduino.nameDB_.getName(block.getFieldValue('NAME'), Blockly.Procedures.NAME_TYPE);
    var branch = Blockly.Arduino.statementToCode(block, 'STACK');
    if (Blockly.Arduino.INFINITE_LOOP_TRAP) {
        branch = Blockly.Arduino.INFINITE_LOOP_TRAP.replace(/%1/g, '\'' + block.id + '\'') + branch;
    }
    var returnValue = Blockly.Arduino.valueToCode(block, 'RETURN', Blockly.Arduino.ORDER_NONE) || '';
    if (returnValue) {
        returnValue = '  return ' + returnValue + ';\n';
    }
    // Get return type
    var returnType = Blockly.Types.NULL;
    if (block.getReturnType) {
        returnType = block.getReturnType();
    }
    returnType = Blockly.Arduino.getArduinoType_(returnType);


    var args = '';
    for (var x = 0; x < block.arguments_.length; x++) {
        var arg = '';
        var argType = '';

        argType = Blockly.Arduino.getArduinoType_(Blockly.Types.NUMBER);
        
        arg = Blockly.Arduino.nameDB_.getName(block.arguments_[x], Blockly.Names.NameType.VARIABLE);
        args += argType + ' ' + arg + ', ';
    }
    var code = returnType + ' ' + funcName + '(' + args.slice(0, -2) + ') {\n' + branch + returnValue + '}\n';
    code = Blockly.Arduino.scrub_(block, code);
    Blockly.Arduino.codeFunctions_[funcName] = code;
    return null;
};


Blockly.Arduino['procedures_defnoreturn'] =
    Blockly.Arduino['procedures_defreturn'];

Blockly.Arduino['procedures_callreturn'] = function (block) {
    var funcName = Blockly.Arduino.nameDB_.getName(
        block.getFieldValue('NAME'), Blockly.Names.NameType.VARIABLE);
    var args = [];
    for (var x = 0; x < block.arguments_.length; x++) {
        args[x] = Blockly.Arduino.valueToCode(block, 'ARG' + x,
            Blockly.Arduino.ORDER_NONE) || 'null';
    }
    var code = funcName + '(' + args.join(', ') + ')';
    return [code, Blockly.Arduino.ORDER_UNARY_POSTFIX];
};


Blockly.Arduino['procedures_callnoreturn'] = function (block) {
    var funcName = Blockly.Arduino.nameDB_.getName(
block.getFieldValue('NAME'), Blockly.Names.NameType.VARIABLE);
    var args = [];
    for (var x = 0; x < block.arguments_.length; x++) {
        args[x] = Blockly.Arduino.valueToCode(block, 'ARG' + x,
            Blockly.Arduino.ORDER_NONE) || 'null';
    }
    var code = funcName + '(' + args.join(', ') + ');\n';
    return code;
};


Blockly.Arduino['procedures_ifreturn'] = function (block) {
    var condition = Blockly.Arduino.valueToCode(block, 'CONDITION',
        Blockly.Arduino.ORDER_NONE) || 'false';
    var code = 'if (' + condition + ') {\n';
    if (block.hasReturnValue_) {
        var value = Blockly.Arduino.valueToCode(block, 'VALUE',
            Blockly.Arduino.ORDER_NONE) || 'null';
        code += '  return ' + value + ';\n';
    } else {
        code += '  return;\n';
    }
    code += '}\n';
    return code;
};


Blockly.Arduino['arduino_functions'] = function (block) {
    // Edited version of Blockly.Generator.prototype.statementToCode
    function statementToCodeNoTab(block, name) {
        var targetBlock = block.getInputTargetBlock(name);
        var code = Blockly.Arduino.blockToCode(targetBlock);
        if (!String.isString(code)) {
            throw 'Expecting code from statement block "' + targetBlock.type + '".';
        }
        return code;
    }

    var setupBranch = Blockly.Arduino.statementToCode(block, 'SETUP_FUNC');
    //var setupCode = Blockly.Arduino.scrub_(block, setupBranch); No comment block
    if (setupBranch) {
        Blockly.Arduino.addSetup('userSetupCode', setupBranch, true);
    }

    var loopBranch = statementToCodeNoTab(block, 'LOOP_FUNC');
    //var loopcode = Blockly.Arduino.scrub_(block, loopBranch); No comment block
    return loopBranch;
};