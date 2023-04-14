/* eslint-disable no-unused-expressions */

import Blockly from 'blockly/core';
import './generator_arduino';

Blockly.Arduino.Boards = {};

Blockly.Arduino.Boards.generateDigitalIo = function (pinStart, pinEnd) {
   var digitalIo = [];
   for (var i = pinStart; i < (pinEnd + 1); i++) {
      digitalIo.push([i.toString(), i.toString()]);
   }
   return digitalIo;
};

Blockly.Arduino.Boards.generateAnalogIo = function (pinStart, pinEnd) {
   var analogIo = [];
   for (var i = pinStart; i < (pinEnd + 1); i++) {
      analogIo.push(['A' + i.toString(), 'A' + i.toString()]);
   }
   return analogIo;
};

Blockly.Arduino.Boards.duplicateBoardProfile =
   function (originalBoard, name_, description, compilerFlag) {
      return {
         name: name_,
         description: description || originalBoard.description,
         compilerFlag: compilerFlag || originalBoard.compilerFlag,
         analogPins: originalBoard.analogPins,
         digitalPins: originalBoard.digitalPins,
         pwmPins: originalBoard.pwmPins,
         serial: originalBoard.serial,
         serialPins: originalBoard.serialPins,
         serialSpeed: originalBoard.serialSpeed,
         spi: originalBoard.spi,
         spiPins: originalBoard.spiPins,
         spiClockDivide: originalBoard.spiClockDivide,
         i2c: originalBoard.i2c,
         i2cPins: originalBoard.i2cPins,
         i2cSpeed: originalBoard.i2cSpeed,
         builtinLed: originalBoard.builtinLed,
         interrupt: originalBoard.interrupt
      }
   };

/** Object to contain all Arduino board profiles. */
Blockly.Arduino.Boards.profiles = new Object();

/** Arduino Uno board profile. */
Blockly.Arduino.Boards.profiles.uno = {
   name: 'Arduino Uno',
   description: 'Arduino Uno standard compatible board',
   compilerFlag: 'arduino:avr:uno',
   analogPins: Blockly.Arduino.Boards.generateAnalogIo(0, 5),
   digitalPins: Blockly.Arduino.Boards.generateDigitalIo(0, 13).concat(
      Blockly.Arduino.Boards.generateAnalogIo(0, 5)),
   pwmPins: [['3', '3'], ['5', '5'], ['6', '6'], ['9', '9'], ['10', '10'],
   ['11', '11']],
   serial: [['serial', 'Serial']],
   serialPins: { Serial: [['RX', '0'], ['TX', '1']] },
   serialSpeed: [['300', '300'], ['600', '600'], ['1200', '1200'],
   ['2400', '2400'], ['4800', '4800'], ['9600', '9600'],
   ['14400', '14400'], ['19200', '19200'], ['28800', '28800'],
   ['31250', '31250'], ['38400', '38400'], ['57600', '57600'],
   ['115200', '115200']],
   spi: [['SPI', 'SPI']],
   spiPins: { SPI: [['MOSI', '11'], ['MISO', '12'], ['SCK', '13']] },
   spiClockDivide: [['2 (8MHz)', 'SPI_CLOCK_DIV2'],
   ['4 (4MHz)', 'SPI_CLOCK_DIV4'],
   ['8 (2MHz)', 'SPI_CLOCK_DIV8'],
   ['16 (1MHz)', 'SPI_CLOCK_DIV16'],
   ['32 (500KHz)', 'SPI_CLOCK_DIV32'],
   ['64 (250KHz)', 'SPI_CLOCK_DIV64'],
   ['128 (125KHz)', 'SPI_CLOCK_DIV128']],
   i2c: [['I2C', 'Wire']],
   i2cPins: { Wire: [['SDA', 'A4'], ['SCL', 'A5']] },
   i2cSpeed: [['100kHz', '100000L'], ['400kHz', '400000L']],
   builtinLed: [['BUILTIN_1', '13']],
   interrupt: [['interrupt0', '2'], ['interrupt1', '3']],
   bootloader: "uno"
};

