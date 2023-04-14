import  Blockly from 'blockly/core';
import Colors from "./Colors"

//============================================================================================================//
Blockly.Blocks['controls_if'] = {
    init: function () {
        this.jsonInit({
            "type": "controls_if",
            "message0": "%{BKY_CONTROLS_IF_MSG_IF} %1",
            "args0": [
                {
                    "type": "input_value",
                    "name": "IF0",
                    "check": "Boolean"
                }
            ],
            "message1": "%{BKY_CONTROLS_IF_MSG_THEN} %1",
            "args1": [
                {
                    "type": "input_statement",
                    "name": "DO0"
                }
            ],
            "previousStatement": null,
            "nextStatement": null,
            "colour": Colors.control.primary,
            "helpUrl": "%{BKY_CONTROLS_IF_HELPURL}",
            "mutator": "controls_if_mutator",
            "extensions": ["controls_if_tooltip"]
        });
    }
};
//============================================================================================================//
Blockly.Blocks['controls_repeat_ext'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.CONTROLS_REPEAT_TITLE,
            "args0": [
                {
                    "type": "input_value",
                    "name": "TIMES",
                    "check": "Number"
                }
            ],
            "previousStatement": null,
            "nextStatement": null,
            "colour": Colors.control.primary,
            "tooltip": Blockly.Msg.CONTROLS_REPEAT_TOOLTIP,
            "helpUrl": Blockly.Msg.CONTROLS_REPEAT_HELPURL
        });
        this.appendStatementInput('DO')
            .appendField(Blockly.Msg.CONTROLS_REPEAT_INPUT_DO);
    }
};
//============================================================================================================// 
Blockly.Blocks['controls_repeat'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.CONTROLS_REPEAT_TITLE,
            "args0": [
                {
                    "type": "field_number",
                    "name": "TIMES",
                    "value": 10,
                    "min": 0,
                    "precision": 1
                }
            ],
            "previousStatement": null,
            "nextStatement": null,
            "colour": Colors.control.primary,
            "tooltip": Blockly.Msg.CONTROLS_REPEAT_TOOLTIP,
            "helpUrl": Blockly.Msg.CONTROLS_REPEAT_HELPURL
        });
        this.appendStatementInput('DO')
            .appendField(Blockly.Msg.CONTROLS_REPEAT_INPUT_DO);
    }
};
//============================================================================================================// 
Blockly.Blocks['controls_whileUntil'] = {
    init: function () {
        var OPERATORS =
            [[Blockly.Msg.CONTROLS_WHILEUNTIL_OPERATOR_WHILE, 'WHILE'],
            [Blockly.Msg.CONTROLS_WHILEUNTIL_OPERATOR_UNTIL, 'UNTIL']];
        this.setHelpUrl(Blockly.Msg.CONTROLS_WHILEUNTIL_HELPURL);
        this.setColour(Colors.control.primary,);
        this.appendValueInput('BOOL')
            .setCheck('Boolean')
            .appendField(new Blockly.FieldDropdown(OPERATORS), 'MODE');
        this.appendStatementInput('DO')
            .appendField(Blockly.Msg.CONTROLS_WHILEUNTIL_INPUT_DO);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        // Assign 'this' to a variable for use in the tooltip closure below.
        var thisBlock = this;
        this.setTooltip(function () {
            var op = thisBlock.getFieldValue('MODE');
            var TOOLTIPS = {
                'WHILE': Blockly.Msg.CONTROLS_WHILEUNTIL_TOOLTIP_WHILE,
                'UNTIL': Blockly.Msg.CONTROLS_WHILEUNTIL_TOOLTIP_UNTIL
            };
            return TOOLTIPS[op];
        });
    }
};
//============================================================================================================// 
Blockly.Blocks['controls_for'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.CONTROLS_FOR_TITLE,
            "args0": [
                {
                    "type": "field_variable",
                    "name": "VAR",
                    "variable": null
                },
                {
                    "type": "input_value",
                    "name": "FROM",
                    "check": "Number",
                    "align": "RIGHT"
                },
                {
                    "type": "input_value",
                    "name": "TO",
                    "check": "Number",
                    "align": "RIGHT"
                },
                {
                    "type": "input_value",
                    "name": "BY",
                    "check": "Number",
                    "align": "RIGHT"
                }
            ],
            "inputsInline": true,
            "previousStatement": null,
            "nextStatement": null,
            "colour": Colors.control.primary,
            "helpUrl": Blockly.Msg.CONTROLS_FOR_HELPURL
        });
        this.appendStatementInput('DO')
            .appendField(Blockly.Msg.CONTROLS_FOR_INPUT_DO);
        // Assign 'this' to a variable for use in the tooltip closure below.
        var thisBlock = this;
        this.setTooltip(function () {
            return Blockly.Msg.CONTROLS_FOR_TOOLTIP.replace('%1',
                thisBlock.getFieldValue('VAR'));
        });
    },
    getVarType: function (varName) {
        return Blockly.Types.NUMBER;
    }
};
//============================================================================================================// 
Blockly.Blocks['controls_flow_statements'] = {
    init: function () {
        var OPERATORS =
            [[Blockly.Msg.CONTROLS_FLOW_STATEMENTS_OPERATOR_BREAK, 'BREAK'],
            [Blockly.Msg.CONTROLS_FLOW_STATEMENTS_OPERATOR_CONTINUE, 'CONTINUE']];
        this.setHelpUrl(Blockly.Msg.CONTROLS_FLOW_STATEMENTS_HELPURL);
        this.setColour(Colors.control.primary);
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown(OPERATORS), 'FLOW');
        this.setPreviousStatement(true);
        // Assign 'this' to a variable for use in the tooltip closure below.
        var thisBlock = this;
        this.setTooltip(function () {
            var op = thisBlock.getFieldValue('FLOW');
            var TOOLTIPS = {
                'BREAK': Blockly.Msg.CONTROLS_FLOW_STATEMENTS_TOOLTIP_BREAK,
                'CONTINUE': Blockly.Msg.CONTROLS_FLOW_STATEMENTS_TOOLTIP_CONTINUE
            };
            return TOOLTIPS[op];
        });
    },
    LOOP_TYPES: ['controls_repeat', 'controls_repeat_ext', 'controls_forEach',
        'controls_for', 'controls_whileUntil']
};
