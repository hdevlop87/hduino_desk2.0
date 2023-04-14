import Colors from "../Blocks/BlocksDes/Colors"

var toolbox_arduino_Switch = {
  kind: "categoryToolbox",
  "contents": [
    {
      "kind": "category",
      "name": "Switch",
      "toolboxitemid": "SWITCH",
      "colour": Colors.switch.primary,
      "cssConfig": {
        "container": "Category",
        "icon": "customTreeIcon switch"
      },
      "contents": [
        {
          "kind": "block",
          "type": "switch_button_read",
        },
        {
          "kind": "block",
          "type": "io_highlow",
        },
      ],
    },
  ],
};

export default toolbox_arduino_Switch;