Blockly.Arduino.Boards.profiles.micro = {
   name: 'Arduino Micro',
   description: "Arduino Micro",
   compilerFlag: 'arduino:avr:uno',
   cpu: "atmega32u4",
   speed: "57600",
   digital: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13"],
   dropdownDigital: [["0", "0"], ["1", "1"], ["2", "2"], ["3", "3"], ["4", "4"], ["5", "5"], ["6", "6"], ["7", "7"], ["8", "8"], ["9", "9"], ["10", "10"], ["11", "11"], ["12", "12"], ["13", "13"]],
   PWM: ["3", "5", "6", "9", "10", "11", "13"],
   dropdownPWM: [["3", "3"], ["5", "5"], ["6", "6"], ["9", "9"], ["10", "10"], ["11", "11"], ["13", "13"]],
   analog: ["A0", "A1", "A2", "A3", "A4", "A5", "A6", "A7", "A6", "A7", "A8", "A9", "A10", "A11"],
   dropdownAnalog: [["A0", "A0"], ["A1", "A1"], ["A2", "A2"], ["A3", "A3"], ["A4", "A4"], ["A5", "A5"], ["A6(D4)", "4"], ["A7(D6)", "6"], ["A8(D8)", "8"], ["A9(D9)", "9"], ["A10(D10)", "10"], ["A11(D12)", "12"]],
   /*irqonchange: [["1", "1"], ["2", "2"], ["3", "3"], ["4", "4"], ["5", "5"], ["6", "6"], ["7", "7"], ["8", "8"], ["9", "9"], ["10", "10"], ["11", "11"], ["12", "12"], ["13", "13"],["A0", "14"], ["A1", "15"], ["A2", "16"], ["A3", "17"], ["A4", "18"], ["A5", "19"]],*/
   I2C: ["2", "3"],
   SPI: ["connect"],
   interrupt: [["0(Rx)", "0"], ["1(Tx)", "1"], ["2", "2"], ["3", "3"], ["7", "7"]],
   picture: "media/boards/arduino_micro.jpg",
   miniPicture: "media/boards/arduino_micro_mini.jpg",
   miniPicture_hor: "media/boards/arduino_micro_mini_hor.jpg",
   serialSpeed: [['300', '300'], ['600', '600'], ['1200', '1200'],
   ['2400', '2400'], ['4800', '4800'], ['9600', '9600'],
   ['14400', '14400'], ['19200', '19200'], ['28800', '28800'],
   ['31250', '31250'], ['38400', '38400'], ['57600', '57600'],
   ['115200', '115200']],
   serialPin: [["0 (Rx) ; 1 (Tx)", "0"]],
   upload_arg: "arduino:avr:micro",
   help_link: "https://store.arduino.cc/arduino-micro"
};
/** Arduino Nano board profile (ATmega328p). */
Blockly.Arduino.Boards.profiles.New_nano = {
   name: 'Arduino new Nano',
   description: 'Arduino Nano with ATmega328p board',
   compilerFlag: 'arduino:avr:nano',
   analogPins: Blockly.Arduino.Boards.generateAnalogIo(0, 7),
   digitalPins: Blockly.Arduino.Boards.generateDigitalIo(0, 13).concat(
      Blockly.Arduino.Boards.generateAnalogIo(0, 7)),
   pwmPins: Blockly.Arduino.Boards.profiles.uno.pwmPins,
   serial: Blockly.Arduino.Boards.profiles.uno.serial,
   serialPins: Blockly.Arduino.Boards.profiles.uno.serialPins,
   serialSpeed: Blockly.Arduino.Boards.profiles.uno.serialSpeed,
   spi: Blockly.Arduino.Boards.profiles.uno.spi,
   spiPins: Blockly.Arduino.Boards.profiles.uno.spiPins,
   spiClockDivide: Blockly.Arduino.Boards.profiles.uno.spiClockDivide,
   i2c: Blockly.Arduino.Boards.profiles.uno.i2c,
   i2cPins: Blockly.Arduino.Boards.profiles.uno.i2cPins,
   i2cSpeed: Blockly.Arduino.Boards.profiles.uno.i2cSpeed,
   builtinLed: Blockly.Arduino.Boards.profiles.uno.builtinLed,
   interrupt: Blockly.Arduino.Boards.profiles.uno.interrupt,
   bootloader: "new nano"
};

