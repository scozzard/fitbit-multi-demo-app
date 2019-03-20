import document from "document";
import * as messaging from "messaging";
import { vibration } from "haptics";
import { today } from "user-activity";
import { display } from "display";
import { HeartRateSensor } from "heart-rate";
import { Accelerometer } from "accelerometer";
import { Barometer } from "barometer";

// Buttons
let ButtonPostData = document.getElementById("ButtonPostData");
let LabelPostData = document.getElementById("LabelPostData");
let LabelPostDataResult = document.getElementById("LabelPostDataResult");

let ButtonGetData = document.getElementById("ButtonGetData");
let LabelGetData = document.getElementById("LabelGetData");
let LabelGetDataResult = document.getElementById("LabelGetDataResult");

let ButtonPostSensorData = document.getElementById("ButtonPostSensorData");
let LabelPostSensorData = document.getElementById("LabelPostSensorData");
let LabelPostSensorDataResult = document.getElementById("LabelPostSensorDataResult");

// Activity Labels
let LabelActiveMinutes = document.getElementById("LabelActiveMinutes");
let LabelCalories = document.getElementById("LabelCalories");
let LabelDistance = document.getElementById("LabelDistance");
let LabelElevationGain = document.getElementById("LabelElevationGain");
let LabelSteps = document.getElementById("LabelSteps");

// Sensor Labels
let LabelHeartRate = document.getElementById("LabelHeartRate");
let LabelAccelerometer = document.getElementById("LabelAccelerometer");
let LabelBarometer = document.getElementById("LabelBarometer");

// Message socket opens
messaging.peerSocket.onopen = () => {
  console.log("[App] Socket open");
};
  
// Message socket closes
messaging.peerSocket.onclose = () => {
  console.log("[App] Socket closed");
};

// Message is received
messaging.peerSocket.onmessage = evt => {
  console.log(`[Watch] Message received: ${JSON.stringify(evt)}`);
  if (evt.data.key === "LabelPostData" && evt.data.newValue)
  {
    LabelPostData.text = evt.data.newValue;
  }
  
  if (evt.data.key === "LabelPostDataResult" && evt.data.newValue)
  {
    LabelPostDataResult.text = evt.data.newValue;
  }

  if (evt.data.key === "LabelPostSensorData" && evt.data.newValue)
  {
    LabelPostSensorData.text = evt.data.newValue;
  }

  if (evt.data.key === "LabelPostSensorDataResult" && evt.data.newValue)
  {
    LabelPostSensorDataResult.text = evt.data.newValue;
  }
  
  if (evt.data.key === "LabelGetData" && evt.data.newValue)
  {
    LabelGetData.text = evt.data.newValue;
  }
  
  if (evt.data.key === "LabelGetDataResult" && evt.data.newValue)
  {
    LabelGetDataResult.text = evt.data.newValue;
  }
};

// Send data to Phone using Messaging API
function sendVal(data) {
  console.log(JSON.stringify(data))
  if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
    messaging.peerSocket.send(data);
  }
}

ButtonPostData.onclick = function(evt) {
  sendVal({
    'key':'PostData',
    'value':{
      'activeMinutes': today.local.activeMinutes,
      'calories': today.local.calories,
      'distance': today.local.distance,
      'elevationGain': today.local.elevationGain,
      'steps': today.local.steps
  }})
  vibration.start("confirmation");
}

LabelPostData.onclick = ButtonPostData.onclick

ButtonGetData.onclick = function(evt) {
  sendVal({key:'GetData'})
  vibration.start("confirmation");
}

LabelGetData.onclick = ButtonGetData.onclick

ButtonPostSensorData.onclick = function(evt) {
  sendVal({
    'key':'PostSensorData',
    'value':{
      'heartRate': LabelHeartRate.text,
      'accelerometer': Accelerometer.text,
      'barometer': LabelBarometer.text
  }})
  vibration.start("confirmation");
}

console.log(LabelPostSensorData);
LabelPostSensorData.onclick = ButtonPostSensorData.onclick

function populateActivityLabels() {
  LabelActiveMinutes.text = "Active minutes: " + today.local.activeMinutes;
  LabelCalories.text = "Calories: " + today.local.calories;
  LabelDistance.text = "Distance: " + today.local.distance;
  LabelElevationGain.text = "Elevation Gain: " + today.local.elevationGain;
  LabelSteps.text = "Steps: " + today.local.steps;
}

populateActivityLabels();

function startRecordingSensorData() {

  if (HeartRateSensor) {
    const hrm = new HeartRateSensor();
    hrm.addEventListener("reading", () => {
      LabelHeartRate.text = `Heart rate: ${hrm.heartRate}`;
    });
    display.addEventListener("change", () => {
      display.on ? hrm.start() : hrm.stop();
    });
    hrm.start();
  }

  if (Accelerometer) {
    const accel = new Accelerometer({ frequency: 1 });
    accel.addEventListener("reading", () => {
      LabelAccelerometer.text = `Acceleration: x:${accel.x}, y:${accel.y}, z:${accel.z}`;
    });
    display.addEventListener("change", () => {
      display.on ? accel.start() : accel.stop();
    });
    accel.start();
  }

  if (Barometer) {
    const barometer = new Barometer({ frequency: 1 });
    barometer.addEventListener("reading", () => {
      LabelBarometer.text = `Pressure: ${barometer.pressure} Pa`;
    });
    display.addEventListener("change", () => {
      display.on ? barometer.start() : barometer.stop();
    });
    barometer.start();
  }
}

startRecordingSensorData();