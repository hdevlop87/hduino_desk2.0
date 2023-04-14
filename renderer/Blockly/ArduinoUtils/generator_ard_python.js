import  Blockly from 'blockly/core';
import 'blockly/python_compressed'
import "./static_typing"

Blockly.PyArduino = new Blockly.Generator('PyArduino');
Blockly.PyArduino.StaticTyping = new Blockly.StaticTyping();

Blockly.PyArduino.addReservedWords(
    'False,None,True,and,as,assert,break,class,continue,def,del,elif,else,' +
    'except,exec,finally,for,from,global,if,import,in,is,lambda,nonlocal,not,' +
    'or,pass,print,raise,return,try,while,with,yield,' +
    'NotImplemented,Ellipsis,__debug__,quit,exit,copyright,license,credits,' +
    'ArithmeticError,AssertionError,AttributeError,BaseException,' +
    'BlockingIOError,BrokenPipeError,BufferError,BytesWarning,' +
    'ChildProcessError,ConnectionAbortedError,ConnectionError,' +
    'ConnectionRefusedError,ConnectionResetError,DeprecationWarning,EOFError,' +
    'Ellipsis,EnvironmentError,Exception,FileExistsError,FileNotFoundError,' +
    'FloatingPointError,FutureWarning,GeneratorExit,IOError,ImportError,' +
    'ImportWarning,IndentationError,IndexError,InterruptedError,' +
    'IsADirectoryError,KeyError,KeyboardInterrupt,LookupError,MemoryError,' +
    'ModuleNotFoundError,NameError,NotADirectoryError,NotImplemented,' +
    'NotImplementedError,OSError,OverflowError,PendingDeprecationWarning,' +
    'PermissionError,ProcessLookupError,RecursionError,ReferenceError,' +
    'ResourceWarning,RuntimeError,RuntimeWarning,StandardError,' +
    'StopAsyncIteration,StopIteration,SyntaxError,SyntaxWarning,SystemError,' +
    'SystemExit,TabError,TimeoutError,TypeError,UnboundLocalError,' +
    'UnicodeDecodeError,UnicodeEncodeError,UnicodeError,' +
    'UnicodeTranslateError,UnicodeWarning,UserWarning,ValueError,Warning,' +
    'ZeroDivisionError,_,__build_class__,__debug__,__doc__,__import__,' +
    '__loader__,__name__,__package__,__spec__,abs,all,any,apply,ascii,' +
    'basestring,bin,bool,buffer,bytearray,bytes,callable,chr,classmethod,cmp,' +
    'coerce,compile,complex,copyright,credits,delattr,dict,dir,divmod,' +
    'enumerate,eval,exec,execfile,exit,file,filter,float,format,frozenset,' +
    'getattr,globals,hasattr,hash,help,hex,id,input,int,intern,isinstance,' +
    'issubclass,iter,len,license,list,locals,long,map,max,memoryview,min,' +
    'next,object,oct,open,ord,pow,print,property,quit,range,raw_input,reduce,' +
    'reload,repr,reversed,round,set,setattr,slice,sorted,staticmethod,str,' +
    'sum,super,tuple,type,unichr,unicode,vars,xrange,zip'
);

Blockly.PyArduino.ORDER_ATOMIC = 0;            // 0 "" ...
Blockly.PyArduino.ORDER_COLLECTION = 1;        // tuples, lists, dictionaries
Blockly.PyArduino.ORDER_STRING_CONVERSION = 1; // `expression...`
Blockly.PyArduino.ORDER_MEMBER = 2.1;          // . []
Blockly.PyArduino.ORDER_FUNCTION_CALL = 2.2;   // ()
Blockly.PyArduino.ORDER_EXPONENTIATION = 3;    // **
Blockly.PyArduino.ORDER_UNARY_SIGN = 4;        // + -
Blockly.PyArduino.ORDER_BITWISE_NOT = 4;       // ~
Blockly.PyArduino.ORDER_MULTIPLICATIVE = 5;    // * / // %
Blockly.PyArduino.ORDER_ADDITIVE = 6;          // + -
Blockly.PyArduino.ORDER_BITWISE_SHIFT = 7;     // << >>
Blockly.PyArduino.ORDER_BITWISE_AND = 8;       // &
Blockly.PyArduino.ORDER_BITWISE_XOR = 9;       // ^
Blockly.PyArduino.ORDER_BITWISE_OR = 10;       // |
Blockly.PyArduino.ORDER_RELATIONAL = 11;       // in, not in, is, is not,
//     <, <=, >, >=, <>, !=, ==
Blockly.PyArduino.ORDER_LOGICAL_NOT = 12;      // not
Blockly.PyArduino.ORDER_LOGICAL_AND = 13;      // and
Blockly.PyArduino.ORDER_LOGICAL_OR = 14;       // or
Blockly.PyArduino.ORDER_CONDITIONAL = 15;      // if else
Blockly.PyArduino.ORDER_LAMBDA = 16;           // lambda
Blockly.PyArduino.ORDER_NONE = 99;

