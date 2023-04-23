import  Blockly from 'blockly/core';
import "./static_typing"

Blockly.Arduino = new Blockly.Generator('Arduino');
Blockly.Arduino.StaticTyping = new Blockly.StaticTyping();

Blockly.Arduino.addReservedWords(
  'Blockly,' +  // In case JS is evaled in the current window.
  'setup,loop,if,else,for,switch,case,while,do,break,continue,return,goto,' +
  'define,include,HIGH,LOW,INPUT,OUTPUT,INPUT_PULLUP,true,false,integer,' +
  'constants,floating,point,void,boolean,char,unsigned,byte,int,word,long,' +
  'float,double,string,String,array,static,volatile,const,sizeof,pinMode,' +
  'digitalWrite,digitalRead,analogReference,analogRead,analogWrite,tone,' +
  'noTone,shiftOut,shitIn,pulseIn,millis,micros,delay,delayMicroseconds,' +
  'min,max,abs,constrain,map,pow,sqrt,sin,cos,tan,randomSeed,random,' +
  'lowByte,highByte,bitRead,bitWrite,bitSet,bitClear,bit,attachInterrupt,' + 
  'detachInterrupt,interrupts,noInterrupts');

/** Order of operation ENUMs. */
Blockly.Arduino.ORDER_ATOMIC = 0;         // 0 "" ...
Blockly.Arduino.ORDER_UNARY_POSTFIX = 1;  // expr++ expr-- () [] .
Blockly.Arduino.ORDER_UNARY_PREFIX = 2;   // -expr !expr ~expr ++expr --expr
Blockly.Arduino.ORDER_MULTIPLICATIVE = 3; // * / % ~/
Blockly.Arduino.ORDER_ADDITIVE = 4;       // + -
Blockly.Arduino.ORDER_SHIFT = 5;          // << >>
Blockly.Arduino.ORDER_RELATIONAL = 6;     // is is! >= > <= <
Blockly.Arduino.ORDER_EQUALITY = 7;       // == != === !==
Blockly.Arduino.ORDER_BITWISE_AND = 8;    // &
Blockly.Arduino.ORDER_BITWISE_XOR = 9;    // ^
Blockly.Arduino.ORDER_BITWISE_OR = 10;    // |
Blockly.Arduino.ORDER_LOGICAL_AND = 11;   // &&
Blockly.Arduino.ORDER_LOGICAL_OR = 12;    // ||
Blockly.Arduino.ORDER_CONDITIONAL = 13;   // expr ? expr : expr
Blockly.Arduino.ORDER_ASSIGNMENT = 14;    // = *= /= ~/= %= += -= <<= >>= &= ^= |=
Blockly.Arduino.ORDER_COMMA = 15;    // ,
Blockly.Arduino.ORDER_UNARY_NEGATION = 16;
Blockly.Arduino.ORDER_MEMBER = 17;
Blockly.Arduino.ORDER_NONE = 99;          // (...)

Blockly.Arduino.PinTypes = {
  INPUT: 'INPUT',
  OUTPUT: 'OUTPUT',
  PWM: 'PWM',
  SERVO: 'SERVO',
  STEPPER: 'STEPPER',
  SERIAL: 'SERIAL',
  I2C: 'I2C/TWI',
  SPI: 'SPI'
};

Blockly.Arduino.ORDER_OVERRIDES = [
  [Blockly.Arduino.ORDER_FUNCTION_CALL, Blockly.Arduino.ORDER_MEMBER],
  [Blockly.Arduino.ORDER_FUNCTION_CALL, Blockly.Arduino.ORDER_FUNCTION_CALL],
  [Blockly.Arduino.ORDER_MEMBER, Blockly.Arduino.ORDER_MEMBER],
  [Blockly.Arduino.ORDER_MEMBER, Blockly.Arduino.ORDER_FUNCTION_CALL],
  [Blockly.Arduino.ORDER_LOGICAL_NOT, Blockly.Arduino.ORDER_LOGICAL_NOT],
  [Blockly.Arduino.ORDER_MULTIPLICATION, Blockly.Arduino.ORDER_MULTIPLICATION],
  [Blockly.Arduino.ORDER_ADDITION, Blockly.Arduino.ORDER_ADDITION],
  [Blockly.Arduino.ORDER_LOGICAL_AND, Blockly.Arduino.ORDER_LOGICAL_AND],
  [Blockly.Arduino.ORDER_LOGICAL_OR, Blockly.Arduino.ORDER_LOGICAL_OR]
];

