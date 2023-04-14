import Blockly from 'blockly/core';
import Colors from "../Colors"

Blockly.Blocks['math_number'] = {
    /**
     * Block for numeric value.
     * @this Blockly.Block
     */
    init: function () {
        this.setHelpUrl(Blockly.Msg.MATH_NUMBER_HELPURL);
        this.setColour(Colors.Math.primary);
        this.appendDummyInput()
            .appendField(
                new Blockly.FieldTextInput(
                    '0', Blockly.FieldTextInput.numberValidator),
                'NUM');
        this.setOutput(true, Blockly.Types.NUMBER.output);
        // Assign 'this' to a variable for use in the tooltip closure below.
        var thisBlock = this;
        // Number block is trivial.  Use tooltip of parent block if it exists.
        this.setTooltip(function () {
            var parent = thisBlock.getParent();
            return (parent && parent.getInputsInline() && parent.tooltip) ||
                Blockly.Msg.MATH_NUMBER_TOOLTIP;
        });
    },
    /**
     * Reads the numerical value from the block and assigns a block type.
     * @this Blockly.Block
     */
    getBlockType: function () {
        var numString = this.getFieldValue('NUM');
        return Blockly.Types.identifyNumber(numString);
    }
};

Blockly.Blocks['math_arithmetic'] = {
    init: function () {
        this.jsonInit({
            'message0': '%1 %2 %3',
            'args0': [
                {
                    'type': 'input_value',
                    'name': 'A',
                    'check': 'Number',
                },
                {
                    'type': 'field_dropdown',
                    'name': 'OP',
                    'options': [
                        ['%{BKY_MATH_ADDITION_SYMBOL}', 'ADD'],
                        ['%{BKY_MATH_SUBTRACTION_SYMBOL}', 'MINUS'],
                        ['%{BKY_MATH_MULTIPLICATION_SYMBOL}', 'MULTIPLY'],
                        ['%{BKY_MATH_DIVISION_SYMBOL}', 'DIVIDE'],
                        ['%{BKY_MATH_POWER_SYMBOL}', 'POWER'],
                    ],
                },
                {
                    'type': 'input_value',
                    'name': 'B',
                    'check': 'Number',
                },
            ],
            'inputsInline': true,
            'output': 'Number',
            "colour": Colors.Math.primary,
            'helpUrl': '%{BKY_MATH_ARITHMETIC_HELPURL}',
            'extensions': ['math_op_tooltip'],
        });
    }
};

Blockly.Blocks['math_single'] = {

    init: function () {
        this.jsonInit({
            'message0': '%1 %2',
            'args0': [
                {
                    'type': 'field_dropdown',
                    'name': 'OP',
                    'options': [
                        ['%{BKY_MATH_SINGLE_OP_ROOT}', 'ROOT'],
                        ['%{BKY_MATH_SINGLE_OP_ABSOLUTE}', 'ABS'],
                        ['-', 'NEG'],
                        ['ln', 'LN'],
                        ['log10', 'LOG10'],
                        ['e^', 'EXP'],
                        ['10^', 'POW10'],
                    ],
                },
                {
                    'type': 'input_value',
                    'name': 'NUM',
                    'check': 'Number',
                },
            ],
            'output': 'Number',
            "colour": Colors.Math.primary,
            'helpUrl': '%{BKY_MATH_SINGLE_HELPURL}',
            'extensions': ['math_op_tooltip'],
        });
    },
    getBlockType: function () {
        return Blockly.Types.DECIMAL;
    }
};

Blockly.Blocks['math_trig'] = {

    init: function () {
        this.jsonInit({
            'message0': '%1 %2',
            'args0': [
                {
                    'type': 'field_dropdown',
                    'name': 'OP',
                    'options': [
                        ['%{BKY_MATH_TRIG_SIN}', 'SIN'],
                        ['%{BKY_MATH_TRIG_COS}', 'COS'],
                        ['%{BKY_MATH_TRIG_TAN}', 'TAN'],
                        ['%{BKY_MATH_TRIG_ASIN}', 'ASIN'],
                        ['%{BKY_MATH_TRIG_ACOS}', 'ACOS'],
                        ['%{BKY_MATH_TRIG_ATAN}', 'ATAN'],
                    ],
                },
                {
                    'type': 'input_value',
                    'name': 'NUM',
                    'check': 'Number',
                },
            ],
            'output': 'Number',
            "colour": Colors.Math.primary,
            'helpUrl': '%{BKY_MATH_TRIG_HELPURL}',
            'extensions': ['math_op_tooltip'],
        });
    },
    getBlockType: function () {
        return Blockly.Types.DECIMAL;
    }
};