/** Arduino Nano board profile (ATmega328p). */
Blockly.Arduino.Boards.profiles.nano = {
   name: 'Arduino Nano',
   description: 'Arduino Nano with ATmega328p board',
   compilerFlag: 'arduino:avr:nano',
   analogPins: Blockly.Arduino.Boards.generateAnalogIo(0, 7),
   digitalPins: Blockly.Arduino.Boards.generateDigitalIo(0, 13).concat(
      Blockly.Arduino.Boards.generateAnalogIo(0, 7)),
   pwmPins: Blockly.Arduino.Boards.profiles.uno.pwmPins,
   serial: Blockly.Arduino.Boards.profiles.uno.serial,
   serialPins: Blockly.Arduino.Boards.profiles.uno.serialPins,
   serialSpeed: Blockly.Arduino.Boards.profiles.uno.serialSpeed,
   spi: Blockly.Arduino.Boards.profiles.uno.spi,
   spiPins: Blockly.Arduino.Boards.profiles.uno.spiPins,
   spiClockDivide: Blockly.Arduino.Boards.profiles.uno.spiClockDivide,
   i2c: Blockly.Arduino.Boards.profiles.uno.i2c,
   i2cPins: Blockly.Arduino.Boards.profiles.uno.i2cPins,
   i2cSpeed: Blockly.Arduino.Boards.profiles.uno.i2cSpeed,
   builtinLed: Blockly.Arduino.Boards.profiles.uno.builtinLed,
   interrupt: Blockly.Arduino.Boards.profiles.uno.interrupt,
   bootloader: "nano"
};
/** Arduino Nano board profile (ATmega328p). */
Blockly.Arduino.Boards.profiles.pro = {
   name: 'Arduino Nano',
   description: 'Arduino Nano with ATmega328p board',
   compilerFlag: 'arduino:avr:nano',
   analogPins: Blockly.Arduino.Boards.generateAnalogIo(0, 7),
   digitalPins: Blockly.Arduino.Boards.generateDigitalIo(0, 13).concat(
      Blockly.Arduino.Boards.generateAnalogIo(0, 7)),
   pwmPins: Blockly.Arduino.Boards.profiles.uno.pwmPins,
   serial: Blockly.Arduino.Boards.profiles.uno.serial,
   serialPins: Blockly.Arduino.Boards.profiles.uno.serialPins,
   serialSpeed: Blockly.Arduino.Boards.profiles.uno.serialSpeed,
   spi: Blockly.Arduino.Boards.profiles.uno.spi,
   spiPins: Blockly.Arduino.Boards.profiles.uno.spiPins,
   spiClockDivide: Blockly.Arduino.Boards.profiles.uno.spiClockDivide,
   i2c: Blockly.Arduino.Boards.profiles.uno.i2c,
   i2cPins: Blockly.Arduino.Boards.profiles.uno.i2cPins,
   i2cSpeed: Blockly.Arduino.Boards.profiles.uno.i2cSpeed,
   builtinLed: Blockly.Arduino.Boards.profiles.uno.builtinLed,
   interrupt: Blockly.Arduino.Boards.profiles.uno.interrupt,
   bootloader: "pro"
};

/** Arduino Duemilanove boards profile (ATmega168p, ATmega328p). */
Blockly.Arduino.Boards.profiles.duemilanove_168p = {
   name: 'Arduino Duemilanove 168p',
   description: 'Arduino Duemilanove with ATmega168p compatible board',
   compilerFlag: 'arduino:avr:diecimila:cpu=atmega168',
   analogPins: Blockly.Arduino.Boards.profiles.uno.analogPins,
   digitalPins: Blockly.Arduino.Boards.profiles.uno.digitalPins,
   pwmPins: Blockly.Arduino.Boards.profiles.uno.pwmPins,
   serial: Blockly.Arduino.Boards.profiles.uno.serial,
   serialPins: Blockly.Arduino.Boards.profiles.uno.serialPins,
   serialSpeed: Blockly.Arduino.Boards.profiles.uno.serialSpeed,
   spi: Blockly.Arduino.Boards.profiles.uno.spi,
   spiPins: Blockly.Arduino.Boards.profiles.uno.spiPins,
   spiClockDivide: Blockly.Arduino.Boards.profiles.uno.spiClockDivide,
   i2c: Blockly.Arduino.Boards.profiles.uno.i2c,
   i2cPins: Blockly.Arduino.Boards.profiles.uno.i2cPins,
   i2cSpeed: Blockly.Arduino.Boards.profiles.uno.i2cSpeed,
   builtinLed: Blockly.Arduino.Boards.profiles.uno.builtinLed,
   interrupt: Blockly.Arduino.Boards.profiles.uno.interrupt
};
Blockly.Arduino.Boards.profiles.duemilanove_328p =
   Blockly.Arduino.Boards.duplicateBoardProfile(
      Blockly.Arduino.Boards.profiles.duemilanove_168p,
      'Arduino Duemilanove 328p',
      'Arduino Duemilanove with ATmega328p compatible board',
      'arduino:avr:diecimila');

