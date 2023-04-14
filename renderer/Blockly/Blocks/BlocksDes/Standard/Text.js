import  Blockly from 'blockly/core';
import Colors from "../Colors"
import QuL from '../../../../assets/img/QuL.png'
import QuR from '../../../../assets/img/QuR.png'

Blockly.Blocks['text'] = {
  init: function () {
    this.jsonInit({
      "type": "text",
      "message0": "%1",
      "args0": [{
        "type": "field_input",
        "name": "TEXT",
        "text": ""
      }],
      "output": "String",
      "colour": Colors.Text.primary,
      "helpUrl": "%{BKY_TEXT_TEXT_HELPURL}",
      "tooltip": "%{BKY_TEXT_TEXT_TOOLTIP}",
      "extensions": [
        "text_quotes",
        "parent_tooltip_when_inline"
      ]
    });
  },
  getBlockType: function () {
    return Blockly.Types.TEXT;
  }
};
//=====================================================//
Blockly.Blocks['text_join'] = {
  init: function () {
    this.jsonInit({
      "type": "text_join",
      "message0": "",
      "output": "String",
      "colour": Colors.Text.primary,
      "helpUrl": "%{BKY_TEXT_JOIN_HELPURL}",
      "tooltip": "%{BKY_TEXT_JOIN_TOOLTIP}",
      "mutator": "text_join_mutator"
    });
  },
  getBlockType: function () {
    return Blockly.Types.TEXT;
  }
};
//=====================================================//
Blockly.Blocks['text_create_join_container'] = {
  init: function () {
    this.jsonInit({
      "type": "text_create_join_container",
      "message0": "%{BKY_TEXT_CREATE_JOIN_TITLE_JOIN} %1 %2",
      "args0": [{
        "type": "input_dummy"
      },
      {
        "type": "input_statement",
        "name": "STACK"
      }],
      "colour": Colors.Text.primary,
      "tooltip": "%{BKY_TEXT_CREATE_JOIN_TOOLTIP}",
      "enableContextMenu": false
    });
  },
  getBlockType: function () {
    return Blockly.Types.TEXT;
  }
};
//=====================================================//
Blockly.Blocks['text_create_join_item'] = {
  init: function () {
    this.jsonInit({
      "type": "text_create_join_item",
      "message0": "%{BKY_TEXT_CREATE_JOIN_ITEM_TITLE_ITEM}",
      "previousStatement": null,
      "nextStatement": null,
      "colour": Colors.Text.primary,
      "tooltip": "%{BKY_TEXT_CREATE_JOIN_ITEM_TOOLTIP}",
      "enableContextMenu": false
    });
  },
  getVarType: function (varName) {
    return Blockly.Types.TEXT;
  }
};
//=====================================================//
Blockly.Blocks['text_append'] = {

  init: function () {
    this.jsonInit({
      "type": "text_append",
      "message0": "%{BKY_TEXT_APPEND_TITLE}",
      "args0": [{
        "type": "field_variable",
        "name": "VAR",
        "variable": "%{BKY_TEXT_APPEND_VARIABLE}"
      },
      {
        "type": "input_value",
        "name": "TEXT"
      }],
      "previousStatement": null,
      "nextStatement": null,
      "colour": Colors.Text.primary,
      "extensions": [
        "text_append_tooltip"
      ]
    });
  },
  getVarType: function (varName) {
    return Blockly.Types.TEXT;
  }
};
//=====================================================//
Blockly.Blocks['text_length'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.TEXT_LENGTH_TITLE,
      "args0": [
        {
          "type": "input_value",
          "name": "VALUE",
          "check": ['String', 'Array']
        }
      ],
      "output": 'Number',
      "colour": Colors.Text.primary,
      "tooltip": Blockly.Msg.TEXT_LENGTH_TOOLTIP,
      "helpUrl": Blockly.Msg.TEXT_LENGTH_HELPURL
    });
  },
  getBlockType: function () {
    return Blockly.Types.NUMBER;
  }
};
//=====================================================//
Blockly.Blocks['text_isEmpty'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.TEXT_ISEMPTY_TITLE,
      "args0": [
        {
          "type": "input_value",
          "name": "VALUE",
          "check": ['String', 'Array']
        }
      ],
      "output": 'Boolean',
      "colour": Colors.Text.primary,
      "tooltip": Blockly.Msg.TEXT_ISEMPTY_TOOLTIP,
      "helpUrl": Blockly.Msg.TEXT_ISEMPTY_HELPURL
    });
  },
  getBlockType: function () {
    return Blockly.Types.BOOLEAN;
  }
};
//=====================================================//
Blockly.Blocks['text_indexOf'] = {
  /**
   * Block for finding a substring in the text.
   * @this Blockly.Block
   */
  init: function () {
    var OPERATORS =
      [[Blockly.Msg.TEXT_INDEXOF_OPERATOR_FIRST, 'FIRST'],
      [Blockly.Msg.TEXT_INDEXOF_OPERATOR_LAST, 'LAST']];
    this.setHelpUrl(Blockly.Msg.TEXT_INDEXOF_HELPURL);
    this.setColour(Colors.Text.primary);
    this.setOutput(true, 'Number');
    this.appendValueInput('VALUE')
      .setCheck('String')
      .appendField(Blockly.Msg.TEXT_INDEXOF_INPUT_INTEXT);
    this.appendValueInput('FIND')
      .setCheck('String')
      .appendField(new Blockly.FieldDropdown(OPERATORS), 'END');
    if (Blockly.Msg.TEXT_INDEXOF_TAIL) {
      this.appendDummyInput().appendField(Blockly.Msg.TEXT_INDEXOF_TAIL);
    }
    this.setInputsInline(true);
    // Assign 'this' to a variable for use in the tooltip closure below.
    var thisBlock = this;
    this.setTooltip(function () {
      return Blockly.Msg.TEXT_INDEXOF_TOOLTIP.replace('%1',
        thisBlock.workspace.options.oneBasedIndex ? '0' : '-1');
    });
  }
};
//=====================================================//
Blockly.Blocks['text_charAt'] = {
  /**
   * Block for getting a character from the string.
   * @this Blockly.Block
   */
  init: function () {
    this.WHERE_OPTIONS =
      [[Blockly.Msg.TEXT_CHARAT_FROM_START, 'FROM_START'],
      [Blockly.Msg.TEXT_CHARAT_FROM_END, 'FROM_END'],
      [Blockly.Msg.TEXT_CHARAT_FIRST, 'FIRST'],
      [Blockly.Msg.TEXT_CHARAT_LAST, 'LAST']];
    this.setHelpUrl(Blockly.Msg.TEXT_CHARAT_HELPURL);
    this.setColour(Colors.Text.primary);
    this.setOutput(true, 'String');
    this.appendValueInput('VALUE')
      .setCheck('String')
      .appendField(Blockly.Msg.TEXT_CHARAT_INPUT_INTEXT);
    this.appendDummyInput('AT');
    this.setInputsInline(true);
    this.updateAt_(true);
    // Assign 'this' to a variable for use in the tooltip closure below.
    var thisBlock = this;
    this.setTooltip(function () {
      var where = thisBlock.getFieldValue('WHERE');
      var tooltip = Blockly.Msg.TEXT_CHARAT_TOOLTIP;
      if (where == 'FROM_START' || where == 'FROM_END') {
        var msg = (where == 'FROM_START') ?
          Blockly.Msg.LISTS_INDEX_FROM_START_TOOLTIP :
          Blockly.Msg.LISTS_INDEX_FROM_END_TOOLTIP;
        tooltip += '  ' + msg.replace('%1',
          thisBlock.workspace.options.oneBasedIndex ? '#1' : '#0');
      }
      return tooltip;
    });
  },
  /**
   * Create XML to represent whether there is an 'AT' input.
   * @return {!Element} XML storage element.
   * @this Blockly.Block
   */
  mutationToDom: function () {
    var container = document.createElement('mutation');
    var isAt = this.getInput('AT').type == Blockly.INPUT_VALUE;
    container.setAttribute('at', isAt);
    return container;
  },
  /**
   * Parse XML to restore the 'AT' input.
   * @param {!Element} xmlElement XML storage element.
   * @this Blockly.Block
   */
  domToMutation: function (xmlElement) {
    // Note: Until January 2013 this block did not have mutations,
    // so 'at' defaults to true.
    var isAt = (xmlElement.getAttribute('at') != 'false');
    this.updateAt_(isAt);
  },
  /**
   * Create or delete an input for the numeric index.
   * @param {boolean} isAt True if the input should exist.
   * @private
   * @this Blockly.Block
   */
  updateAt_: function (isAt) {
    // Destroy old 'AT' and 'ORDINAL' inputs.
    this.removeInput('AT');
    this.removeInput('ORDINAL', true);
    // Create either a value 'AT' input or a dummy input.
    if (isAt) {
      this.appendValueInput('AT').setCheck('Number');
      if (Blockly.Msg.ORDINAL_NUMBER_SUFFIX) {
        this.appendDummyInput('ORDINAL')
          .appendField(Blockly.Msg.ORDINAL_NUMBER_SUFFIX);
      }
    } else {
      this.appendDummyInput('AT');
    }
    if (Blockly.Msg.TEXT_CHARAT_TAIL) {
      this.removeInput('TAIL', true);
      this.appendDummyInput('TAIL')
        .appendField(Blockly.Msg.TEXT_CHARAT_TAIL);
    }
    var menu = new Blockly.FieldDropdown(this.WHERE_OPTIONS, function (value) {
      var newAt = (value == 'FROM_START') || (value == 'FROM_END');
      // The 'isAt' variable is available due to this function being a closure.
      if (newAt != isAt) {
        var block = this.sourceBlock_;
        block.updateAt_(newAt);
        // This menu has been destroyed and replaced.  Update the replacement.
        block.setFieldValue(value, 'WHERE');
        return null;
      }
      return undefined;
    });
    this.getInput('AT').appendField(menu, 'WHERE');
  }
};
//=====================================================//
Blockly.Blocks['text_getSubstring'] = {
  /**
   * Block for getting substring.
   * @this Blockly.Block
   */
  init: function () {
    this['WHERE_OPTIONS_1'] =
      [[Blockly.Msg.TEXT_GET_SUBSTRING_START_FROM_START, 'FROM_START'],
      [Blockly.Msg.TEXT_GET_SUBSTRING_START_FROM_END, 'FROM_END'],
      [Blockly.Msg.TEXT_GET_SUBSTRING_START_FIRST, 'FIRST']];
    this['WHERE_OPTIONS_2'] =
      [[Blockly.Msg.TEXT_GET_SUBSTRING_END_FROM_START, 'FROM_START'],
      [Blockly.Msg.TEXT_GET_SUBSTRING_END_FROM_END, 'FROM_END'],
      [Blockly.Msg.TEXT_GET_SUBSTRING_END_LAST, 'LAST']];
    this.setHelpUrl(Blockly.Msg.TEXT_GET_SUBSTRING_HELPURL);
    this.setColour(Colors.Text.primary);
    this.appendValueInput('STRING')
      .setCheck('String')
      .appendField(Blockly.Msg.TEXT_GET_SUBSTRING_INPUT_IN_TEXT);
    this.appendDummyInput('AT1');
    this.appendDummyInput('AT2');
    if (Blockly.Msg.TEXT_GET_SUBSTRING_TAIL) {
      this.appendDummyInput('TAIL')
        .appendField(Blockly.Msg.TEXT_GET_SUBSTRING_TAIL);
    }
    this.setInputsInline(true);
    this.setOutput(true, 'String');
    this.updateAt_(1, true);
    this.updateAt_(2, true);
    this.setTooltip(Blockly.Msg.TEXT_GET_SUBSTRING_TOOLTIP);
  },
  /**
   * Create XML to represent whether there are 'AT' inputs.
   * @return {!Element} XML storage element.
   * @this Blockly.Block
   */
  mutationToDom: function () {
    var container = document.createElement('mutation');
    var isAt1 = this.getInput('AT1').type == Blockly.INPUT_VALUE;
    container.setAttribute('at1', isAt1);
    var isAt2 = this.getInput('AT2').type == Blockly.INPUT_VALUE;
    container.setAttribute('at2', isAt2);
    return container;
  },
  /**
   * Parse XML to restore the 'AT' inputs.
   * @param {!Element} xmlElement XML storage element.
   * @this Blockly.Block
   */
  domToMutation: function (xmlElement) {
    var isAt1 = (xmlElement.getAttribute('at1') == 'true');
    var isAt2 = (xmlElement.getAttribute('at2') == 'true');
    this.updateAt_(1, isAt1);
    this.updateAt_(2, isAt2);
  },
  /**
   * Create or delete an input for a numeric index.
   * This block has two such inputs, independant of each other.
   * @param {number} n Specify first or second input (1 or 2).
   * @param {boolean} isAt True if the input should exist.
   * @private
   * @this Blockly.Block
   */
  updateAt_: function (n, isAt) {
    // Create or delete an input for the numeric index.
    // Destroy old 'AT' and 'ORDINAL' inputs.
    this.removeInput('AT' + n);
    this.removeInput('ORDINAL' + n, true);
    // Create either a value 'AT' input or a dummy input.
    if (isAt) {
      this.appendValueInput('AT' + n).setCheck('Number');
      if (Blockly.Msg.ORDINAL_NUMBER_SUFFIX) {
        this.appendDummyInput('ORDINAL' + n).appendField(Blockly.Msg.ORDINAL_NUMBER_SUFFIX);
      }
    } else {
      this.appendDummyInput('AT' + n);
    }
    // Move tail, if present, to end of block.
    if (n == 2 && Blockly.Msg.TEXT_GET_SUBSTRING_TAIL) {
      this.removeInput('TAIL', true);
      this.appendDummyInput('TAIL')
        .appendField(Blockly.Msg.TEXT_GET_SUBSTRING_TAIL);
    }
    var menu = new Blockly.FieldDropdown(this['WHERE_OPTIONS_' + n],
      function (value) {
        var newAt = (value == 'FROM_START') || (value == 'FROM_END');
        // The 'isAt' variable is available due to this function being a
        // closure.
        if (newAt != isAt) {
          var block = this.sourceBlock_;
          block.updateAt_(n, newAt);
          // This menu has been destroyed and replaced.
          // Update the replacement.
          block.setFieldValue(value, 'WHERE' + n);
          return null;
        }
        return undefined;
      });

    this.getInput('AT' + n)
      .appendField(menu, 'WHERE' + n);
    if (n == 1) {
      this.moveInputBefore('AT1', 'AT2');
    }
  }
};
//=====================================================//
Blockly.Blocks['text_changeCase'] = {
  /**
   * Block for changing capitalization.
   * @this Blockly.Block
   */
  init: function () {
    var OPERATORS =
      [[Blockly.Msg.TEXT_CHANGECASE_OPERATOR_UPPERCASE, 'UPPERCASE'],
      [Blockly.Msg.TEXT_CHANGECASE_OPERATOR_LOWERCASE, 'LOWERCASE']];
    this.setHelpUrl(Blockly.Msg.TEXT_CHANGECASE_HELPURL);
    this.setColour(Colors.Text.primary);
    this.appendValueInput('TEXT')
      .setCheck('String')
      .appendField(new Blockly.FieldDropdown(OPERATORS), 'CASE');
    //this.setPreviousStatement(true);
    //this.setNextStatement(true);
    this.setOutput(true, 'String');
    this.setTooltip(Blockly.Msg.TEXT_CHANGECASE_TOOLTIP);
  }
};
//=====================================================//
Blockly.Blocks['text_trim'] = {
  init: function () {
    var OPERATORS = [
      [Blockly.Msg['TEXT_TRIM_OPERATOR_BOTH'], 'BOTH'],
      [Blockly.Msg['TEXT_TRIM_OPERATOR_LEFT'], 'LEFT'],
      [Blockly.Msg['TEXT_TRIM_OPERATOR_RIGHT'], 'RIGHT']
    ];
    this.setHelpUrl(Blockly.Msg['TEXT_TRIM_HELPURL']);
    this.setStyle('text_blocks');
    this.appendValueInput('TEXT')
      .setCheck('String')
      .appendField(new Blockly.FieldDropdown(OPERATORS), 'MODE');
    this.setOutput(true, 'String');
    this.setTooltip(Blockly.Msg['TEXT_TRIM_TOOLTIP']);
    this.setColour(Colors.Text.primary);
  }
};
//=====================================================//
Blockly.Blocks['text_print'] = {
  /**
   * Block for print statement.
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.TEXT_PRINT_TITLE,
      "args0": [
        {
          "type": "input_value",
          "name": "TEXT"
        }
      ],
      "previousStatement": null,
      "nextStatement": null,
      "colour": Colors.Text.primary,
      "tooltip": Blockly.Msg.TEXT_PRINT_TOOLTIP,
      "helpUrl": Blockly.Msg.TEXT_PRINT_HELPURL
    });
  }
};
//=====================================================//
Blockly.Blocks['text_prompt_ext'] = {
  /**
   * Block for prompt function (external message).
   * @this Blockly.Block
   */
  init: function () {
    var TYPES =
      [[Blockly.Msg.TEXT_PROMPT_TYPE_TEXT, 'TEXT'],
      [Blockly.Msg.TEXT_PROMPT_TYPE_NUMBER, 'NUMBER']];
    this.setHelpUrl(Blockly.Msg.TEXT_PROMPT_HELPURL);
    this.setColour(Colors.Text.primary);
    // Assign 'this' to a variable for use in the closures below.
    var thisBlock = this;
    var dropdown = new Blockly.FieldDropdown(TYPES, function (newOp) {
      thisBlock.updateType_(newOp);
    });
    this.appendValueInput('TEXT')
      .appendField(dropdown, 'TYPE');
    this.setOutput(true, 'String');
    this.setTooltip(function () {
      return (thisBlock.getFieldValue('TYPE') == 'TEXT') ?
        Blockly.Msg.TEXT_PROMPT_TOOLTIP_TEXT :
        Blockly.Msg.TEXT_PROMPT_TOOLTIP_NUMBER;
    });
  },
  /**
   * Modify this block to have the correct output type.
   * @param {string} newOp Either 'TEXT' or 'NUMBER'.
   * @private
   * @this Blockly.Block
   */
  updateType_: function (newOp) {
    this.outputConnection.setCheck(newOp == 'NUMBER' ? 'Number' : 'String');
  },
  /**
   * Create XML to represent the output type.
   * @return {!Element} XML storage element.
   * @this Blockly.Block
   */
  mutationToDom: function () {
    var container = document.createElement('mutation');
    container.setAttribute('type', this.getFieldValue('TYPE'));
    return container;
  },
  /**
   * Parse XML to restore the output type.
   * @param {!Element} xmlElement XML storage element.
   * @this Blockly.Block
   */
  domToMutation: function (xmlElement) {
    this.updateType_(xmlElement.getAttribute('type'));
  },
  getBlockType: function () {
    return (this.getFieldValue('TYPE') == Blockly.Types.TEXT.output) ?
      Blockly.Types.TEXT : Blockly.Types.NUMBER;
  }
};
//=====================================================//
Blockly.Blocks['text_prompt'] = {
  /**
   * Block for prompt function (internal message).
   * The 'text_prompt_ext' block is preferred as it is more flexible.
   * @this Blockly.Block
   */
  init: function () {
    var TYPES =
      [[Blockly.Msg.TEXT_PROMPT_TYPE_TEXT, 'TEXT'],
      [Blockly.Msg.TEXT_PROMPT_TYPE_NUMBER, 'NUMBER']];
    // Assign 'this' to a variable for use in the closures below.
    var thisBlock = this;
    this.setHelpUrl(Blockly.Msg.TEXT_PROMPT_HELPURL);
    this.setColour(Colors.Text.primary);
    var dropdown = new Blockly.FieldDropdown(TYPES, function (newOp) {
      thisBlock.updateType_(newOp);
    });
    this.appendDummyInput()
      .appendField(dropdown, 'TYPE')
      .appendField(this.newQuote_(true))
      .appendField(new Blockly.FieldTextInput(''), 'TEXT')
      .appendField(this.newQuote_(false));
    this.setOutput(true, 'String');
    this.setTooltip(function () {
      return (thisBlock.getFieldValue('TYPE') == 'TEXT') ?
        Blockly.Msg.TEXT_PROMPT_TOOLTIP_TEXT :
        Blockly.Msg.TEXT_PROMPT_TOOLTIP_NUMBER;
    });
  },
  newQuote_: Blockly.Blocks['text'].newQuote_,
  updateType_: Blockly.Blocks['text_prompt_ext'].updateType_,
  mutationToDom: Blockly.Blocks['text_prompt_ext'].mutationToDom,
  domToMutation: Blockly.Blocks['text_prompt_ext'].domToMutation,
  getBlockType: function () {
    return (this.getFieldValue('TYPE') == Blockly.Types.NUMBER.output) ?
      Blockly.Types.NUMBER : Blockly.Types.TEXT;
  }
};


