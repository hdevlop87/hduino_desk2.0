import standard from "./toolbox_standard.json"
import arduino_basic from "./toolbox_arduino_basic.json"
import arduino_Light from "./toolbox_arduino_Light"
import arduino_Sensor from "./toolbox_arduino_Sensor"
import arduino_Motors from "./toolbox_arduino_Motors"
import arduino_Switch from "./toolbox_arduino_Switch"
import arduino_Telecom from "./toolbox_arduino_Telecom"

const Toolbox = () => {

    var jsonToolbox = {
        "kind": "categoryToolbox",
        "contents": []
    };
    jsonToolbox["contents"][0] = standard["contents"][0];
    jsonToolbox["contents"][1] = standard["contents"][1];
    jsonToolbox["contents"][2] = standard["contents"][2];
    jsonToolbox["contents"][3] = standard["contents"][3];
    jsonToolbox["contents"][4] = standard["contents"][4];
    jsonToolbox["contents"][5] = standard["contents"][5];
    jsonToolbox["contents"][6] = standard["contents"][6];
    jsonToolbox["contents"][7] = standard["contents"][7];

    jsonToolbox["contents"][8] = arduino_basic["contents"][0];
    jsonToolbox["contents"][9] = arduino_Light["contents"][0];
    jsonToolbox["contents"][10] = arduino_Sensor["contents"][0];
    jsonToolbox["contents"][11] = arduino_Motors["contents"][0];
    jsonToolbox["contents"][12] = arduino_Switch["contents"][0];
    jsonToolbox["contents"][13] = arduino_Telecom["contents"][0];
    
    return jsonToolbox;

}

export default Toolbox