/** Arduino Mega board profile. */
Blockly.Arduino.Boards.profiles.mega = {
   name: 'Arduino Mega',
   description: 'Arduino Mega-compatible board',
   compilerFlag: 'arduino:avr:mega:cpu=atmega2560',
   analogPins: Blockly.Arduino.Boards.generateAnalogIo(0, 15),
   //TODO: Check if the Mega can use analogue pins as digital, it would be
   //      logical but it is not clear on the arduino.cc website
   digitalPins: Blockly.Arduino.Boards.generateDigitalIo(0, 53),
   pwmPins: Blockly.Arduino.Boards.generateDigitalIo(2, 13).concat(
      Blockly.Arduino.Boards.generateDigitalIo(44, 46)),
   serial: [['serial', 'Serial'], ['serial_1', 'Serial1'],
   ['serial_2', 'Serial2'], ['serial_3', 'Serial3']],
   serialPins: {
      Serial: [['TX', '0'], ['RX', '1']],
      Serial1: [['TX', '18'], ['TX', '19']],
      Serial2: [['TX', '16'], ['TX', '17']],
      Serial3: [['TX', '14'], ['TX', '15']]
   },
   serialSpeed: Blockly.Arduino.Boards.profiles.uno.serialSpeed,
   spi: [['SPI', 'SPI']],
   spiPins: { SPI: [['MOSI', '51'], ['MISO', '50'], ['SCK', '52']] },
   //TODO: confirm the clock divides are the same for the DUE and UNO
   spiClockDivide: Blockly.Arduino.Boards.profiles.uno.spiClockDivide,
   i2c: [['I2C', 'Wire']],
   i2cPins: { Wire: [['SDA', '20'], ['SCL', '21']] },
   i2cSpeed: [['100kHz', '100000L'], ['400kHz', '400000L']],
   builtinLed: Blockly.Arduino.Boards.profiles.uno.builtinLed,
   interrupt: [['interrupt0', '2'], ['interrupt1', '3'], ['interrupt2', '21'],
   ['interrupt3', '20'], ['interrupt4', '19'], ['interrupt5', '18']],
   bootloader: "mega"
};

/** Arduino Leonardo board profile. */
Blockly.Arduino.Boards.profiles.leonardo = {
   name: 'Arduino Leonardo',
   description: 'Arduino Leonardo-compatible board',
   compilerFlag: 'arduino:avr:leonardo',
   analogPins: Blockly.Arduino.Boards.generateAnalogIo(0, 5).concat(
      [['A6', '4'], ['A7', '6'], ['A8', '8'], ['A9', '9'],
      ['A10', '10'], ['A11', '12']]),
   digitalPins: Blockly.Arduino.Boards.generateDigitalIo(0, 13).concat(
      Blockly.Arduino.Boards.generateAnalogIo(0, 5)),
   pwmPins: Blockly.Arduino.Boards.profiles.uno.pwmPins.concat([['13', '13']]),
   serial: Blockly.Arduino.Boards.profiles.uno.serial,
   serialPins: Blockly.Arduino.Boards.profiles.uno.serialPins,
   serialSpeed: Blockly.Arduino.Boards.profiles.uno.serialSpeed,
   spi: [['SPI', 'SPI']],
   spiPins: { SPI: [['MOSI', 'ICSP-4'], ['MISO', 'ICSP-1'], ['SCK', 'ICSP-3']] },
   //TODO: confirm the clock divides are the same for the Leonardo and UNO
   spiClockDivide: Blockly.Arduino.Boards.profiles.uno.spiClockDivide,
   i2c: [['I2C', 'Wire']],
   i2cPins: { Wire: [['SDA', '2'], ['SCL', '3']] },
   i2cSpeed: Blockly.Arduino.Boards.profiles.uno.i2cSpeed,
   builtinLed: Blockly.Arduino.Boards.profiles.uno.builtinLed,
   interrupt: [['interrupt0', '3'], ['interrupt1', '2'], ['interrupt2', '0'],
   ['interrupt3', '1'], ['interrupt4', '17']]
};

/** Arduino Yun board processor and profile is identical to Leonardo. */
Blockly.Arduino.Boards.profiles.yun =
   Blockly.Arduino.Boards.duplicateBoardProfile(
      Blockly.Arduino.Boards.profiles.leonardo,
      'Arduino Yun',
      'Arduino Yun compatible board');

