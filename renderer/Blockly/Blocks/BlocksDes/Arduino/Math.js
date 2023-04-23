import  Blockly from 'blockly/core';
import Colors from "./Colors"

Blockly.Blocks.math.HUE = Colors.Math.primary;

Blockly.Blocks['math_numbers'] = {
    /**
     * Block for numeric value.
     * @this Blockly.Block
     */
    init: function () {
        this.setHelpUrl(Blockly.Msg.MATH_NUMBER_HELPURL);
        this.setColour(Blockly.Blocks.math.HUE);
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
            "message0": "%1 %2 %3",
            "args0": [
                {
                    "type": "input_value",
                    "name": "A",
                },
                {
                    "type": "field_dropdown",
                    "name": "OP",
                    "options":
                        [[Blockly.Msg.MATH_ADDITION_SYMBOL, 'ADD'],
                        [Blockly.Msg.MATH_SUBTRACTION_SYMBOL, 'MINUS'],
                        [Blockly.Msg.MATH_MULTIPLICATION_SYMBOL, 'MULTIPLY'],
                        [Blockly.Msg.MATH_DIVISION_SYMBOL, 'DIVIDE'],
                        [Blockly.Msg.MATH_POWER_SYMBOL, 'POWER']]
                },
                {
                    "type": "input_value",
                    "name": "B",
                }
            ],
            "inputsInline": true,
            "output": Blockly.Types.NUMBER,
            "colour": Blockly.Blocks.math.HUE,
            "helpUrl": Blockly.Msg.MATH_ARITHMETIC_HELPURL
        });
        var thisBlock = this;
        this.setTooltip(function () {
            var mode = thisBlock.getFieldValue('OP');
            var TOOLTIPS = {
                'ADD': Blockly.Msg.MATH_ARITHMETIC_TOOLTIP_ADD,
                'MINUS': Blockly.Msg.MATH_ARITHMETIC_TOOLTIP_MINUS,
                'MULTIPLY': Blockly.Msg.MATH_ARITHMETIC_TOOLTIP_MULTIPLY,
                'DIVIDE': Blockly.Msg.MATH_ARITHMETIC_TOOLTIP_DIVIDE,
                'POWER': Blockly.Msg.MATH_ARITHMETIC_TOOLTIP_POWER
            };
            return TOOLTIPS[mode];
        });
    }
};

Blockly.Blocks['math_single'] = {

    init: function () {
        this.jsonInit({
            "message0": "%1 %2",
            "args0": [
                {
                    "type": "field_dropdown",
                    "name": "OP",
                    "options": [
                        [Blockly.Msg.MATH_SINGLE_OP_ROOT, 'ROOT'],
                        [Blockly.Msg.MATH_SINGLE_OP_ABSOLUTE, 'ABS'],
                        ['-', 'NEG'],
                        ['ln', 'LN'],
                        ['log10', 'LOG10'],
                        ['e^', 'EXP'],
                        ['10^', 'POW10']
                    ]
                },
                {
                    "type": "input_value",
                    "name": "NUM",
                    "check": "Number"
                }
            ],
            "output": "Number",
            "colour": Blockly.Blocks.math.HUE,
            "helpUrl": Blockly.Msg.MATH_SINGLE_HELPURL 
        });
        // Assign 'this' to a variable for use in the tooltip closure below.
        var thisBlock = this;
        this.setTooltip(function () {
            var mode = thisBlock.getFieldValue('OP');
            var TOOLTIPS = {
                'ROOT': Blockly.Msg.MATH_SINGLE_TOOLTIP_ROOT,
                'ABS': Blockly.Msg.MATH_SINGLE_TOOLTIP_ABS,
                'NEG': Blockly.Msg.MATH_SINGLE_TOOLTIP_NEG,
                'LN': Blockly.Msg.MATH_SINGLE_TOOLTIP_LN,
                'LOG10': Blockly.Msg.MATH_SINGLE_TOOLTIP_LOG10,
                'EXP': Blockly.Msg.MATH_SINGLE_TOOLTIP_EXP,
                'POW10': Blockly.Msg.MATH_SINGLE_TOOLTIP_POW10
            };
            return TOOLTIPS[mode];
        });
    },
    getBlockType: function () {
        return Blockly.Types.DECIMAL;
    }
};