// /**
//  *
//  * @mixin
//  * @package
//  * @readonly
//  */
// Blockly.Constants.Text.QUOTE_IMAGE_MIXIN = {
//   /**
//    * Image data URI of an LTR opening double quote (same as RTL closing double quote).
//    * @readonly
//    */
//   QUOTE_IMAGE_LEFT_DATAURI:
//     'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAKCAQAAAAqJXdxAAAA' +
//     'n0lEQVQI1z3OMa5BURSF4f/cQhAKjUQhuQmFNwGJEUi0RKN5rU7FHKhpjEH3TEMtkdBSCY' +
//     '1EIv8r7nFX9e29V7EBAOvu7RPjwmWGH/VuF8CyN9/OAdvqIXYLvtRaNjx9mMTDyo+NjAN1' +
//     'HNcl9ZQ5oQMM3dgDUqDo1l8DzvwmtZN7mnD+PkmLa+4mhrxVA9fRowBWmVBhFy5gYEjKMf' +
//     'z9AylsaRRgGzvZAAAAAElFTkSuQmCC',
//   /**
//    * Image data URI of an LTR closing double quote (same as RTL opening double quote).
//    * @readonly
//    */
//   QUOTE_IMAGE_RIGHT_DATAURI:
//     'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAKCAQAAAAqJXdxAAAA' +
//     'qUlEQVQI1z3KvUpCcRiA8ef9E4JNHhI0aFEacm1o0BsI0Slx8wa8gLauoDnoBhq7DcfWhg' +
//     'gONDmJJgqCPA7neJ7p934EOOKOnM8Q7PDElo/4x4lFb2DmuUjcUzS3URnGib9qaPNbuXvB' +
//     'O3sGPHJDRG6fGVdMSeWDP2q99FQdFrz26Gu5Tq7dFMzUvbXy8KXeAj57cOklgA+u1B5Aos' +
//     'lLtGIHQMaCVnwDnADZIFIrXsoXrgAAAABJRU5ErkJggg==',
//   /**
//    * Pixel width of QUOTE_IMAGE_LEFT_DATAURI and QUOTE_IMAGE_RIGHT_DATAURI.
//    * @readonly
//    */
//   QUOTE_IMAGE_WIDTH: 12,
//   /**
//    * Pixel height of QUOTE_IMAGE_LEFT_DATAURI and QUOTE_IMAGE_RIGHT_DATAURI.
//    * @readonly
//    */
//   QUOTE_IMAGE_HEIGHT: 12,

