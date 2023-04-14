import Colors from "../Blocks/BlocksDes/Colors"

var toolbox_arduino_Motors = {
  "kind": "categoryToolbox",
  "contents": [
    {
      "kind": "category",
      "name": "Motors",
      "toolboxitemid": "MOTORS",
      "colour": Colors.motors.primary,
      "cssConfig": {
        "container": "Category",
        "icon": "customTreeIcon motors",
      },
      "contents": [
        {
          "kind": "block",
          "type": "motor_servo_write",
        },
        {
          "kind": "block",
          "type": "DC_Motor_init",
        },
        {
          "kind": "block",
          "type": "DC_Motor_State",
        },
      ],
    },
  ],
};

export default toolbox_arduino_Motors;
