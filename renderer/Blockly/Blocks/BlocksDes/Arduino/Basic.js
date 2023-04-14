import  Blockly from 'blockly/core';
import Colors from "../Colors";
//===============================================================================//
Blockly.Blocks.base_begin = {
    init: function () {
        this.setColour(Colors.Arduino.primary);
        this.setHelpUrl(Blockly.Msg.ARDUINO_BASE_SETUP_HELPURL);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.ARDUINO_BASE_BEGIN);
        this.appendStatementInput('base_begin');
        this.setTooltip("Exécuté seulement dans le 'Setup'");
    },
    getArduinoLoopsInstance: function () {
        return true;
    } 
};
//===============================================================================//base_begin
Blockly.Blocks['pinmode'] = {
    init: function () {
        this.setColour(Colors.Arduino.primary);
        this.setHelpUrl(Blockly.Msg.ARDUINO_INOUT_DIGITAL_MODE_HELPURL);
        this.appendDummyInput("")
            .appendField(new Blockly.FieldDropdown(Blockly.Msg.ARDUINO_INOUT_DIGITAL_MODE_DROPDOWN), 'PINMODE');
        this.setOutput(true, 'Null');
        this.setTooltip(Blockly.Msg.ARDUINO_INOUT_DIGITAL_MODE_TOOLTIP);
    }
};

//===============================================================================//
Blockly.Blocks['base_define_name'] = {
    init: function () {
        this.setHelpUrl(Blockly.Msg.TEXT_TEXT_HELPURL);
        this.setColour(Colors.Arduino.primary);
        this.appendDummyInput()
            .appendField(new Blockly.FieldTextInput(''), 'NAME')
        this.setOutput(true, 'Null');
        var thisBlock = this;
        this.setTooltip(function () {
            var parent = thisBlock.getParent();
            return (parent && parent.getInputsInline() && parent.tooltip) ||
                Blockly.Msg.TEXT_TEXT_TOOLTIP;
        });
    }
}
//===============================================================================//
Blockly.Blocks.base_define = {
    init: function () {
        this.setHelpUrl(Blockly.Msg.ARDUINO_BASE_DEFINE_CONST_HELPURL);
        this.setColour(Colors.Arduino.primary);
        this.appendValueInput("NAME", 'Null')
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(Blockly.Msg.ARDUINO_BASE_DEFINE_CONST_INPUT1);
        this.appendDummyInput()
            .appendField(' Pin ')
            .appendField(new Blockly.FieldDropdown(Blockly.Arduino.Boards.selected.digitalPins), 'PIN');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip(Blockly.Msg.ARDUINO_BASE_DEFINE_CONST_TOOLTIP);
    }
};
//===============================================================================//

Blockly.Blocks.base_setup = {
    init: function () {
        this.setColour(Colors.Arduino.primary);
        this.setHelpUrl(Blockly.Msg.ARDUINO_BASE_SETUP_HELPURL);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.ARDUINO_BASE_SETUP);
        this.appendStatementInput('DO');
        this.setTooltip("Exécuté seulement dans le 'Setup'");
    },
    getArduinoLoopsInstance: function () {
        return true;
    }
};
//===============================================================================//
Blockly.Blocks['base_setup_loop'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(Blockly.Msg.ARDUINO_BASE_SETUP);
        this.appendStatementInput('SETUP_FUNC');
        this.appendDummyInput()
            .appendField(Blockly.Msg.ARDUINO_BASE_LOOP);
        this.appendStatementInput('LOOP_FUNC');
        this.setInputsInline(false);
        this.setColour(Colors.Arduino.primary);
        this.setTooltip("Définis le 'setup()' et le 'loop()'");
        this.setHelpUrl('https://arduino.cc/en/Reference/Loop');
        this.contextMenu = false;
    },
    getArduinoLoopsInstance: function () {
        return true;
    }
};
//===============================================================================//
Blockly.Blocks.base_loop = {
    init: function () {
        this.setColour(Colors.Arduino.primary);
        this.setHelpUrl(Blockly.Msg.ARDUINO_BASE_SETUP_LOOP_HELPURL);
        this.appendDummyInput()
            .appendField(Blockly.Msg.ARDUINO_BASE_LOOP);
        this.appendStatementInput('LOOP_FUNC');
        this.setInputsInline(false);
        this.setTooltip("Exécuté seulement dans le 'Loop'");
        this.contextMenu = false;
    },
    getArduinoLoopsInstance: function () {
        return true;
    }
};
//===============================================================================//
Blockly.Blocks.base_define_bloc = {
    init: function () {
        this.setColour(Colors.Arduino.primary);
        this.setHelpUrl(Blockly.Msg.ARDUINO_BASE_DEFINE_HELPURL);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.ARDUINO_BASE_DEFINE);
        this.appendStatementInput('DO')
            .appendField(Blockly.LANG_CONTROLS_REPEAT_INPUT_DO);
        this.setTooltip(Blockly.Msg.ARDUINO_BASE_DEFINE_TOOLTIP);
    }
};
//===============================================================================//
Blockly.Blocks.base_code = {
    init: function () {
        this.setHelpUrl(Blockly.Msg.TEXT_TEXT_HELPURL);
        this.setColour(Colors.Arduino.primary);
        this.appendDummyInput()
            .appendField(Blockly.Msg.ARDUINO_BASE_CODE)
            .appendField(new Blockly.FieldTextInput(''), 'TEXT');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip(Blockly.Msg.TEXT_TEXT_TOOLTIP);
    }
};
//===============================================================================//
Blockly.Blocks.base_comment = {
    init: function () {
        this.setHelpUrl(Blockly.Msg.ARDUINO_BASE_COMMENT_HELPURL);
        this.setColour(Colors.Arduino.primary);
        this.appendDummyInput()
            .appendField(Blockly.Msg.ARDUINO_BASE_COMMENT_TEXT)
            .appendField(new Blockly.FieldTextInput(''), 'TEXT');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip(Blockly.Msg.TEXT_TEXT_TOOLTIP);
    }
};
//===============================================================================//
Blockly.Blocks.base_end = {
    init: function () {
        this.setHelpUrl('');
        this.setColour(Colors.Arduino.primary);
        this.appendDummyInput()
            .appendField(Blockly.Msg.ARDUINO_BASE_END);
        this.setPreviousStatement(true, null);
        this.setTooltip(Blockly.Msg.END_TOOLTIP);
    }
};