Blockly.PyArduino.PinTypes = {
    INPUT: 'INPUT',
    OUTPUT: 'OUTPUT',
    PWM: 'PWM',
    SERVO: 'SERVO',
    STEPPER: 'STEPPER',
    SERIAL: 'SERIAL',
    I2C: 'I2C/TWI',
    SPI: 'SPI'
};

Blockly.PyArduino.ORDER_OVERRIDES = [
    [Blockly.PyArduino.ORDER_FUNCTION_CALL, Blockly.PyArduino.ORDER_MEMBER],
    [Blockly.PyArduino.ORDER_FUNCTION_CALL, Blockly.PyArduino.ORDER_FUNCTION_CALL],
    [Blockly.PyArduino.ORDER_MEMBER, Blockly.PyArduino.ORDER_MEMBER],
    [Blockly.PyArduino.ORDER_MEMBER, Blockly.PyArduino.ORDER_FUNCTION_CALL],
    [Blockly.PyArduino.ORDER_LOGICAL_NOT, Blockly.PyArduino.ORDER_LOGICAL_NOT],
    [Blockly.PyArduino.ORDER_LOGICAL_AND, Blockly.PyArduino.ORDER_LOGICAL_AND],
    [Blockly.PyArduino.ORDER_LOGICAL_OR, Blockly.PyArduino.ORDER_LOGICAL_OR]
];

Blockly.PyArduino.init = function (workspace) {
    Blockly.PyArduino.includes_ = Object.create(null);
    Blockly.PyArduino.definitions_ = Object.create(null);
    Blockly.PyArduino.variables_ = Object.create(null);
    Blockly.PyArduino.codeFunctions_ = Object.create(null);
    Blockly.PyArduino.userFunctions_ = Object.create(null);
    Blockly.PyArduino.functionNames_ = Object.create(null);
    Blockly.PyArduino.setups_ = Object.create(null);
    Blockly.PyArduino.loops_ = Object.create(null);
    Blockly.PyArduino.pins_ = Object.create(null);
    Blockly.PyArduino.loopCode_ = Object.create(null);
    if (!Blockly.PyArduino.nameDB_) {
        Blockly.PyArduino.nameDB_ =
            new Blockly.Names(Blockly.PyArduino.RESERVED_WORDS_);
    } else {
        Blockly.PyArduino.nameDB_.reset();
    }
    Blockly.PyArduino.nameDB_.setVariableMap(workspace.getVariableMap());
    var varsWithTypes = Blockly.PyArduino.StaticTyping.collectVarsWithTypes(workspace);
    Blockly.PyArduino.StaticTyping.setProcedureArgs(workspace, varsWithTypes);
};

Blockly.PyArduino.recurseArrayType = function (varName, varsWithTypes) {
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
                    var varType = Blockly.PyArduino.recurseArrayType(varName, varsWithTypes);
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

        return Blockly.PyArduino.getArduinoType_(varsWithTypes[varName]) + arrayDimension;
    } else {
        // the var is inderectly defined by an array block with variable on
        // input
        var varTab = varsWithTypes[varName].arrayType[1];
        if (varTab == varName || !varsWithTypes[varTab]) {
            // prevent direct recursive calls
            // don't prevent undirect use of the same variable
            return 'undefined';
        } else {
            var varType = Blockly.PyArduino.recurseArrayType(varTab, varsWithTypes);
            return Blockly.PyArduino.insertParentArraySize(varType, varsWithTypes[varName].arraySize);
        }
    }
};

Blockly.PyArduino.insertParentArraySize = function (varType, parentArraySize) {
    if (varType.indexOf('[') >= 0) {
        return varType.substr(0, varType.indexOf('[')) + '[' + parentArraySize + ']' + varType.substr(varType.indexOf('['));
    } else {
        return varType + '[' + parentArraySize + ']';
    }
};

