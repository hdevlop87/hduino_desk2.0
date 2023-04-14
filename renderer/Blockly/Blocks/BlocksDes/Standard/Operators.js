import  Blockly from 'blockly/core';
import Colors from "../Colors"


//============================================================================================================//
Blockly.Blocks['logic_boolean'] = {
    init: function () {
        this.jsonInit({
            "type": "logic_boolean",
            "message0": "%1",
            "args0": [
                {
                    "type": "field_dropdown",
                    "name": "BOOL",
                    "options": [
                        ["%{BKY_LOGIC_BOOLEAN_TRUE}", "TRUE"],
                        ["%{BKY_LOGIC_BOOLEAN_FALSE}", "FALSE"]
                    ]
                }
            ],
            "output": "Boolean",
            "colour": Colors.operators.primary,
            "tooltip": "%{BKY_LOGIC_BOOLEAN_TOOLTIP}",
            "helpUrl": "%{BKY_LOGIC_BOOLEAN_HELPURL}"
        });
    },
    /** Assigns a block type, logic comparison operations result in bools. */
    getBlockType: function () {
        return Blockly.Types.BOOLEAN;
    }
};
//============================================================================================================//
Blockly.Blocks['logic_operation'] = {
    init: function () {
        this.jsonInit({
            "type": "logic_operation",
            "message0": "%1 %2 %3",
            "args0": [
                {
                    "type": "input_value",
                    "name": "A",
                    "check": "Boolean"
                },
                {
                    "type": "field_dropdown",
                    "name": "OP",
                    "options": [
                        ["%{BKY_LOGIC_OPERATION_AND}", "AND"],
                        ["%{BKY_LOGIC_OPERATION_OR}", "OR"]
                    ]
                },
                {
                    "type": "input_value",
                    "name": "B",
                    "check": "Boolean"
                }
            ],
            "inputsInline": true,
            "output": "Boolean",
            "colour": Colors.operators.primary,
            "helpUrl": "%{BKY_LOGIC_OPERATION_HELPURL}",
            "extensions": ["logic_op_tooltip"]
        });
    },
    getBlockType: function () {
        return Blockly.Types.BOOLEAN;
    }
};
//============================================================================================================//
Blockly.Blocks['logic_compare'] = {
    /**
     * Block for comparison operator.
     * @this Blockly.Block
     */
    init: function () {
        var OPERATORS = this.RTL ? [
            ['=', 'EQ'],
            ['\u2260', 'NEQ'],
            ['>', 'LT'],
            ['\u2265', 'LTE'],
            ['<', 'GT'],
            ['\u2264', 'GTE']
        ] : [
                ['=', 'EQ'],
                ['\u2260', 'NEQ'],
                ['<', 'LT'],
                ['\u2264', 'LTE'],
                ['>', 'GT'],
                ['\u2265', 'GTE']
            ];
        this.setHelpUrl(Blockly.Msg.LOGIC_COMPARE_HELPURL);
        this.setColour(Colors.operators.primary);
        this.setOutput(true, Blockly.Types.BOOLEAN.output);
        this.appendValueInput('A');
        this.appendValueInput('B')
            .appendField(new Blockly.FieldDropdown(OPERATORS), 'OP');
        this.setInputsInline(true);
        // Assign 'this' to a variable for use in the tooltip closure below.
        var thisBlock = this;
        this.setTooltip(function () {
            var op = thisBlock.getFieldValue('OP');
            var TOOLTIPS = {
                'EQ': Blockly.Msg.LOGIC_COMPARE_TOOLTIP_EQ,
                'NEQ': Blockly.Msg.LOGIC_COMPARE_TOOLTIP_NEQ,
                'LT': Blockly.Msg.LOGIC_COMPARE_TOOLTIP_LT,
                'LTE': Blockly.Msg.LOGIC_COMPARE_TOOLTIP_LTE,
                'GT': Blockly.Msg.LOGIC_COMPARE_TOOLTIP_GT,
                'GTE': Blockly.Msg.LOGIC_COMPARE_TOOLTIP_GTE
            };
            return TOOLTIPS[op];
        });
        this.prevBlocks_ = [null, null];
    },
    /**
     * Called whenever anything on the workspace changes.
     * Prevent mismatched types from being compared.
     * @param {!Blockly.Events.Abstract} e Change event.
     * @this Blockly.Block
     */
    // onchange: function (e) {
    //     var blockA = this.getInputTargetBlock('A');
    //     var blockB = this.getInputTargetBlock('B');
    //     // Disconnect blocks that existed prior to this change if they don't match.
    //     if (blockA && blockB &&
    //         !blockA.outputConnection.checkType_(blockB.outputConnection)) {
    //         // Mismatch between two inputs.  Disconnect previous and bump it away.
    //         // Ensure that any disconnections are grouped with the causing event.
    //         Blockly.Events.setGroup(e.group);
    //         for (var i = 0; i < this.prevBlocks_.length; i++) {
    //             var block = this.prevBlocks_[i];
    //             if (block === blockA || block === blockB) {
    //                 block.unplug();
    //                 // block.bumpNeighbours_();
    //             }
    //         }
    //         Blockly.Events.setGroup(false);
    //     }
    //     this.prevBlocks_[0] = blockA;
    //     this.prevBlocks_[1] = blockB;
    // },
    /** Assigns a type to the block, comparison operations result in booleans. */
    getBlockType: function () {
        return Blockly.Types.BOOLEAN;
    }
};

//============================================================================================================//
Blockly.Blocks['logic_negate'] = {
    init: function () {
        this.jsonInit({
            "type": "logic_negate",
            "message0": "%{BKY_LOGIC_NEGATE_TITLE}",
            "args0": [
                {
                    "type": "input_value",
                    "name": "BOOL",
                    "check": "Boolean"
                }
            ],
            "output": "Boolean",
            "colour": Colors.operators.primary,
            "tooltip": "%{BKY_LOGIC_NEGATE_TOOLTIP}",
            "helpUrl": "%{BKY_LOGIC_NEGATE_HELPURL}"
        });
    }
};

//============================================================================================================//
Blockly.Blocks['logic_null'] = {
    init: function () {
        this.jsonInit({
            "type": "logic_null",
            "message0": "%{BKY_LOGIC_NULL}",
            "output": null,
            "colour": Colors.operators.primary,
            "tooltip": "%{BKY_LOGIC_NULL_TOOLTIP}",
            "helpUrl": "%{BKY_LOGIC_NULL_HELPURL}"
        });
    }
};
