import Blockly from 'blockly/core';

Blockly.Blocks['variables_get'] = {

   init: function () {
      this.jsonInit({
         'message0': '%1',
         'args0': [
           {
             'type': 'field_variable',
             'name': 'VAR',
             'variable': '%{BKY_VARIABLES_DEFAULT_NAME}',
           },
         ],
         'output': null,
         'colour':'#ff764c',
         'helpUrl': '%{BKY_VARIABLES_GET_HELPURL}',
         'tooltip': '%{BKY_VARIABLES_GET_TOOLTIP}',
         'extensions': ['contextMenu_variableSetterGetter'],
     });
   },
   getBlockType: function () {
      return [Blockly.Types.UNDEF, this.getFieldValue('VAR')];
   },

   getVarType: function (varName) {
      //return [Blockly.Types.UNDEF, this.getFieldValue('VAR')];
      return Blockly.Types.getChildBlockType(this) 
   }
};

Blockly.Blocks['variables_set'] = {
   init: function () {
      this.jsonInit({
         'type': 'variables_set',
         'message0': '%{BKY_VARIABLES_SET}',
         'args0': [
           {
             'type': 'field_variable',
             'name': 'VAR',
             'variable': '%{BKY_VARIABLES_DEFAULT_NAME}',
           },
           {
             'type': 'input_value',
             'name': 'VALUE',
           },
         ],
         'previousStatement': null,
         'nextStatement': null,
         'tooltip': '%{BKY_VARIABLES_SET_TOOLTIP}',
         'helpUrl': '%{BKY_VARIABLES_SET_HELPURL}',
         'extensions': ['contextMenu_variableSetterGetter'],
         'colour':'#ff764c'
      });
   },
   getBlockType: function () {
      return [Blockly.Types.ORDER_ATOMIC, this.getFieldValue('VAR')];
   },
   getVarType: function (varName) {
      return Blockly.Types.getChildBlockType(this);
   }
};

Blockly.Blocks['variables_set_type'] = {
   /**
    * Block for variable casting.
    * @this Blockly.Block
    */
   init: function () {
      this.setHelpUrl('http://arduino.cc/en/Reference/HomePage');
      this.setColour("#ff764c");
      this.appendValueInput('VARIABLE_SETTYPE_INPUT');
      this.appendDummyInput()
         .appendField(Blockly.Msg.VARIABLES_AS)
         .appendField(new Blockly.FieldDropdown(
            Blockly.Types.getValidTypeArray()), 'VARIABLE_SETTYPE_TYPE');
      this.setInputsInline(true);
      this.setOutput(true);
      this.setTooltip('Sets a value to a specific type');
   },
   /**
    * Assigns a type to the block based on the selected type to cast.
    * @return {!string} Blockly type for this block configuration.
    * @this Blockly.Block
    */
   getBlockType: function () {
      var blocklyTypeKey = this.getFieldValue('VARIABLE_SETTYPE_TYPE');
      return Blockly.Types[blocklyTypeKey];
   }
};