Blockly.Blocks['math_constant'] = {

    init: function () {
        this.jsonInit({
            'message0': '%1',
            'args0': [
                {
                    'type': 'field_dropdown',
                    'name': 'CONSTANT',
                    'options': [
                        ['\u03c0', 'PI'],
                        ['e', 'E'],
                        ['\u03c6', 'GOLDEN_RATIO'],
                        ['sqrt(2)', 'SQRT2'],
                        ['sqrt(\u00bd)', 'SQRT1_2'],
                        ['\u221e', 'INFINITY'],
                    ],
                },
            ],
            'output': 'Number',
            "colour": Colors.Math.primary,
            'tooltip': '%{BKY_MATH_CONSTANT_TOOLTIP}',
            'helpUrl': '%{BKY_MATH_CONSTANT_HELPURL}',
        });
    }
};

Blockly.Blocks['math_number_property'] = {

    init: function () {
        this.jsonInit({
            'message0': '%1 %2',
            'args0': [
                {
                    'type': 'input_value',
                    'name': 'NUMBER_TO_CHECK',
                    'check': 'Number',
                },
                {
                    'type': 'field_dropdown',
                    'name': 'PROPERTY',
                    'options': [
                        ['%{BKY_MATH_IS_EVEN}', 'EVEN'],
                        ['%{BKY_MATH_IS_ODD}', 'ODD'],
                        ['%{BKY_MATH_IS_PRIME}', 'PRIME'],
                        ['%{BKY_MATH_IS_WHOLE}', 'WHOLE'],
                        ['%{BKY_MATH_IS_POSITIVE}', 'POSITIVE'],
                        ['%{BKY_MATH_IS_NEGATIVE}', 'NEGATIVE'],
                        ['%{BKY_MATH_IS_DIVISIBLE_BY}', 'DIVISIBLE_BY'],
                    ],
                },
            ],
            'inputsInline': true,
            'output': 'Boolean',
            "colour": Colors.Math.primary,
            'tooltip': '%{BKY_MATH_IS_TOOLTIP}',
            'mutator': 'math_is_divisibleby_mutator',
        });
    },

    getBlockType: function () {
        return Blockly.Types.BOOLEAN;
    }
};

Blockly.Blocks['math_change'] = {

    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.MATH_CHANGE_TITLE,
            "args0": [
                {
                    "type": "field_variable",
                    "name": "VAR",
                    "variable": Blockly.Msg.MATH_CHANGE_TITLE_ITEM
                },
                {
                    "type": "input_value",
                    "name": "DELTA",
                    "check": "Number"
                }
            ],
            "previousStatement": null,
            "nextStatement": null,
            "colour": Blockly.Blocks.variables.HUE,
            "helpUrl": Blockly.Msg.MATH_CHANGE_HELPURL
        });
    },
    getVarType: function (varName) {
        return Blockly.Types.NUMBER;
    }
};

Blockly.Blocks['math_round'] = {

    init: function () {
        this.jsonInit({
            'message0': '%1 %2',
            'args0': [
                {
                    'type': 'field_dropdown',
                    'name': 'OP',
                    'options': [
                        ['%{BKY_MATH_ROUND_OPERATOR_ROUND}', 'ROUND'],
                        ['%{BKY_MATH_ROUND_OPERATOR_ROUNDUP}', 'ROUNDUP'],
                        ['%{BKY_MATH_ROUND_OPERATOR_ROUNDDOWN}', 'ROUNDDOWN'],
                    ],
                },
                {
                    'type': 'input_value',
                    'name': 'NUM',
                    'check': 'Number',
                },
            ],
            'output': 'Number',
            "colour": Colors.Math.primary,
            'helpUrl': '%{BKY_MATH_ROUND_HELPURL}',
            'tooltip': '%{BKY_MATH_ROUND_TOOLTIP}',
        });
    },
    getBlockType: function () {
        return Blockly.Types.DECIMAL;
    }
};