/** Atmel Xplained mini boards profile (atmega328p, atmega328pb, atmega168pb).*/
Blockly.Arduino.Boards.profiles.atmel_atmega328p_xplained_mini = {
   name: 'Atmel atmega328p Xplained mini',
   description: 'Atmel Xplained mini board with atmega328p (Uno compatible)',
   compilerFlag: 'atmel:avr:atmega328p_xplained_mini',
   analogPins: Blockly.Arduino.Boards.profiles.uno.analogPins,
   digitalPins: Blockly.Arduino.Boards.profiles.uno.digitalPins.concat(
      [['20', '20']]),
   pwmPins: Blockly.Arduino.Boards.profiles.uno.pwmPins,
   serial: Blockly.Arduino.Boards.profiles.uno.serial,
   serialPins: Blockly.Arduino.Boards.profiles.uno.serialPins,
   serialSpeed: Blockly.Arduino.Boards.profiles.uno.serialSpeed,
   spi: Blockly.Arduino.Boards.profiles.uno.spi,
   spiPins: Blockly.Arduino.Boards.profiles.uno.spiPins,
   spiClockDivide: Blockly.Arduino.Boards.profiles.uno.spiClockDivide,
   i2c: Blockly.Arduino.Boards.profiles.uno.i2c,
   i2cPins: Blockly.Arduino.Boards.profiles.uno.i2cPins,
   i2cSpeed: Blockly.Arduino.Boards.profiles.uno.i2cSpeed,
   builtinLed: [['BUILTIN_LED', '13']],
   interrupt: Blockly.Arduino.Boards.profiles.uno.interrupt,
   builtinButton: [['BUILTIN_BUTTON', '20']]
};
Blockly.Arduino.Boards.profiles.atmel_atmega328pb_xplained_mini =
   Blockly.Arduino.Boards.duplicateBoardProfile(
      Blockly.Arduino.Boards.profiles.atmel_atmega328p_xplained_mini,
      'Atmel atmega328pb Xplained mini',
      'Atmel Xplained mini board with atmega328pb (Arduino Uno compatible)',
      'atmel:avr:atmega328pb_xplained_mini');
Blockly.Arduino.Boards.profiles.atmel_atmega168pb_xplained_mini =
   Blockly.Arduino.Boards.duplicateBoardProfile(
      Blockly.Arduino.Boards.profiles.atmel_atmega328p_xplained_mini,
      'Atmel atmega168pb Xplained mini',
      'Atmel Xplained mini board with atmega168pb (Arduino Uno compatible)',
      'atmel:avr:atmega168pb_xplained_mini');

/** ESP8266 for the Adafruit Huzzah. */
Blockly.Arduino.Boards.profiles.esp8266_huzzah = {
   name: 'Adafruit Feather HUZZAH',
   description: 'Adafruit HUZZAH ESP8266 compatible board',
   compilerFlag: 'esp8266:esp8266:generic',
   analogPins: [['A0', 'A0']],
   digitalPins: [['0', '0'], ['2', '2'], ['4', '4'], ['5', '5'], ['12', '12'],
   ['13', '13'], ['14', '14'], ['15', '15'], ['16', '16']],
   pwmPins: [['2', '2']],
   serial: [['serial', 'Serial']],
   serialPins: { Serial: [['RX', 'RX'], ['TX', 'TX']] },
   serialSpeed: Blockly.Arduino.Boards.profiles.uno.serial,
   spi: [['SPI', 'SPI']],
   spiPins: { SPI: [['MOSI', '13'], ['MISO', '12'], ['SCK', '14']] },
   spiClockDivide: Blockly.Arduino.Boards.profiles.uno.spiClockDivide,
   i2c: [['I2C', 'Wire']],
   i2cPins: { Wire: [['SDA', '4'], ['SCL', '5']] },
   i2cSpeed: Blockly.Arduino.Boards.profiles.uno.i2cSpeed,
   builtinLed: [['BUILTIN_1', '0']],
   interrupt: [['interrupt0', '2'], ['interrupt1', '3']]
};