Blockly.Blocks['math_trig'] = {

    init: function () {
        this.jsonInit({
            "message0": "%1 %2",
            "args0": [
                {
                    "type": "field_dropdown",
                    "name": "OP",
                    "options": [
                        [Blockly.Msg.MATH_TRIG_SIN, 'SIN'],
                        [Blockly.Msg.MATH_TRIG_COS, 'COS'],
                        [Blockly.Msg.MATH_TRIG_TAN, 'TAN'],
                        [Blockly.Msg.MATH_TRIG_ASIN, 'ASIN'],
                        [Blockly.Msg.MATH_TRIG_ACOS, 'ACOS'],
                        [Blockly.Msg.MATH_TRIG_ATAN, 'ATAN']
                    ]
                },
                {
                    "type": "input_value",
                    "name": "NUM",
                    "check": "Number"
                }
            ],
            "output": "Number",
            "colour": Blockly.Blocks.math.HUE,
            "helpUrl": Blockly.Msg.MATH_TRIG_HELPURL
        });
        // Assign 'this' to a variable for use in the tooltip closure below.
        var thisBlock = this;
        this.setTooltip(function () {
            var mode = thisBlock.getFieldValue('OP');
            var TOOLTIPS = {
                'SIN': Blockly.Msg.MATH_TRIG_TOOLTIP_SIN,
                'COS': Blockly.Msg.MATH_TRIG_TOOLTIP_COS,
                'TAN': Blockly.Msg.MATH_TRIG_TOOLTIP_TAN,
                'ASIN': Blockly.Msg.MATH_TRIG_TOOLTIP_ASIN,
                'ACOS': Blockly.Msg.MATH_TRIG_TOOLTIP_ACOS,
                'ATAN': Blockly.Msg.MATH_TRIG_TOOLTIP_ATAN
            };
            return TOOLTIPS[mode];
        });
    },
    getBlockType: function () {
        return Blockly.Types.DECIMAL;
    }
};

Blockly.Blocks['math_constant'] = {

    init: function () {
        this.jsonInit({
            "message0": "%1",
            "args0": [
                {
                    "type": "field_dropdown",
                    "name": "CONSTANT",
                    "options": [
                        ['\u03c0', 'PI'],
                        ['e', 'E'],
                        ['\u03c6', 'GOLDEN_RATIO'],
                        ['sqrt(2)', 'SQRT2'],
                        ['sqrt(\u00bd)', 'SQRT1_2'],
                        ['\u221e', 'INFINITY']
                    ]
                }
            ],
            "output": "Number",
            "colour": Blockly.Blocks.math.HUE,
            "tooltip": Blockly.Msg.MATH_CONSTANT_TOOLTIP,
            "helpUrl": Blockly.Msg.MATH_CONSTANT_HELPURL
        });
    }
};

Blockly.Blocks['math_number_property'] = {

    init: function () {
        var PROPERTIES =
            [[Blockly.Msg.MATH_IS_EVEN, 'EVEN'],
            [Blockly.Msg.MATH_IS_ODD, 'ODD'],
            [Blockly.Msg.MATH_IS_PRIME, 'PRIME'],
            [Blockly.Msg.MATH_IS_WHOLE, 'WHOLE'],
            [Blockly.Msg.MATH_IS_POSITIVE, 'POSITIVE'],
            [Blockly.Msg.MATH_IS_NEGATIVE, 'NEGATIVE'],
            [Blockly.Msg.MATH_IS_DIVISIBLE_BY, 'DIVISIBLE_BY']];
        this.setColour(Blockly.Blocks.math.HUE);
        this.appendValueInput('NUMBER_TO_CHECK')
            .setCheck('Number');
        var dropdown = new Blockly.FieldDropdown(PROPERTIES, function (option) {
            var divisorInput = (option == 'DIVISIBLE_BY');
            this.sourceBlock_.updateShape_(divisorInput);
        });
        this.appendDummyInput()
            .appendField(dropdown, 'PROPERTY');
        this.setInputsInline(true);
        this.setOutput(true, 'Boolean');
        this.setTooltip(Blockly.Msg.MATH_IS_TOOLTIP);
    },
    /**
     * Create XML to represent whether the 'divisorInput' should be present.
     * @return {Element} XML storage element.
     * @this Blockly.Block
     */
    mutationToDom: function () {
        var container = document.createElement('mutation');
        var divisorInput = (this.getFieldValue('PROPERTY') == 'DIVISIBLE_BY');
        container.setAttribute('divisor_input', divisorInput);
        return container;
    },
    /**
     * Parse XML to restore the 'divisorInput'.
     * @param {!Element} xmlElement XML storage element.
     * @this Blockly.Block
     */
    domToMutation: function (xmlElement) {
        var divisorInput = (xmlElement.getAttribute('divisor_input') == 'true');
        this.updateShape_(divisorInput);
    },
    /**
     * Modify this block to have (or not have) an input for 'is divisible by'.
     * @param {boolean} divisorInput True if this block has a divisor input.
     * @private
     * @this Blockly.Block
     */
    updateShape_: function (divisorInput) {
        // Add or remove a Value Input.
        var inputExists = this.getInput('DIVISOR');
        if (divisorInput) {
            if (!inputExists) {
                this.appendValueInput('DIVISOR')
                    .setCheck('Number');
            }
        } else if (inputExists) {
            this.removeInput('DIVISOR');
        }
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
        // Assign 'this' to a variable for use in the tooltip closure below.
        var thisBlock = this;
        this.setTooltip(function () {
            return Blockly.Msg.MATH_CHANGE_TOOLTIP.replace('%1',
                thisBlock.getFieldValue('VAR'));
        });
    },
    getVarType: function(varName) {
        return Blockly.Types.NUMBER;
      }
};

