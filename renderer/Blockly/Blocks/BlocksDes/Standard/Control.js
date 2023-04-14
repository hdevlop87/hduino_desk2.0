import Blockly from 'blockly/core';
import Colors from "../Colors"


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
            'message0': '%{BKY_CONTROLS_REPEAT_TITLE}',
            "args0": [
                {
                    "type": "input_value",
                    "name": "TIMES",
                    "check": "Number"
                }
            ],
            'message1': '%{BKY_CONTROLS_REPEAT_INPUT_DO} %1',
            'args1': [{
              'type': 'input_statement',
              'name': 'DO',
            }],
            "previousStatement": null,
            "nextStatement": null,
            "colour": Colors.control.primary,
            "tooltip": Blockly.Msg.CONTROLS_REPEAT_TOOLTIP,
            "helpUrl": Blockly.Msg.CONTROLS_REPEAT_HELPURL
        });
    }
};
//============================================================================================================// 
Blockly.Blocks['controls_repeat'] = {
    init: function () {
        this.jsonInit({
            'message0': '%{BKY_CONTROLS_REPEAT_TITLE}',
            "args0": [
                {
                    "type": "field_number",
                    "name": "TIMES",
                    "value": 10,
                    "min": 0,
                    "precision": 1
                }
            ],
            'message1': '%{BKY_CONTROLS_REPEAT_INPUT_DO} %1',
            'args1': [{
              'type': 'input_statement',
              'name': 'DO',
            }],
            "previousStatement": null,
            "nextStatement": null,
            "colour": Colors.control.primary,
            "tooltip": Blockly.Msg.CONTROLS_REPEAT_TOOLTIP,
            "helpUrl": Blockly.Msg.CONTROLS_REPEAT_HELPURL
        });
    }
};
//============================================================================================================// 
Blockly.Blocks['controls_whileUntil'] = {
    init: function () {
        this.jsonInit({
            'message0': '%1 %2',
            'args0': [
              {
                'type': 'field_dropdown',
                'name': 'MODE',
                'options': [
                  ['%{BKY_CONTROLS_WHILEUNTIL_OPERATOR_WHILE}', 'WHILE'],
                  ['%{BKY_CONTROLS_WHILEUNTIL_OPERATOR_UNTIL}', 'UNTIL'],
                ],
              },
              {
                'type': 'input_value',
                'name': 'BOOL',
                'check': 'Boolean',
              },
            ],
            'message1': '%{BKY_CONTROLS_REPEAT_INPUT_DO} %1',
            'args1': [{
              'type': 'input_statement',
              'name': 'DO',
            }],
            'previousStatement': null,
            'nextStatement': null,
            "colour": Colors.control.primary,
            'helpUrl': '%{BKY_CONTROLS_WHILEUNTIL_HELPURL}',
            'extensions': ['controls_whileUntil_tooltip'],
        });
    }
};
//============================================================================================================// 
Blockly.Blocks['controls_for'] = {
    init: function () {
        this.jsonInit({
            'message0': '%{BKY_CONTROLS_FOR_TITLE}',
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
        this.jsonInit({
            'message0': '%1',
            'args0': [{
              'type': 'field_dropdown',
              'name': 'FLOW',
              'options': [
                ['%{BKY_CONTROLS_FLOW_STATEMENTS_OPERATOR_BREAK}', 'BREAK'],
                ['%{BKY_CONTROLS_FLOW_STATEMENTS_OPERATOR_CONTINUE}', 'CONTINUE'],
              ],
            }],
            'previousStatement': null,
            "colour": Colors.control.primary,
            'helpUrl': '%{BKY_CONTROLS_FLOW_STATEMENTS_HELPURL}',
            'suppressPrefixSuffix': true,
            'extensions': [
              'controls_flow_tooltip',
              'controls_flow_in_loop_check',
            ],
        });
    },
}; 