/** ESP8266 for the Wemos D1 R2. */
Blockly.Arduino.Boards.profiles.esp8266_wemos_d1 = {
   name: 'Wemos D1',
   description: 'Wemos D1 R2 compatible board',
   compilerFlag: 'esp8266:esp8266:generic',
   analogPins: [['A0', 'A0']],
   digitalPins: [['D0', 'D0'], ['D1', 'D1'], ['D2', 'D2'], ['D3', 'D3'],
   ['D4', 'D4'], ['D5', 'D5'], ['D6', 'D7'], ['D8', 'D8']],
   pwmPins: [['D1', 'D1'], ['D2', 'D2'], ['D3', 'D3'], ['D4', 'D4'],
   ['D5', 'D5'], ['D6', 'D7'], ['D8', 'D8']],
   serial: [['serial', 'Serial']],
   serialPins: { Serial: [['RX', 'RX'], ['TX', 'TX']] },
   serialSpeed: Blockly.Arduino.Boards.profiles.uno.serialSpeed,
   spi: [['SPI', 'SPI']],
   spiPins: { SPI: [['MOSI', 'D7'], ['MISO', 'D6'], ['SCK', 'D5']] },
   spiClockDivide: Blockly.Arduino.Boards.profiles.uno.spiClockDivide,
   i2c: [['I2C', 'Wire']],
   i2cPins: { Wire: [['SDA', 'D2'], ['SCL', 'D1']] },
   i2cSpeed: Blockly.Arduino.Boards.profiles.uno.i2cSpeed,
   builtinLed: [['BUILTIN_1', 'D4']],
   interrupt: [['D0', 'D0'], ['D1', 'D1'], ['D2', 'D2'], ['D3', 'D3'],
   ['D4', 'D4'], ['D5', 'D5'], ['D6', 'D7'], ['D8', 'D8']]
};

/** Set default profile to Arduino standard-compatible board */

Blockly.Arduino.Boards.selected = Blockly.Arduino.Boards.profiles['uno']
Blockly.Arduino.AllPinsArrayDigital = Blockly.Arduino.Boards.selected.digitalPins;
Blockly.Arduino.AllPins = [];
Blockly.Arduino.AllPinsAnalog = [];
Blockly.Arduino.onlyVar = [];

Blockly.Arduino.Boards.init = function (Variables, workspace) {

   let ArrVariables = [['---', '---']]

   if (Variables) {
      if (Variables.length) ArrVariables = Variables.map(a => [a, a]);
   }

   Blockly.Arduino.AllPins = [...ArrVariables, ...Blockly.Arduino.Boards.selected.digitalPins];
   Blockly.Arduino.AllPinsAnalog = [...ArrVariables, ...Blockly.Arduino.Boards.selected.analogPins];
   Blockly.Arduino.onlyVar = ArrVariables;

   var blocks = workspace.getAllBlocks();
   for (var i = 0; i < blocks.length; i++) {
      var updateFields = blocks[i].updateFields;
      if (updateFields) {
         updateFields.call(blocks[i]);
      }
   }
}

Blockly.Arduino.Boards.changeBoard = (workspace, newBoard) => {
   if (Blockly.Arduino.Boards.profiles[newBoard] === undefined) {
      console.log('Tried to set non-existing Arduino board: ' + newBoard);
      return;
   }
   Blockly.Arduino.Boards.selected = Blockly.Arduino.Boards.profiles[newBoard];
   Blockly.Arduino.Boards.updateVars(workspace)
   Blockly.Arduino.workspace = workspace
};

Blockly.Arduino.Boards.updateVars = (workspace,vars) => {

   let ArrVariables = [['---', '---']]
   if(!vars){
      vars = workspace.getAllVariableNames();
   }

   if (vars.length) {
      ArrVariables = vars.map(a => [a, a]);
   }
   Blockly.Arduino.AllPinsArrayDigital = Blockly.Arduino.Boards.selected.digitalPins;
   Blockly.Arduino.AllPinsAnalog = [...ArrVariables, ...Blockly.Arduino.Boards.selected.analogPins];
   Blockly.Arduino.AllPins = [...ArrVariables, ...Blockly.Arduino.Boards.selected.digitalPins];
   Blockly.Arduino.onlyVar = ArrVariables;

   var blocks = workspace.getAllBlocks();
   for (var i = 0; i < blocks.length; i++) {
      var updateFields = blocks[i].updateFields;
      if (updateFields) {
         updateFields.call(blocks[i]);
      }
   }

}

Blockly.Arduino.Boards.refreshBlockFieldDropdown = (block, fieldName, boardKey) => {

   var field = block.getField(fieldName);
   if (boardKey == "AllPins") field.menuGenerator_ = Blockly.Arduino.AllPins;
   if (boardKey == "AllPinsAnalog") field.menuGenerator_ = Blockly.Arduino.AllPinsAnalog;
   if (boardKey == "onlyVar") field.menuGenerator_ = Blockly.Arduino.onlyVar;
}