//   /**
//    * Inserts appropriate quote images before and after the named field.
//    * @param {string} fieldName The name of the field to wrap with quotes.
//    * @this {Blockly.Block}
//    */
//   quoteField_: function (fieldName) {
//     for (var i = 0, input; (input = this.inputList[i]); i++) {
//       for (var j = 0, field; (field = input.fieldRow[j]); j++) {
//         if (fieldName == field.name) {
//           input.insertFieldAt(j, this.newQuote_(true));
//           input.insertFieldAt(j + 2, this.newQuote_(false));
//           return;
//         }
//       }
//     }
//     console.warn('field named "' + fieldName + '" not found in ' + this.toDevString());
//   },

//   /**
//    * A helper function that generates a FieldImage of an opening or
//    * closing double quote. The selected quote will be adapted for RTL blocks.
//    * @param {boolean} open If the image should be open quote (“ in LTR).
//    *                       Otherwise, a closing quote is used (” in LTR).
//    * @return {!Blockly.FieldImage} The new field.
//    * @this {Blockly.Block}
//    */
//   newQuote_: function (open) {
//     var isLeft = this.RTL ? !open : open;
//     var dataUri = isLeft ?
//       this.QUOTE_IMAGE_LEFT_DATAURI :
//       this.QUOTE_IMAGE_RIGHT_DATAURI;
//     return new Blockly.FieldImage(
//       dataUri,
//       this.QUOTE_IMAGE_WIDTH,
//       this.QUOTE_IMAGE_HEIGHT,
//       isLeft ? '\u201C' : '\u201D');
//   }
// };

