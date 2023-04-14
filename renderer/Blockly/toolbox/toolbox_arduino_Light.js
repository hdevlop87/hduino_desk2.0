import Colors from "../Blocks/BlocksDes/Colors"

var toolbox_arduino_Light = {
    "kind": "categoryToolbox",
    "contents": [
        {
            "kind": "category",
            "name": "Light",
            "toolboxitemid": "LIGHT",
            "colour": Colors.light.primary,
            "cssConfig": {
                "container": "Category",
                "icon": "customTreeIcon light"
            },
            "contents": [
                {
                    "kind": "block",
                    "type": "led_digitalwrite"
                },
                {
                    "kind": "block",
                    "type": "lcd_i2c_lcdinit"
                },
                {
                    "kind": "block",
                    "type": "lcd_i2c_lcdclear"
                },
                {
                    "kind": "block",
                    "type": "lcd_i2c_lcdwrite"
                },
            ]
        },
    ]
}


export default toolbox_arduino_Light