Blockly.Arduino.DEF_FUNC_NAME = Blockly.Arduino.FUNCTION_NAME_PLACEHOLDER_;

Blockly.Arduino.init = function (workspace) {
  Blockly.Arduino.includes_ = Object.create(null);
  Blockly.Arduino.definitions_ = Object.create(null);
  Blockly.Arduino.variables_ = Object.create(null);
  Blockly.Arduino.codeFunctions_ = Object.create(null);
  Blockly.Arduino.userFunctions_ = Object.create(null);
  Blockly.Arduino.functionNames_ = Object.create(null);
  Blockly.Arduino.setups_ = Object.create(null);
  Blockly.Arduino.loops_ = Object.create(null);
  Blockly.Arduino.pins_ = Object.create(null);
  Blockly.Arduino.loopCode_ = Object.create(null);

  if (!Blockly.Arduino.nameDB_) {
    Blockly.Arduino.nameDB_ =
      new Blockly.Names(Blockly.Arduino.RESERVED_WORDS_);
  } else {
    Blockly.Arduino.nameDB_.reset();
  }

  Blockly.Arduino.nameDB_.setVariableMap(workspace.getVariableMap());
  Blockly.Arduino.nameDB_.populateVariables(workspace);
  Blockly.Arduino.nameDB_.populateProcedures(workspace);

  
	var defvars = [];
	var variables = Blockly.Variables.allDeveloperVariables(workspace);
	for (var x = 0; x < variables.length; x++) {
		defvars[x] = 'int ' +
				Blockly.Arduino.nameDB_.getName(variables[x],Blockly.Names.NameType.VARIABLE) + ';\n';
	}
	Blockly.Arduino.definitions_['variables'] = defvars.join('\n');

};

Blockly.Arduino.recurseArrayType = function (varName, varsWithTypes) {
  if (!varsWithTypes[varName].arrayType
    || varsWithTypes[varName].arrayType instanceof Blockly.Type) {
    // The var is directly defined by an array block with childblock
    var arrayDimension = '';
    if (varsWithTypes[varName].arrayType) {
      // if array block is constructed with array blocks
      var subArray = varsWithTypes[varName].arrayType;
      // build array dimension(s)
      arrayDimension = '[' + varsWithTypes[varName].arraySize + ']';
      while (subArray.arrayType) {
        arrayDimension += '[' + subArray.arraySize + ']';
        subArray = subArray.arrayType;
      }
      // if the final block is a variable
      if (!(subArray instanceof Blockly.Type)) {
        varName = subArray[1];
        if (varsWithTypes[varName].arrayType) {
          var varType = Blockly.Arduino.recurseArrayType(varName, varsWithTypes);
          // if the var is an array
          // 1- get the type
          // 2- apply the dimensions already built
          // 3- add the dimension of this array
          return varType.substr(0, varType.indexOf('['))
            + arrayDimension
            + varType.substr(varType.indexOf('['));
        }
      }
    }

    return Blockly.Arduino.getArduinoType_(varsWithTypes[varName]) + arrayDimension;
  } else {
    // the var is inderectly defined by an array block with variable on
    // input
    var varTab = varsWithTypes[varName].arrayType[1];
    if (varTab == varName || !varsWithTypes[varTab]) {
      // prevent direct recursive calls
      // don't prevent undirect use of the same variable
      return 'undefined';
    } else {
      var varType = Blockly.Arduino.recurseArrayType(varTab, varsWithTypes);
      return Blockly.Arduino.insertParentArraySize(varType, varsWithTypes[varName].arraySize);
    }
  }
};

Blockly.Arduino.insertParentArraySize = function (varType, parentArraySize) {
  if (varType.indexOf('[') >= 0) {
    return varType.substr(0, varType.indexOf('[')) + '[' + parentArraySize + ']' + varType.substr(varType.indexOf('['));
  } else {
    return varType + '[' + parentArraySize + ']';
  }
};