// /**
//  * Wraps TEXT field with images of double quote characters.
//  * @this {Blockly.Block}
//  */
// Blockly.Constants.Text.TEXT_QUOTES_EXTENSION = function () {
//   this.mixin(Blockly.Constants.Text.QUOTE_IMAGE_MIXIN);
//   this.quoteField_('TEXT');
// };

// /**
//  * Mixin for mutator functions in the 'text_join_mutator' extension.
//  * @mixin
//  * @augments Blockly.Block
//  * @package
//  */
// Blockly.Constants.Text.TEXT_JOIN_MUTATOR_MIXIN = {
//   /**
//    * Create XML to represent number of text inputs.
//    * @return {!Element} XML storage element.
//    * @this {Blockly.Block}
//    */
//   mutationToDom: function () {
//     var container = Blockly.utils.xml.createElement('mutation');
//     container.setAttribute('items', this.itemCount_);
//     return container;
//   },
//   /**
//    * Parse XML to restore the text inputs.
//    * @param {!Element} xmlElement XML storage element.
//    * @this {Blockly.Block}
//    */
//   domToMutation: function (xmlElement) {
//     this.itemCount_ = parseInt(xmlElement.getAttribute('items'), 10);
//     this.updateShape_();
//   },
//   /**
//    * Populate the mutator's dialog with this block's components.
//    * @param {!Blockly.Workspace} workspace Mutator's workspace.
//    * @return {!Blockly.Block} Root block in mutator.
//    * @this {Blockly.Block}
//    */
//   decompose: function (workspace) {
//     var containerBlock = workspace.newBlock('text_create_join_container');
//     containerBlock.initSvg();
//     var connection = containerBlock.getInput('STACK').connection;
//     for (var i = 0; i < this.itemCount_; i++) {
//       var itemBlock = workspace.newBlock('text_create_join_item');
//       itemBlock.initSvg();
//       connection.connect(itemBlock.previousConnection);
//       connection = itemBlock.nextConnection;
//     }
//     return containerBlock;
//   },
//   /**
//    * Reconfigure this block based on the mutator dialog's components.
//    * @param {!Blockly.Block} containerBlock Root block in mutator.
//    * @this {Blockly.Block}
//    */
//   compose: function (containerBlock) {
//     var itemBlock = containerBlock.getInputTargetBlock('STACK');
//     // Count number of inputs.
//     var connections = [];
//     while (itemBlock && !itemBlock.isInsertionMarker()) {
//       connections.push(itemBlock.valueConnection_);
//       itemBlock = itemBlock.nextConnection &&
//         itemBlock.nextConnection.targetBlock();
//     }
//     // Disconnect any children that don't belong.
//     for (var i = 0; i < this.itemCount_; i++) {
//       var connection = this.getInput('ADD' + i).connection.targetConnection;
//       if (connection && connections.indexOf(connection) == -1) {
//         connection.disconnect();
//       }
//     }
//     this.itemCount_ = connections.length;
//     this.updateShape_();
//     // Reconnect any child blocks.
//     for (var i = 0; i < this.itemCount_; i++) {
//       Blockly.Mutator.reconnect(connections[i], this, 'ADD' + i);
//     }
//   },
//   /**
//    * Store pointers to any connected child blocks.
//    * @param {!Blockly.Block} containerBlock Root block in mutator.
//    * @this {Blockly.Block}
//    */
//   saveConnections: function (containerBlock) {
//     var itemBlock = containerBlock.getInputTargetBlock('STACK');
//     var i = 0;
//     while (itemBlock) {
//       var input = this.getInput('ADD' + i);
//       itemBlock.valueConnection_ = input && input.connection.targetConnection;
//       i++;
//       itemBlock = itemBlock.nextConnection &&
//         itemBlock.nextConnection.targetBlock();
//     }
//   },
//   /**
//    * Modify this block to have the correct number of inputs.
//    * @private
//    * @this {Blockly.Block}
//    */
//   updateShape_: function () {
//     if (this.itemCount_ && this.getInput('EMPTY')) {
//       this.removeInput('EMPTY');
//     } else if (!this.itemCount_ && !this.getInput('EMPTY')) {
//       this.appendDummyInput('EMPTY')
//         .appendField(this.newQuote_(true))
//         .appendField(this.newQuote_(false));
//     }
//     // Add new inputs.
//     for (var i = 0; i < this.itemCount_; i++) {
//       if (!this.getInput('ADD' + i)) {
//         var input = this.appendValueInput('ADD' + i)
//           .setAlign(Blockly.ALIGN_RIGHT);
//         if (i == 0) {
//           input.appendField(Blockly.Msg['TEXT_JOIN_TITLE_CREATEWITH']);
//         }
//       }
//     }
//     // Remove deleted inputs.
//     while (this.getInput('ADD' + i)) {
//       this.removeInput('ADD' + i);
//       i++;
//     }
//   }
// };