Blockly.Blocks['math_round'] = {

    init: function () {
        this.jsonInit({
            "message0": "%1 %2",
            "args0": [
                {
                    "type": "field_dropdown",
                    "name": "OP",
                    "options": [
                        [Blockly.Msg.MATH_ROUND_OPERATOR_ROUND, 'ROUND'],
                        [Blockly.Msg.MATH_ROUND_OPERATOR_ROUNDUP, 'ROUNDUP'],
                        [Blockly.Msg.MATH_ROUND_OPERATOR_ROUNDDOWN, 'ROUNDDOWN']
                    ]
                },
                {
                    "type": "input_value",
                    "name": "NUM",
                    "check": "Number"
                }
            ],
            "output": "Number",
            "colour": Blockly.Blocks.math.HUE,
            "tooltip": Blockly.Msg.MATH_ROUND_TOOLTIP,
            "helpUrl": Blockly.Msg.MATH_ROUND_HELPURL
        });
    },
    getBlockType: function() {
        return Blockly.Types.DECIMAL;
      }
};

Blockly.Blocks['math_on_list'] = {

    init: function () {
        var OPERATORS =
            [[Blockly.Msg.MATH_ONLIST_OPERATOR_SUM, 'SUM'],
            [Blockly.Msg.MATH_ONLIST_OPERATOR_MIN, 'MIN'],
            [Blockly.Msg.MATH_ONLIST_OPERATOR_MAX, 'MAX'],
            [Blockly.Msg.MATH_ONLIST_OPERATOR_AVERAGE, 'AVERAGE'],
            [Blockly.Msg.MATH_ONLIST_OPERATOR_MEDIAN, 'MEDIAN'],
            [Blockly.Msg.MATH_ONLIST_OPERATOR_MODE, 'MODE'],
            [Blockly.Msg.MATH_ONLIST_OPERATOR_STD_DEV, 'STD_DEV'],
            [Blockly.Msg.MATH_ONLIST_OPERATOR_RANDOM, 'RANDOM']];
        // Assign 'this' to a variable for use in the closures below.
        var thisBlock = this;
        this.setHelpUrl(Blockly.Msg.MATH_ONLIST_HELPURL);
        this.setColour(Blockly.Blocks.math.HUE);
        this.setOutput(true, 'Number');
        var dropdown = new Blockly.FieldDropdown(OPERATORS, function (newOp) {
            thisBlock.updateType_(newOp);
        });
        this.appendValueInput('LIST')
            .setCheck('Array')
            .appendField(dropdown, 'OP');
        this.setTooltip(function () {
            var mode = thisBlock.getFieldValue('OP');
            var TOOLTIPS = {
                'SUM': Blockly.Msg.MATH_ONLIST_TOOLTIP_SUM,
                'MIN': Blockly.Msg.MATH_ONLIST_TOOLTIP_MIN,
                'MAX': Blockly.Msg.MATH_ONLIST_TOOLTIP_MAX,
                'AVERAGE': Blockly.Msg.MATH_ONLIST_TOOLTIP_AVERAGE,
                'MEDIAN': Blockly.Msg.MATH_ONLIST_TOOLTIP_MEDIAN,
                'MODE': Blockly.Msg.MATH_ONLIST_TOOLTIP_MODE,
                'STD_DEV': Blockly.Msg.MATH_ONLIST_TOOLTIP_STD_DEV,
                'RANDOM': Blockly.Msg.MATH_ONLIST_TOOLTIP_RANDOM
            };
            return TOOLTIPS[mode];
        });
    },
    /**
     * Modify this block to have the correct output type.
     * @param {string} newOp Either 'MODE' or some op than returns a number.
     * @private
     * @this Blockly.Block
     */
    updateType_: function (newOp) {
        if (newOp == 'MODE') {
            this.outputConnection.setCheck('Array');
        } else {
            this.outputConnection.setCheck('Number');
        }
    },
    /**
     * Create XML to represent the output type.
     * @return {Element} XML storage element.
     * @this Blockly.Block
     */
    mutationToDom: function () {
        var container = document.createElement('mutation');
        container.setAttribute('op', this.getFieldValue('OP'));
        return container;
    },
    /**
     * Parse XML to restore the output type.
     * @param {!Element} xmlElement XML storage element.
     * @this Blockly.Block
     */
    domToMutation: function (xmlElement) {
        this.updateType_(xmlElement.getAttribute('op'));
    }
};

