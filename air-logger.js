// http://arduinodev.woofex.net/2012/12/01/standalone-sharp-dust-sensor/
// https://github.com/intel-iot-devkit/mraa/blob/master/examples/javascript/

var m = require('mraa'); //require mraa
console.log('MRAA Version: ' + m.getVersion()); //write the mraa version to the console
var sleep = require("sleep");
var myLed = new m.Gpio(13); //LED hooked up to digital pin 13 (or built in pin on Galileo Gen1 & Gen2)
myLed.dir(m.DIR_OUT); //set the gpio direction to output
var ledState = true; //Boolean to hold the state of Led
periodicActivity(); //call the periodicActivity function
var analogPin0 = new m.Aio(0);
var analogValue = 0.0;

function periodicActivity()
{
  myLed.write(1); //if ledState is true then write a '1' (high) otherwise write a '0' (low)
  setInterval(function() {
    analogValue = analogPin0.readFloat();
    console.log("Voltage measured:");
    console.log(analogValue * (5.0/1024));
    console.log("Dust Density:");
    console.log(0.17 * (analogValue * (5.0/1024)) - 0.1);
  }.bind(this), 280);

  setInterval(function() {
    myLed.write(0); 
  }.bind(this), 40);
  
  setTimeout(periodicActivity,1000); //call the indicated function after 1 second (1000 milliseconds)
}