Blockly.Arduino.finish = function (code) {

  var includes = [], definitions = [], variables = [], functions = [], loopCode = [];

  for (var name in Blockly.Arduino.loopCode_) {
    loopCode.push(Blockly.Arduino.loopCode_[name]);
  }

  for (var name in Blockly.Arduino.includes_) {
    includes.push(Blockly.Arduino.includes_[name]);
  }
  if (includes.length) {
    includes.push('\n');
    includes = [...new Set(includes)]
  }
  for (var name in Blockly.Arduino.variables_) {
    variables.push(Blockly.Arduino.variables_[name]);
    
  }
  if (variables.length) {
    variables.push('\n');
  }
  for (var name in Blockly.Arduino.definitions_) {
    definitions.push(Blockly.Arduino.definitions_[name]);
  }
  if (definitions.length) {
    definitions.push('\n');
  }
  for (var name in Blockly.Arduino.codeFunctions_) {
    functions.push(Blockly.Arduino.codeFunctions_[name]);
  }
  for (var name in Blockly.Arduino.userFunctions_) {
    functions.push(Blockly.Arduino.userFunctions_[name]);
  }
  if (functions.length) {
    functions.push('\n');
  }

  var setups = [''], userSetupCode = '';
  if (Blockly.Arduino.setups_['userSetupCode'] !== undefined) {
    userSetupCode = Blockly.Arduino.setups_['userSetupCode'];
    delete Blockly.Arduino.setups_['userSetupCode'];
  }
  for (var name in Blockly.Arduino.setups_) {
    setups.push(Blockly.Arduino.setups_[name]);
  }
  if (userSetupCode) {
    setups.push(userSetupCode);
  }

  setups = setups.filter(function (e) { return e });

  var loops = '';
  if (Blockly.Arduino.loops_['userLoopCode'] !== undefined) {
    loops = '\n' + Blockly.Arduino.loops_['userLoopCode'];
    
    delete Blockly.Arduino.loops_['userLoopCode'];
  }

  // Clean up temporary data
  delete Blockly.Arduino.includes_;
  delete Blockly.Arduino.definitions_;
  delete Blockly.Arduino.codeFunctions_;
  delete Blockly.Arduino.userFunctions_;
  delete Blockly.Arduino.functionNames_;
  delete Blockly.Arduino.setups_;
  delete Blockly.Arduino.loops_;
  delete Blockly.Arduino.pins_;
  Blockly.Arduino.nameDB_.reset();

  var allDefs = includes.join('\n') + variables.join('\n') 
  var setup = 'void setup() {\n' + setups.join('\n') + '\n}\n\n';
  var loop = 'void loop() {\n  ' + loopCode.join('\n  ') + loops.replace(/\n/g, '\n  ') + '\n}\n\n';
  return allDefs + setup + loop;
};

Blockly.Arduino.addInclude = function (includeTag, code) {
  if (Blockly.Arduino.includes_[includeTag] === undefined) {
    Blockly.Arduino.includes_[includeTag] = code;
  }
};

Blockly.Arduino.addDeclaration = function (declarationTag, code) {
  if (Blockly.Arduino.definitions_[declarationTag] === undefined) {
    Blockly.Arduino.definitions_[declarationTag] = code;
  }
};

Blockly.Arduino.addVariable = function (varName, code, overwrite) {
  var overwritten = false;
  if (overwrite || (Blockly.Arduino.variables_[varName] === undefined)) {
    Blockly.Arduino.variables_[varName] = code;
    overwritten = true;
  }
  return overwritten;
};

Blockly.Arduino.addSetup = function (setupTag, code, overwrite) {
  var overwritten = false;
  if (overwrite || (Blockly.Arduino.setups_[setupTag] === undefined)) {
    Blockly.Arduino.setups_[setupTag] = code;
    overwritten = true;
  }
  return overwritten;
};

Blockly.Arduino.addLoop = function (loopTag, code, overwrite) {
  var overwritten = false;
  if (overwrite || (Blockly.Arduino.loops_[loopTag] === undefined)) {
    Blockly.Arduino.loops_[loopTag] = code;
    overwritten = true;
  }
  return overwritten;
};