Blockly.Blocks['math_modulo'] = {

    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.MATH_MODULO_TITLE,
            "args0": [
                {
                    "type": "input_value",
                    "name": "DIVIDEND",
                    "check": "Number"
                },
                {
                    "type": "input_value",
                    "name": "DIVISOR",
                    "check": "Number"
                }
            ],
            "inputsInline": true,
            "output": "Number",
            "colour": Blockly.Blocks.math.HUE,
            "tooltip": Blockly.Msg.MATH_MODULO_TOOLTIP,
            "helpUrl": Blockly.Msg.MATH_MODULO_HELPURL
        });
    },
    getBlockType: function () {
        return Blockly.Types.NUMBER;
    }
};

Blockly.Blocks['math_constrain'] = {

    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.MATH_CONSTRAIN_TITLE,
            "args0": [
                {
                    "type": "input_value",
                    "name": "VALUE",
                    "check": "Number"
                },
                {
                    "type": "input_value",
                    "name": "LOW",
                    "check": "Number"
                },
                {
                    "type": "input_value",
                    "name": "HIGH",
                    "check": "Number"
                }
            ],
            "inputsInline": true,
            "output": "Number",
            "colour": Blockly.Blocks.math.HUE,
            "tooltip": Blockly.Msg.MATH_CONSTRAIN_TOOLTIP,
            "helpUrl": Blockly.Msg.MATH_CONSTRAIN_HELPURL
        });
    },
};

Blockly.Blocks['math_random_int'] = {

    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.MATH_RANDOM_INT_TITLE,
            "args0": [
                {
                    "type": "input_value",
                    "name": "FROM",
                    "check": "Number"
                },
                {
                    "type": "input_value",
                    "name": "TO",
                    "check": "Number"
                }
            ],
            "inputsInline": true,
            "output": "Number",
            "colour": Blockly.Blocks.math.HUE,
            "tooltip": Blockly.Msg.MATH_RANDOM_INT_TOOLTIP,
            "helpUrl": Blockly.Msg.MATH_RANDOM_INT_HELPURL
        });
    },
    getBlockType: function() {
        return Blockly.Types.NUMBER;
      }
};

Blockly.Blocks['math_random_float'] = {

    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.MATH_RANDOM_FLOAT_TITLE_RANDOM,
            "output": "Number",
            "colour": Blockly.Blocks.math.HUE,
            "tooltip": Blockly.Msg.MATH_RANDOM_FLOAT_TOOLTIP,
            "helpUrl": Blockly.Msg.MATH_RANDOM_FLOAT_HELPURL
        });
    },
    getBlockType: function () {
        return Blockly.Types.DECIMAL;
    }
};

