'use strict';

goog.provide('Blockly.Python.communicate');
goog.require('Blockly.Python');

Blockly.Python['microbit_radio_on'] = function(block) {
  Blockly.Python.definitions_['import_radio'] = 'import radio';
  var code = 'radio.on()\n';
  return code;
};

Blockly.Python['microbit_radio_off'] = function(block) {
  Blockly.Python.definitions_['import_radio'] = 'import radio';
  var code = 'radio.off()\n';
  return code;
};

Blockly.Python['microbit_radio_config'] = function(block) {
  Blockly.Python.definitions_['import_radio'] = 'import radio';
  var number_length = block.getFieldValue('length');
  var number_queue = block.getFieldValue('queue');
  var number_channel = block.getFieldValue('channel');
  var number_power = block.getFieldValue('power');
  var dropdown_data_rate = block.getFieldValue('data_rate');
  var code = 'radio.config(length=' + number_length +', queue=' + number_queue + ', channel=' + number_channel + ', power=' + number_power + ', data_rate=radio.' + dropdown_data_rate + ')\n';
  return code;
};

Blockly.Python['microbit_radio_reset'] = function(block) {
  Blockly.Python.definitions_['import_radio'] = 'import radio';
  var code = 'radio.reset()\n';
  return code;
};

Blockly.Python.radio_send_string = function () {
    var number = Blockly.Python.valueToCode(this, 'data', Blockly.Python.ORDER_ATOMIC);
    return "radio.send(" + number + ")\n";
}

Blockly.Python['microbit_radio_receive'] = function(block) {
  Blockly.Python.definitions_['import_radio'] = 'import radio';
  var code = 'radio.receive()';
  return [code, Blockly.Python.ORDER_MEMBER];
};

Blockly.Python.i2c_init = function () {
  var dropdown_pin1 = Blockly.Python.valueToCode(this, 'RX',Blockly.Python.ORDER_ATOMIC);
  var dropdown_pin2 = Blockly.Python.valueToCode(this, 'TX',Blockly.Python.ORDER_ATOMIC);
  var freq = Blockly.Python.valueToCode(this, 'freq', Blockly.Python.ORDER_ATOMIC);
  return "i2c.init(sda=" + dropdown_pin1 + ", scl=" + dropdown_pin2 + ", freq=" + freq + ")\n";
};

Blockly.Python.i2c_read = function(){
    var address = Blockly.Python.valueToCode(this, 'address', Blockly.Python.ORDER_ATOMIC);
    var data = Blockly.Python.valueToCode(this, 'data', Blockly.Python.ORDER_ATOMIC);
    var format = this.getFieldValue('format');
    var is_repeated = this.getFieldValue('is_repeated');
    return "i2c.read(" + address + ", " + data +  ", " + is_repeated + ")\n";
};
Blockly.Python.i2c_write = function(){
    var address = Blockly.Python.valueToCode(this, 'address', Blockly.Python.ORDER_ATOMIC);
    var data = Blockly.Python.valueToCode(this, 'data', Blockly.Python.ORDER_ATOMIC);
    var format = this.getFieldValue('format');
    var is_repeated = this.getFieldValue('is_repeated');
    return "i2c.write("+ address + ", " + data + ", " + is_repeated + ")\n";
};

Blockly.Python.spi_init= function(block) {
    var freq=block.getFieldValue('freq');
    var bits=block.getFieldValue('bits');
    var mode=block.getFieldValue('mode');
    var mosi = block.getFieldValue('mosi');
    var miso = block.getFieldValue('miso');
    var sck = block.getFieldValue('sck');
    return "spi.init(baudrate=" + freq + ", bits=" + bits + ", mode=" + mode + ", mosi=" + mosi + ", miso= " + miso  + ", sclk=" + sck +  ");\n";
}

Blockly.Python.spi_write = function() {
    var data = Blockly.Python.valueToCode(this, 'data', Blockly.Python.ORDER_ATOMIC);
    return ["spi.write(" + data + ")", Blockly.Python.ORDER_ATOMIC];
}