Blockly.PyArduino.finish = function (code) {

    var includes = [], definitions = [], variables = [], functions = [], loopCode = [];

    for (var name in Blockly.PyArduino.loopCode_) {
        loopCode.push(Blockly.PyArduino.loopCode_[name]);
    }

    for (var name in Blockly.PyArduino.includes_) {
        includes.push(Blockly.PyArduino.includes_[name]);
    }
    if (includes.length) {
        includes.push('\n');
        includes = [...new Set(includes)]
    }
    for (var name in Blockly.PyArduino.variables_) {
        variables.push(Blockly.PyArduino.variables_[name]);

    }
    if (variables.length) {
        variables.push('\n');
    }
    for (var name in Blockly.PyArduino.definitions_) {
        definitions.push(Blockly.PyArduino.definitions_[name]);
    }
    if (definitions.length) {
        definitions.push('\n');
    }
    for (var name in Blockly.PyArduino.codeFunctions_) {
        functions.push(Blockly.PyArduino.codeFunctions_[name]);
    }
    for (var name in Blockly.PyArduino.userFunctions_) {
        functions.push(Blockly.PyArduino.userFunctions_[name]);
    }
    if (functions.length) {
        functions.push('\n');
    }

    var setups = [''], userSetupCode = '';
    if (Blockly.PyArduino.setups_['userSetupCode'] !== undefined) {
        userSetupCode =  Blockly.PyArduino.setups_['userSetupCode'];
        delete Blockly.PyArduino.setups_['userSetupCode'];
    }
    for (var name in Blockly.PyArduino.setups_) {
        setups.push(Blockly.PyArduino.setups_[name]);
    }
    if (userSetupCode) {
        setups.push(userSetupCode);
    }

    setups = setups.filter(function (e) { return e });

    var loops = '';
    if (Blockly.PyArduino.loops_['userLoopCode'] !== undefined) {
        loops = '\n' + Blockly.PyArduino.loops_['userLoopCode'];
        delete Blockly.PyArduino.loops_['userLoopCode'];
    }

    // Clean up temporary data
    delete Blockly.PyArduino.includes_;
    delete Blockly.PyArduino.definitions_;
    delete Blockly.PyArduino.codeFunctions_;
    delete Blockly.PyArduino.userFunctions_;
    delete Blockly.PyArduino.functionNames_;
    delete Blockly.PyArduino.setups_;
    delete Blockly.PyArduino.loops_;
    delete Blockly.PyArduino.pins_;
    Blockly.PyArduino.nameDB_.reset();

    var allDefs = includes.join('\n') + variables.join('\n') + definitions.join('\n') + functions.join('\n\n');
    var setup = 'def setup():\n' + setups.join('\n') + '\n\nsetup()\n\n';
    var loop = 'def loop():' + loopCode.join('\n') + loops.replace(/\n/g, '\n  ') + '\n\nwhile True:\n  loop()\n\n';
    return allDefs + setup + loop;
};

Blockly.PyArduino.addInclude = function (includeTag, code) {
    if (Blockly.PyArduino.includes_[includeTag] === undefined) {
        Blockly.PyArduino.includes_[includeTag] = code;
    }
}

Blockly.PyArduino.addDeclaration = function (declarationTag, code) {
    if (Blockly.PyArduino.definitions_[declarationTag] === undefined) {
        Blockly.PyArduino.definitions_[declarationTag] = code;
    }
};

Blockly.PyArduino.addInclude = function (includeTag, code) {
    if (Blockly.PyArduino.includes_[includeTag] === undefined) {
        Blockly.PyArduino.includes_[includeTag] = code;
    }
};

Blockly.PyArduino.addDeclaration = function (declarationTag, code) {
    if (Blockly.PyArduino.definitions_[declarationTag] === undefined) {
        Blockly.PyArduino.definitions_[declarationTag] = code;
    }
};

Blockly.PyArduino.addVariable = function (varName, code, overwrite) {
    var overwritten = false;
    if (overwrite || (Blockly.PyArduino.variables_[varName] === undefined)) {
        Blockly.PyArduino.variables_[varName] = code;
        overwritten = true;
    }
    return overwritten;
};

Blockly.PyArduino.addSetup = function (setupTag, code, overwrite) {
    var overwritten = false;
    if (overwrite || (Blockly.PyArduino.setups_[setupTag] === undefined)) {
        Blockly.PyArduino.setups_[setupTag] = code;
        overwritten = true;
    }
    return overwritten;
};

