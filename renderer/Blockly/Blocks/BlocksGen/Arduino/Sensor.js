import  Blockly from 'blockly/core';

Blockly.Arduino['Ultrasonic'] = function (block) {
    var argument1 = block.getFieldValue('PIN0') || '2';
    var argument2 = block.getFieldValue('PIN1') || '3';
    var Name = block.getFieldValue('VAR');

    Blockly.Arduino.includes_['includes_' + Name] = '#include <HCSR04.h>';
    Blockly.Arduino.definitions_['var_' + Name] = 'HCSR04' + ' ' + Name + '(' + argument1 + ',' + argument2 + ')' + ';';
    Blockly.Arduino.variables_[Name + '1'] = 'const int' + ' ' + Name + '_Trig' + ' = ' + argument1 + ';';
    Blockly.Arduino.variables_[Name + '2'] = 'const int' + ' ' + Name + '_Echo' + ' = ' + argument2 + ';';

    Blockly.Arduino.setups_["setup_input_" + argument1] = "  pinMode(" + Name + '_Trig' + ", OUTPUT);";
    Blockly.Arduino.setups_["setup_input_" + argument2] = "  pinMode(" + Name + '_Echo' + ", INPUT);";
    return '';
};
//===================================================================================================//
Blockly.Arduino['Ultrasonic_read'] = function (block) {
    var Name = block.getFieldValue('PIN');
    Blockly.Arduino.variables_['var1' + Name] = 'int Distance_' + Name + ' ;';
    Blockly.Arduino.loopCode_['var2' + Name] = `Distance_${Name} = ${Name}.dist();`;
    var code = `Distance_${Name}`
    return [code, Blockly.Arduino.ORDER_ATOMIC];
};
//===================================================================================================//
Blockly.Arduino["SENSOR_lm35"] = function (block) {
    var pin = block.getFieldValue('PIN');
    Blockly.Arduino.variables_['var_' + pin] = 'float Vout_' + pin + ' ;';
    Blockly.Arduino.variables_['var1' + pin] = 'float Temp_' + pin + ' ;';

    Blockly.Arduino.setups_["lm35"] = "analogReference(INTERNAL);";

    Blockly.Arduino.loopCode_['var1' + pin] = `Vout_${pin} = analogRead(${pin});`;
    Blockly.Arduino.loopCode_['var2' + pin] = `Temp_${pin} = (Vout_${pin}*500/1023);`;

    var code = `Temp_${pin}`;
    return [code, Blockly.Arduino.ORDER_ATOMIC]
};
//===================================================================================================//
Blockly.Arduino["SENSOR_dht11"] = function (block) {
    var pin = block.getFieldValue('PIN');
    var choice = block.getFieldValue("choix");
    Blockly.Arduino.includes_["dht.h"] = '#include <DHT.h>';
    Blockly.Arduino.definitions_["dht"] = "DHT dht(" + pin + ", DHT11);";
    Blockly.Arduino.setups_["dht"] = "  dht.begin();";
    switch (choice) {
        case "h":
            Blockly.Arduino.variables_['var1' + pin] = 'float Hum_' + pin + ' ;';
            Blockly.Arduino.loopCode_['var1' + pin] = `Hum_${pin} = dht.readHumidity();`;
            var code = `Hum_${pin}`;
            break;
        case "t":
            Blockly.Arduino.variables_['var2' + pin] = 'float Tmp_' + pin + ' ;';
            Blockly.Arduino.loopCode_['var2' + pin] = `Tmp_${pin} = dht.readTemperature();`;
            var code = `Tmp_${pin}`;
            break;
    }
    return [code, Blockly.Arduino.ORDER_ATOMIC]
};
//===================================================================================================//
Blockly.Arduino["SENSOR_line_follower"] = function (block) {
    var dropdown_pin = Blockly.Arduino.valueToCode(block, "PIN", Blockly.Arduino.ORDER_ATOMIC);
    Blockly.Arduino.setups_["setup_input_" + dropdown_pin] = "pinMode(" + dropdown_pin + ", INPUT);";
    var code = "digitalRead(" + dropdown_pin + ") == HIGH";
    return [code, Blockly.Arduino.ORDER_ATOMIC]
};
//===================================================================================================//
Blockly.Arduino["SENSOR_light_sensor"] = function (block) {
    var pin = block.getFieldValue('PIN');
    Blockly.Arduino.variables_['var_' + pin] = `int LDRValue_${pin} = 0;`
    Blockly.Arduino.loopCode_['var1' + pin] = `LDRValue_${pin} = analogRead(${pin});`;
    var code = `LDRValue_${pin}`;
    return [code, Blockly.Arduino.ORDER_ATOMIC]
};
//===================================================================================================//
Blockly.Arduino["SENSOR_PIR"] = function (block) {
    var pin = block.getFieldValue('PIN');
    Blockly.Arduino.variables_['var_' + pin] = 'bool motionState_' + pin + ' = false ;';
    Blockly.Arduino.loopCode_['var1' + pin] = `motionState_${pin} = digitalRead(${pin});`;
    var code = `motionState_${pin}`;
    return [code, Blockly.Arduino.ORDER_ATOMIC]
};
