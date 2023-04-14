import Colors from "../Blocks/BlocksDes/Colors"


var toolbox_arduino_Telecom = {
  "kind": "categoryToolbox",
  "contents": [
    {
      "kind": "category",
      "name": "Telecom",
      "toolboxitemid": "TELECOM",
      "colour": Colors.telecom.primary,
      "cssConfig": {
        "container": "Category",
        "icon": "customTreeIcon telecom",
      },
      "contents": [
        {
          "kind": "block",
          "type": "serial_init",
        },
        {
          "kind": "block",
          "type": "serial_receive",
        },
        {
          "kind": "block",
          "type": "serial_receive_byte",
        },
        {
          "kind": "block",
          "type": "serial_write",
        },
        {
          "kind": "block",
          "type": "bluetooth_init",
        },
        {
          "kind": "block",
          "type": "bluetooth_receive",
        },
        {
          "kind": "block",
          "type": "bluetooth_receive_byte",
        },
        {
          "kind": "block",
          "type": "bluetooth_write",
        },

      ],
    },
  ],
};

export default toolbox_arduino_Telecom;