// /**
//  * Performs final setup of a text_join block.
//  * @this {Blockly.Block}
//  */
// Blockly.Constants.Text.TEXT_JOIN_EXTENSION = function () {
//   // Add the quote mixin for the itemCount_ = 0 case.
//   this.mixin(Blockly.Constants.Text.QUOTE_IMAGE_MIXIN);
//   // Initialize the mutator values.
//   this.itemCount_ = 2;
//   this.updateShape_();
//   // Configure the mutator UI.
//   this.setMutator(new Blockly.Mutator(['text_create_join_item']));
// };

// Blockly.Constants.Text.TEXT_INDEXOF_TOOLTIP_EXTENSION = function () {
//   // Assign 'this' to a variable for use in the tooltip closure below.
//   var thisBlock = this;
//   this.setTooltip(function () {
//     return Blockly.Msg['TEXT_INDEXOF_TOOLTIP'].replace('%1',
//       thisBlock.workspace.options.oneBasedIndex ? '0' : '-1');
//   });
// };

// /**
//  * Mixin for mutator functions in the 'text_charAt_mutator' extension.
//  * @mixin
//  * @augments Blockly.Block
//  * @package
//  */
// Blockly.Constants.Text.TEXT_CHARAT_MUTATOR_MIXIN = {
//   /**
//    * Create XML to represent whether there is an 'AT' input.
//    * @return {!Element} XML storage element.
//    * @this {Blockly.Block}
//    */
//   mutationToDom: function () {
//     var container = Blockly.utils.xml.createElement('mutation');
//     container.setAttribute('at', !!this.isAt_);
//     return container;
//   },
//   /**
//    * Parse XML to restore the 'AT' input.
//    * @param {!Element} xmlElement XML storage element.
//    * @this {Blockly.Block}
//    */
//   domToMutation: function (xmlElement) {
//     // Note: Until January 2013 this block did not have mutations,
//     // so 'at' defaults to true.
//     var isAt = (xmlElement.getAttribute('at') != 'false');
//     this.updateAt_(isAt);
//   },
//   /**
//    * Create or delete an input for the numeric index.
//    * @param {boolean} isAt True if the input should exist.
//    * @private
//    * @this {Blockly.Block}
//    */
//   updateAt_: function (isAt) {
//     // Destroy old 'AT' and 'ORDINAL' inputs.
//     this.removeInput('AT', true);
//     this.removeInput('ORDINAL', true);
//     // Create either a value 'AT' input or a dummy input.
//     if (isAt) {
//       this.appendValueInput('AT').setCheck('Number');
//       if (Blockly.Msg['ORDINAL_NUMBER_SUFFIX']) {
//         this.appendDummyInput('ORDINAL')
//           .appendField(Blockly.Msg['ORDINAL_NUMBER_SUFFIX']);
//       }
//     }
//     if (Blockly.Msg['TEXT_CHARAT_TAIL']) {
//       this.removeInput('TAIL', true);
//       this.appendDummyInput('TAIL')
//         .appendField(Blockly.Msg['TEXT_CHARAT_TAIL']);
//     }

