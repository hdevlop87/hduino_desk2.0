import  Blockly from 'blockly/core';
import Colors from "../Colors";
import led_ico from '../../../../assets/img/ico/led_ico.png';
import lcd_ico from '../../../../assets/img/ico/lcd_ico.png';


// //======================================================================//
Blockly.Blocks['led_digitalwrite'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldImage('/img/ico/led_ico.png', 20, 20, { alt: "*", flipRtl: "FALSE" }))
            .appendField("Set")
            .appendField(new Blockly.FieldDropdown(Blockly.Arduino.AllPins), 'PIN')
            .appendField("to")
            .appendField(new Blockly.FieldDropdown([["ON", "HIGH"], ["OFF", "LOW"]]), "STATE");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip("");
        this.setHelpUrl("");
        this.setColour(Colors.light.primary); 
    }, 
    updateFields: function () {
        Blockly.Arduino.Boards.refreshBlockFieldDropdown(this, 'PIN', 'AllPins');
    },
};

Blockly.Blocks['lcd_i2c_lcdinit'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Init Lcd I2c")
            .appendField(new Blockly.FieldImage('/img/ico/lcd_ico.png', 120, 50, { alt: "*", flipRtl: "FALSE" }))
        this.appendDummyInput()
            .appendField("ADD")
            .appendField(new Blockly.FieldTextInput("0x2"), "ADD")
            .appendField("Col")
            .appendField(new Blockly.FieldTextInput("16"), "Col")
            .appendField("Row")
            .appendField(new Blockly.FieldTextInput("2"), "Row")
            .appendField("Cr")
            .appendField(new Blockly.FieldCheckbox("TRUE"), "Cr");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(Colors.light.primary);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.Blocks['lcd_i2c_lcdclear'] = {
    init: function () {
        this.setColour(Colors.light.primary);
        this.setHelpUrl('http://www.techno-zone-51.fr/dokuwiki2/doku.php?id=documentation:lcd1');
        this.appendDummyInput()
            .appendField("Clear Lcd ")
            .appendField(new Blockly.FieldImage('/img/ico/lcd_ico.png', 120, 50, { alt: "*", flipRtl: "FALSE" }))
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip(Blockly.Msg.TECHNOZONE51_TEXT93);
    }
};

Blockly.Blocks['lcd_i2c_lcdwrite'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldImage('/img/ico/lcd_ico.png', 120, 50, { alt: "*", flipRtl: "FALSE" }));
        this.appendValueInput("TEXT")
            .appendField("Write In")
            .appendField("Col")
            .appendField(new Blockly.FieldTextInput("0"), "Col") 
            .appendField("Row")
            .appendField(new Blockly.FieldTextInput("0"), "Row");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(Colors.light.primary);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

// Blockly.Blocks['lcd_i2c_lcdinit'] = {
//     init: function () {
//         this.setColour(Colors.light.primary);
//         this.setHelpUrl('http://www.techno-zone-51.fr/dokuwiki2/doku.php?id=documentation:lcd1');
//         this.appendDummyInput("")
//             .appendField(Blockly.Msg.TECHNOZONE51_TEXT74)
//             .appendField(new Blockly.FieldImage(lcd_ico, 100, 40, { alt: "*", flipRtl: "FALSE" }))
//         this.appendDummyInput("")
//             .setAlign(Blockly.ALIGN_RIGHT)
//             .appendField(Blockly.Msg.TECHNOZONE51_TEXT75)
//             .appendField(new Blockly.FieldTextInput('0x27', Blockly.Blocks.math_number.validator), 'I2C_adress');
//         this.appendDummyInput("")
//             .setAlign(Blockly.ALIGN_RIGHT)
//             .appendField(Blockly.Msg.TECHNOZONE51_TEXT76)
//             .appendField(new Blockly.FieldTextInput('16', Blockly.Blocks.math_number.validator), 'nbcol');
//         this.appendDummyInput("")
//             .setAlign(Blockly.ALIGN_RIGHT)
//             .appendField(Blockly.Msg.TECHNOZONE51_TEXT77)
//             .appendField(new Blockly.FieldTextInput('2', Blockly.Blocks.math_number.validator), 'nblig');
//         this.appendDummyInput("")
//             .setAlign(Blockly.ALIGN_RIGHT)
//             .appendField(Blockly.Msg.TECHNOZONE51_TEXT78)
//             .appendField(new Blockly.FieldCheckbox('TRUE'), 'backlight');
//         this.appendDummyInput("")
//             .setAlign(Blockly.ALIGN_RIGHT)
//             .appendField(Blockly.Msg.TECHNOZONE51_TEXT79)
//             .appendField(new Blockly.FieldCheckbox('FALSE'), 'cursor');
//         this.appendDummyInput("")
//             .setAlign(Blockly.ALIGN_RIGHT)
//             .appendField(Blockly.Msg.TECHNOZONE51_TEXT80)
//             .appendField(new Blockly.FieldCheckbox('FALSE'), 'blink');
//         this.setPreviousStatement(true, null);
//         this.setNextStatement(true, null);
//         this.setTooltip(Blockly.Msg.TECHNOZONE51_TEXT81);
//     }
// };

// //lcdclear
// Blockly.Blocks['lcd_i2c_lcdclear'] = {
//     init: function () {
//         this.setColour(Colors.light.primary);
//         this.setHelpUrl('http://www.techno-zone-51.fr/dokuwiki2/doku.php?id=documentation:lcd1');
//         this.appendDummyInput("")
//             .appendField(Blockly.Msg.TECHNOZONE51_TEXT92)
//             .appendField(new Blockly.FieldImage("blocks/lcd_i2c/lcd.jpg", Blockly.Arduino.imageSize, Blockly.Arduino.imageSize));
//         this.setPreviousStatement(true, null);
//         this.setNextStatement(true, null);
//         this.setTooltip(Blockly.Msg.TECHNOZONE51_TEXT93);
//     }
// };

// //lcdwrite
// Blockly.Blocks['lcd_i2c_lcdwrite'] = {
//     init: function () {
//         this.setColour(Colors.light.primary);
//         this.setHelpUrl('http://www.techno-zone-51.fr/dokuwiki2/doku.php?id=documentation:lcd1');
//         this.appendDummyInput("")
//             .appendField(Blockly.Msg.TECHNOZONE51_TEXT94)
//             .appendField(new Blockly.FieldImage("blocks/lcd_i2c/lcd.jpg", Blockly.Arduino.imageSize, Blockly.Arduino.imageSize))
//         this.appendValueInput("TEXT")
//             .setCheck('String')
//             .setAlign(Blockly.ALIGN_RIGHT)
//             .appendField(Blockly.Msg.TECHNOZONE51_TEXT98);
//         this.appendDummyInput("")
//             .appendField(Blockly.Msg.TECHNOZONE51_TEXT95);
//         this.appendValueInput("COL")
//             .setCheck('Number')
//             .setAlign(Blockly.ALIGN_RIGHT)
//             .appendField(Blockly.Msg.TECHNOZONE51_TEXT96)
//         this.appendValueInput("LIG")
//             .setCheck('Number')
//             .setAlign(Blockly.ALIGN_RIGHT)
//             .appendField(Blockly.Msg.TECHNOZONE51_TEXT97)
//         this.setPreviousStatement(true, null);
//         this.setNextStatement(true, null);
//         this.setTooltip(Blockly.Msg.TECHNOZONE51_TEXT99);
//         this.setInputsInline(false);
//     }
// };

// Blockly.Blocks['lcd_i2c_lcdscan'] = {
//     init: function () {
//         this.appendDummyInput()
//             .appendField(Blockly.Msg.I2C_SCAN_TEXT);
//         this.setInputsInline(false);
//         this.setPreviousStatement(true, null);
//         this.setNextStatement(true, null);
//         this.setColour(Colors.light.primary);
//         this.setTooltip(Blockly.Msg.I2C_SCAN_TOOLTIP);
//         this.setHelpUrl(Blockly.Msg.I2C_SCAN_HELPURL);
//     }
// };