Blockly.Blocks['math_on_list'] = {

    init: function () {
        this.jsonInit({
            'message0': '%1 %2',
            'args0': [
                {
                    'type': 'field_dropdown',
                    'name': 'OP',
                    'options': [
                        ['%{BKY_MATH_ONLIST_OPERATOR_SUM}', 'SUM'],
                        ['%{BKY_MATH_ONLIST_OPERATOR_MIN}', 'MIN'],
                        ['%{BKY_MATH_ONLIST_OPERATOR_MAX}', 'MAX'],
                        ['%{BKY_MATH_ONLIST_OPERATOR_AVERAGE}', 'AVERAGE'],
                        ['%{BKY_MATH_ONLIST_OPERATOR_MEDIAN}', 'MEDIAN'],
                        ['%{BKY_MATH_ONLIST_OPERATOR_MODE}', 'MODE'],
                        ['%{BKY_MATH_ONLIST_OPERATOR_STD_DEV}', 'STD_DEV'],
                        ['%{BKY_MATH_ONLIST_OPERATOR_RANDOM}', 'RANDOM'],
                    ],
                },
                {
                    'type': 'input_value',
                    'name': 'LIST',
                    'check': 'Array',
                },
            ],
            'output': 'Number',
            "colour": Colors.Math.primary,
            'helpUrl': '%{BKY_MATH_ONLIST_HELPURL}',
            'mutator': 'math_modes_of_list_mutator',
            'extensions': ['math_op_tooltip'],
        });
    },
};

Blockly.Blocks['math_modulo'] = {

    init: function () {
        this.jsonInit({
            'message0': '%{BKY_MATH_MODULO_TITLE}',
            'args0': [
              {
                'type': 'input_value',
                'name': 'DIVIDEND',
                'check': 'Number',
              },
              {
                'type': 'input_value',
                'name': 'DIVISOR',
                'check': 'Number',
              },
            ],
            'inputsInline': true,
            'output': 'Number',
            "colour": Colors.Math.primary,
            'tooltip': '%{BKY_MATH_MODULO_TOOLTIP}',
            'helpUrl': '%{BKY_MATH_MODULO_HELPURL}',
        });
    },
    getBlockType: function () {
        return Blockly.Types.NUMBER;
    }
};

Blockly.Blocks['math_constrain'] = {

    init: function () {
        this.jsonInit({
            'message0': '%{BKY_MATH_CONSTRAIN_TITLE}',
            'args0': [
              {
                'type': 'input_value',
                'name': 'VALUE',
                'check': 'Number',
              },
              {
                'type': 'input_value',
                'name': 'LOW',
                'check': 'Number',
              },
              {
                'type': 'input_value',
                'name': 'HIGH',
                'check': 'Number',
              },
            ],
            'inputsInline': true,
            'output': 'Number',
            "colour": Colors.Math.primary,
            'tooltip': '%{BKY_MATH_CONSTRAIN_TOOLTIP}',
            'helpUrl': '%{BKY_MATH_CONSTRAIN_HELPURL}',
        });
    },
};

Blockly.Blocks['math_random_int'] = {

    init: function () {
        this.jsonInit({
            'message0': '%{BKY_MATH_RANDOM_INT_TITLE}',
            'args0': [
              {
                'type': 'input_value',
                'name': 'FROM',
                'check': 'Number',
              },
              {
                'type': 'input_value',
                'name': 'TO',
                'check': 'Number',
              },
            ],
            'inputsInline': true,
            'output': 'Number',
            "colour": Colors.Math.primary,
            'tooltip': '%{BKY_MATH_RANDOM_INT_TOOLTIP}',
            'helpUrl': '%{BKY_MATH_RANDOM_INT_HELPURL}',
        });
    },
    getBlockType: function () {
        return Blockly.Types.NUMBER;
    }
};

Blockly.Blocks['math_random_float'] = {

    init: function () {
        this.jsonInit({
            'message0': '%{BKY_MATH_RANDOM_FLOAT_TITLE_RANDOM}',
            'output': 'Number',
            "colour": Colors.Math.primary,
            'tooltip': '%{BKY_MATH_RANDOM_FLOAT_TOOLTIP}',
            'helpUrl': '%{BKY_MATH_RANDOM_FLOAT_HELPURL}',
        });
    },
    getBlockType: function () {
        return Blockly.Types.DECIMAL;
    }
};

Blockly.Blocks['math_atan2'] = {

    init: function () {
        this.jsonInit({
            "message0": "%{BKY_MATH_ATAN2_TITLE}",
            "args0": [
                {
                    "type": "input_value",
                    "name": "X",
                    "check": "Number"
                },
                {
                    "type": "input_value",
                    "name": "Y",
                    "check": "Number"
                }
            ],
            "inputsInline": true,
            "output": "Number",
            "colour": Colors.Math.primary,
            "tooltip": "%{BKY_MATH_ATAN2_TOOLTIP}",
            "helpUrl": "%{BKY_MATH_ATAN2_HELPURL}"
        });
    },
    getBlockType: function () {
        return Blockly.Types.DECIMAL;
    }
};


