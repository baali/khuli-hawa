// http://arduinodev.woofex.net/2012/12/01/standalone-sharp-dust-sensor/
// https://github.com/intel-iot-devkit/mraa/blob/master/examples/javascript/

var m = require('mraa'); //require mraa
console.log('MRAA Version: ' + m.getVersion()); //write the mraa version to the console
var sleep = require("sleep");
var myLed = new m.Gpio(8); //LED hooked up to digital pin 13 (or built in pin on Galileo Gen1 & Gen2)
myLed.dir(m.DIR_OUT); //set the gpio direction to output
var ledState = true; //Boolean to hold the state of Led
var analogPin0 = new m.Aio(0);
var analogValue = 0.0;

// papaLoop(); //call the periodicActivity function
tempLoop();

function papaLoop()
{
  myLed.write(1);
  sleep.usleep(280);
  analogValue = analogPin0.read();
  sleep.usleep(40);
  myLed.write(0);   

  console.log("Raw Signal Value (0-1023): ", analogValue);
  console.log("Voltage measured:", analogValue * (3.3/1024));
  console.log("Dust Density:", 0.17 * (analogValue * (3.3/1024)) - 0.1);
  sleep.usleep(9680);
  setTimeout(papaLoop,1000); //call the indicated function after 1 second (1000 milliseconds)
}

function tempLoop()
{
  analogValue = analogPin0.read();
  console.log("Raw Signal Value: ", analogValue);
  console.log("Temprature(C) :", analogValue *  0.48828125);
  sleep.usleep(1000);
  setTimeout(tempLoop,1000); //call the indicated function after 1 second (1000 milliseconds)
}