//     this.isAt_ = isAt;
//   }
// };

// /**
//  * Does the initial mutator update of text_charAt and adds the tooltip
//  * @this {Blockly.Block}
//  */
// Blockly.Constants.Text.TEXT_CHARAT_EXTENSION = function () {
//   var dropdown = this.getField('WHERE');
//   dropdown.setValidator(function (value) {
//     var newAt = (value == 'FROM_START') || (value == 'FROM_END');
//     if (newAt != this.isAt_) {
//       var block = this.getSourceBlock();
//       block.updateAt_(newAt);
//     }
//   });
//   this.updateAt_(true);
//   // Assign 'this' to a variable for use in the tooltip closure below.
//   var thisBlock = this;
//   this.setTooltip(function () {
//     var where = thisBlock.getFieldValue('WHERE');
//     var tooltip = Blockly.Msg['TEXT_CHARAT_TOOLTIP'];
//     if (where == 'FROM_START' || where == 'FROM_END') {
//       var msg = (where == 'FROM_START') ?
//         Blockly.Msg['LISTS_INDEX_FROM_START_TOOLTIP'] :
//         Blockly.Msg['LISTS_INDEX_FROM_END_TOOLTIP'];
//       if (msg) {
//         tooltip += '  ' + msg.replace('%1',
//           thisBlock.workspace.options.oneBasedIndex ? '#1' : '#0');
//       }
//     }
//     return tooltip;
//   });
// };