//======================================================================================//
Blockly.Blocks['variables_const'] = {
   init: function () {
      this.appendDummyInput("VALUE")
         .appendField("init")
         .appendField(new Blockly.FieldVariable(Blockly.Msg.VARIABLES_DEFAULT_NAME), 'VAR')
         .appendField(Blockly.Msg.VARIABLES_AS)
         .appendField(new Blockly.FieldDropdown(Blockly.Types.getValidTypeArray()), 'VARIABLE_SETTYPE_TYPE')
      this.setColour('#ff764c');
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setTooltip(Blockly.Msg.ARDUINO_VAR_CONST_tooltip);
      this.setHelpUrl(Blockly.Msg.HELPURL);
      this.contextMenuMsg_ = Blockly.Msg.VARIABLES_SET_CREATE_GET;
   },
   contextMenuType_: 'variables_get',
   customContextMenu: Blockly.Blocks['variables_get'].customContextMenu,

   getVarType: function (varName) {
      return Blockly.Types.getChildBlockType(this);
   }
};
//======================================================================================//
Blockly.Blocks['variables_set_init'] = {
   init: function () {
      this.appendValueInput("VALUE")
         .appendField("init")
         .appendField(new Blockly.FieldVariable(Blockly.Msg.VARIABLES_DEFAULT_NAME), 'VAR')
         .appendField(Blockly.Msg.VARIABLES_AS)
         .appendField(new Blockly.FieldDropdown(Blockly.Types.getValidTypeArray()), 'VARIABLE_SETTYPE_TYPE')
         .appendField(Blockly.Msg.VARIABLES_SET_CONST_AT);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour('#ff764c');
      this.setHelpUrl(Blockly.Msg.var_set_init_helpurl);
      this.setTooltip(Blockly.Msg.var_set_init_tooltip);
      this.contextMenuMsg_ = Blockly.Msg.VARIABLES_SET_CREATE_GET;
   },
   contextMenuType_: 'variables_get',
   customContextMenu: Blockly.Blocks['variables_get'].customContextMenu,

   getVarType: function (varName) {
      return Blockly.Types.getChildBlockType(this);
   }
};
//======================================================================//
Blockly.Blocks['io_2Var'] = {
   init: function () {
      this.appendDummyInput()
         .appendField(Blockly.Msg.VARIABLES_SET_CONST)
         .appendField(new Blockly.FieldTextInput(Blockly.Msg.VARIABLES_DEFAULT_NAME), 'VAR0')
         .appendField(new Blockly.FieldDropdown(Blockly.Arduino.Boards.selected.digitalPins), 'PIN0')
      this.appendDummyInput()
         .appendField(Blockly.Msg.VARIABLES_SET_CONST)
         .appendField(new Blockly.FieldTextInput(Blockly.Msg.VARIABLES_DEFAULT_NAME), 'VAR1')
         .appendField(new Blockly.FieldDropdown(Blockly.Arduino.Boards.selected.digitalPins), 'PIN1')
      this.setColour('#ff764c');
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setTooltip(Blockly.Msg.ARDUINO_VAR_CONST_tooltip);
      this.setHelpUrl(Blockly.Msg.HELPURL);
   }
};
//======================================================================//
Blockly.Blocks['io_VarIN'] = {
   init: function () {
      this.appendDummyInput()
         .appendField(Blockly.Msg.VARIABLES_SET_CONST)
         .appendField("IN")
         .appendField(new Blockly.FieldTextInput(Blockly.Msg.VARIABLES_DEFAULT_NAME), 'VAR')
         .appendField(Blockly.Msg.ARD_WRITE_TO)
         .appendField(new Blockly.FieldDropdown(Blockly.Arduino.Boards.selected.digitalPins), 'PIN')
      this.setColour('#ff764c');
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setTooltip(Blockly.Msg.ARDUINO_VAR_CONST_tooltip);
      this.setHelpUrl(Blockly.Msg.HELPURL);
   },
};
//======================================================================//
Blockly.Blocks['io_VarOut'] = {
   init: function () {
      this.appendDummyInput()
         .appendField(Blockly.Msg.VARIABLES_SET_CONST)
         .appendField("OUT")
         .appendField(new Blockly.FieldTextInput(Blockly.Msg.VARIABLES_DEFAULT_NAME), 'VAR')
         .appendField(Blockly.Msg.ARD_WRITE_TO)
         .appendField(new Blockly.FieldDropdown(Blockly.Arduino.Boards.selected.digitalPins), 'PIN')
      this.setColour('#ff764c');
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setTooltip(Blockly.Msg.ARDUINO_VAR_CONST_tooltip);
      this.setHelpUrl(Blockly.Msg.HELPURL);
   },
};

Blockly.Blocks['math_change'] = {

   init: function () {
      this.jsonInit({
         'message0': '%{BKY_MATH_CHANGE_TITLE}',
         'args0': [
           {
             'type': 'field_variable',
             'name': 'VAR',
             'variable': '%{BKY_MATH_CHANGE_TITLE_ITEM}',
           },
           {
             'type': 'input_value',
             'name': 'DELTA',
             'check': 'Number',
           },
         ],
         'previousStatement': null, 
         'nextStatement': null,
         'colour':'#ff764c',
         'helpUrl': '%{BKY_MATH_CHANGE_HELPURL}',
         'extensions': ['math_change_tooltip'],
      });
   },
   getVarType: function (varName) {
      return Blockly.Types.NUMBER;
   }
};

