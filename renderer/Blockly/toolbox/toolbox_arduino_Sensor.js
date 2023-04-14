var toolbox_arduino_Sensor= {
    "kind": "categoryToolbox",
    "contents": [
        {
            "kind": "category",
            "name": "Sensor",
            "toolboxitemid": "SENSOR",
            "colour": "#d60532",
            "cssConfig": {
                "container": "Category",
                "icon": "customTreeIcon sensor"
            },
            "contents": [
                {
                    "kind": "block",
                    "blockxml": "<block type='Ultrasonic_read'><value name='VAR'><block type='variables_get'></block ></value ></block >"
                },
                {
                    "kind": "block",
                    "type": "SENSOR_lm35"
                },
                {
                    "kind": "block",
                    "type": "SENSOR_dht11"
                },
                {
                    "kind": "block",
                    "type": "SENSOR_light_sensor"
                },
                {
                    "kind": "block",
                    "type": "SENSOR_PIR"
                },
                // {
                //     "kind": "block",
                //     "type": "RFID_module"
                // }
            ]
        },
    ]
}


export default toolbox_arduino_Sensor