Blockly.Arduino.addFunction = function (preferedName, code) {
  if (Blockly.Arduino.codeFunctions_[preferedName] === undefined) {
    var uniqueName = Blockly.Arduino.nameDB_.getDistinctName(
      preferedName, Blockly.Generator.NAME_TYPE);
    Blockly.Arduino.codeFunctions_[preferedName] =
      code.replace(Blockly.Arduino.DEF_FUNC_NAME, uniqueName);
    Blockly.Arduino.functionNames_[preferedName] = uniqueName;
  }
  return Blockly.Arduino.functionNames_[preferedName];
};

Blockly.Arduino.reservePin = function (block, pin, pinType, warningTag) {
  if (Blockly.Arduino.pins_[pin] !== undefined) {
    if (Blockly.Arduino.pins_[pin] != pinType) {
      block.setWarningText(Blockly.Msg.ARD_PIN_WARN1.replace('%1', pin)
        .replace('%2', warningTag).replace('%3', pinType)
        .replace('%4', Blockly.Arduino.pins_[pin]), warningTag);
    } else {
      block.setWarningText(null, warningTag);
    }
  } else {
    Blockly.Arduino.pins_[pin] = pinType;
    block.setWarningText(null, warningTag);
  }
};

Blockly.Arduino.scrubNakedValue = function (line) {
  return line + ';\n';
};

Blockly.Arduino.quote_ = function (string) {
  // TODO: This is a quick hack.  Replace with goog.string.quote
  string = string.replace(/\\/g, '\\\\')
    .replace(/\n/g, '\\\n')
    .replace(/\$/g, '\\$')
    .replace(/'/g, '\\\'');
  return '\"' + string + '\"';
};

Blockly.Arduino.scrub_ = function (block, code) {
  if (code === null) { return ''; } // Block has handled code generation itself
  var commentCode = '';
  if (!block.outputConnection || !block.outputConnection.targetConnection) {
    var comment = block.getCommentText();
    if (comment) {
      commentCode += this.prefixLines(comment, '// ') + '\n';
    }
    for (var x = 0; x < block.inputList.length; x++) {
      if (block.inputList[x].type == Blockly.INPUT_VALUE) {
        var childBlock = block.inputList[x].connection.targetBlock();
        if (childBlock) {
          var comment = this.allNestedComments(childBlock);
          if (comment) {
            commentCode += this.prefixLines(comment, '// ');
          }
        }
      }
    }
  }
  var nextBlock = block.nextConnection && block.nextConnection.targetBlock();
  var nextCode = this.blockToCode(nextBlock);
  return commentCode + code + nextCode;
};

Blockly.Arduino.getArduinoType_ = function (typeBlockly) {
  switch (typeBlockly.typeId) {
    case Blockly.Types.CONST_NUMBER.typeId:
      return 'const int';
    case Blockly.Types.SHORT_NUMBER.typeId:
      return 'char';
    case Blockly.Types.NUMBER.typeId:
      return 'int';
    case Blockly.Types.UNS_NUMBER.typeId:
      return 'unsigned int';
    case Blockly.Types.LARGE_NUMBER.typeId:
      return 'long';
    case Blockly.Types.LARGE_UNS_NUMBER.typeId:
      return 'unsigned long';
    case Blockly.Types.DECIMAL.typeId:
      return 'float';
    case Blockly.Types.TEXT.typeId:
      return 'String';
    case Blockly.Types.VOLATIL_NUMBER.typeId:
      return 'Volatil';
    case Blockly.Types.CHARACTER.typeId:
      return 'char';
    case Blockly.Types.BOOLEAN.typeId:
      return 'boolean';
    case Blockly.Types.NULL.typeId:
      return 'void';
    case Blockly.Types.UNDEF.typeId:
      return 'undefined';
    case Blockly.Types.CHILD_BLOCK_MISSING.typeId:
      return 'int';
    default:
      return 'Invalid Blockly Type';
  }
};

Blockly.Arduino.noGeneratorCodeInline = function () {
  return ['', Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.noGeneratorCodeLine = function () { return ''; };
