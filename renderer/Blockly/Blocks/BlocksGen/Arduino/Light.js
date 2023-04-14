import  Blockly from 'blockly/core';
import '../../../ArduinoUtils/generator_arduino'
//======================================================================//
Blockly.Arduino['led_digitalwrite'] = function (block) {
    var pin = block.getFieldValue('PIN') ;
    var stateOutput = block.getFieldValue('STATE') || 'LOW';
    var pinSetupCode = '  pinMode(' + pin + ', OUTPUT);';

    if (pin != "j" && pin != "i"){
        Blockly.Arduino.addSetup('io_' + pin, pinSetupCode, false);
    }
    var code = 'digitalWrite(' + pin + ', ' + stateOutput + ');\n';
    return code;
};
//======================================================================//
Blockly.Arduino.lcd_i2c_lcdinit = function () {
    var dropdown_I2C_adress = this.getFieldValue('ADD');
    var dropdown_nbcol = this.getFieldValue('Col');
    var dropdown_nbrow = this.getFieldValue('Row');
    var dropdown_cursor = this.getFieldValue('Cr');

    Blockly.Arduino.includes_['define_Wire'] = '#include <Wire.h>';
    Blockly.Arduino.includes_['define_LiquidCrystal_I2C'] = '#include <LiquidCrystal_I2C.h>';
    Blockly.Arduino.definitions_['var_lcd'] = 'LiquidCrystal_I2C lcd(' + dropdown_I2C_adress + ', ' + dropdown_nbcol + ', ' + dropdown_nbrow + ');';
    var mysetup = '  lcd.init();\n';
    mysetup += '  lcd.backlight();\n';
    mysetup += '  lcd.noBlink();\n';

    if (dropdown_cursor == "TRUE") {
        mysetup += '  lcd.cursor();\n';
    } else {
        mysetup += '  lcd.noCursor();\n';
    }

    Blockly.Arduino.setups_['setup_lcd'] = mysetup;
    var code = "";
    return code;
};

Blockly.Arduino.lcd_i2c_lcdclear = function () {
    var code = 'lcd.clear();\n';
    return code;
};

Blockly.Arduino.lcd_i2c_lcdwrite = function () {
    var text = Blockly.Arduino.valueToCode(this, 'TEXT',Blockly.Arduino.ORDER_UNARY_POSTFIX) || '\'\'';
    var dropdown_nbcol = this.getFieldValue('Col');
    var dropdown_nbrow = this.getFieldValue('Row');
    var code = 'lcd.setCursor(' + dropdown_nbcol + ',' + dropdown_nbrow + ');\n' +'lcd.print(' + text + ');\n';
    return code;
};