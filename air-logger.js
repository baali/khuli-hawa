var five = require("johnny-five");
var Edison = require("galileo-io");
var sleep = require("sleep");

var measurePin = "A0";
var powerPin = 13;

var board = new five.Board({
  io: new Edison()
});

var voMeasured="";
board.on("ready", function() {
  // this.pinMode(powerPin, this.MODES.OUTPUT);
  // this.pinMode(measurePin, this.MODES.ANALOG);
  // var state = 0;
  // setInterval(function() {
  //   this.analogRead(measurePin, function(data) {
  //     console.log(data);
  //     voMeasured = data;
  //   });
  // }.bind(this), 280);
  // setInterval(function() {
  //   state ^= 1;
  //   this.digitalWrite(powerPin, state);
  // }.bind(this), 40);
  // console.log("Voltage measured:");
  // console.log(voMeasured * (5.0/1024));
  // console.log("Dust Density:");
  // console.log(0.17 * (voMeasured * (5.0/1024)) - 0.1);
  var led = new five.Led(13);
  led.blink();
});