Blockly.PyArduino.addLoop = function (loopTag, code, overwrite) {
    var overwritten = false;
    if (overwrite || (Blockly.Arduino.loops_[loopTag] === undefined)) {
        Blockly.PyArduino.loops_[loopTag] = code;
        overwritten = true;
    }
    return overwritten;
};

Blockly.PyArduino.addFunction = function (preferedName, code) {
    if (Blockly.PyArduino.codeFunctions_[preferedName] === undefined) {
        var uniqueName = Blockly.PyArduino.nameDB_.getDistinctName(
            preferedName, Blockly.Generator.NAME_TYPE);
        Blockly.PyArduino.codeFunctions_[preferedName] =
            code.replace(Blockly.PyArduino.DEF_FUNC_NAME, uniqueName);
        Blockly.PyArduino.functionNames_[preferedName] = uniqueName;
    }
    return Blockly.PyArduino.functionNames_[preferedName];
};

Blockly.PyArduino.reservePin = function (block, pin, pinType, warningTag) {
    if (Blockly.PyArduino.pins_[pin] !== undefined) {
        if (Blockly.PyArduino.pins_[pin] != pinType) {
            block.setWarningText(Blockly.Msg.ARD_PIN_WARN1.replace('%1', pin)
                .replace('%2', warningTag).replace('%3', pinType)
                .replace('%4', Blockly.PyArduino.pins_[pin]), warningTag);
        } else {
            block.setWarningText(null, warningTag);
        }
    } else {
        Blockly.PyArduino.pins_[pin] = pinType;
        block.setWarningText(null, warningTag);
    }
};

Blockly.PyArduino.scrubNakedValue = function (line) {
    return line + '\n';
};

Blockly.PyArduino.quote_ = function (string) {
    // Can't use goog.string.quote since % must also be escaped.
    string = string.replace(/\\/g, '\\\\')
        .replace(/\n/g, '\\\n');

    // Follow the CPython behaviour of repr() for a non-byte string.
    var quote = '\'';
    if (string.indexOf('\'') !== -1) {
        if (string.indexOf('"') === -1) {
            quote = '"';
        } else {
            string = string.replace(/'/g, '\\\'');
        }
    }
    return quote + string + quote;
};

Blockly.PyArduino.multiline_quote_ = function (string) {
    var lines = string.split(/\n/g).map(this.quote_);
    // Join with the following, plus a newline:
    // + '\n' +
    return lines.join(' + \'\\n\' + \n');
};

Blockly.PyArduino.scrub_ = function (block, code, opt_thisOnly) {
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
    var nextCode = opt_thisOnly ? '' : this.blockToCode(nextBlock);
    return commentCode + code + nextCode;
};

Blockly.PyArduino.getAdjustedInt = function (block, atId, opt_delta, opt_negate) {
    var delta = opt_delta || 0;
    if (block.workspace.options.oneBasedIndex) {
        delta--;
    }
    var defaultAtIndex = block.workspace.options.oneBasedIndex ? '1' : '0';
    var atOrder = delta ? this.ORDER_ADDITIVE : this.ORDER_NONE;
    var at = this.valueToCode(block, atId, atOrder) || defaultAtIndex;

    if (Blockly.isNumber(at)) {
        // If the index is a naked number, adjust it right now.
        at = parseInt(at, 10) + delta;
        if (opt_negate) {
            at = -at;
        }
    } else {
        // If the index is dynamic, adjust it in code.
        if (delta > 0) {
            at = 'int(' + at + ' + ' + delta + ')';
        } else if (delta < 0) {
            at = 'int(' + at + ' - ' + -delta + ')';
        } else {
            at = 'int(' + at + ')';
        }
        if (opt_negate) {
            at = '-' + at;
        }
    }
    return at;
};

Blockly.PyArduino.getArduinoType_ = function (typeBlockly) {
    switch (typeBlockly.typeId) {
        case Blockly.Types.SHORT_NUMBER.typeId:
            return 'char';
        case Blockly.Types.NUMBER.typeId:
            return 'int';
        case Blockly.Types.LARGE_NUMBER.typeId:
            return 'long';
        case Blockly.Types.DECIMAL.typeId:
            return 'float';
        case Blockly.Types.TEXT.typeId:
            return 'String';
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

Blockly.PyArduino.noGeneratorCodeInline = function () {
    return ['', Blockly.PyArduino.ORDER_ATOMIC];
};

Blockly.PyArduino.noGeneratorCodeLine = function () { return ''; };

