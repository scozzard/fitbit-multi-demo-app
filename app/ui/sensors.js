import document from "document";
import * as messaging from "../messaging/";
import { HeartRateSensor } from "heart-rate";
import { Accelerometer } from "accelerometer";
import { Barometer } from "barometer";
import { display } from "display";
import { vibration } from "haptics";

// Buttons
let ButtonPostSensorData = document.getElementById("ButtonPostSensorData");
let LabelPostSensorData = document.getElementById("LabelPostSensorData");
let LabelPostSensorDataResult = document.getElementById(
  "LabelPostSensorDataResult"
);

// Labels
let LabelHeartRate = document.getElementById("LabelHeartRate");
let LabelAccelerometer = document.getElementById("LabelAccelerometer");
let LabelBarometer = document.getElementById("LabelBarometer");

ButtonPostSensorData.onclick = function(evt) {
  messaging.sendVal({
    key: "PostSensorData",
    value: {
      heartRate: LabelHeartRate.text,
      accelerometer: LabelAccelerometer.text,
      barometer: LabelBarometer.text
    }
  });
  vibration.start("confirmation");
};

LabelPostSensorData.onclick = ButtonPostSensorData.onclick;

export function populateButtonLabel(value) {
  LabelPostSensorData.text = value;
}

export function populateResultLabel(value) {
  LabelPostSensorDataResult.text = value;
}

export function initialiseComponents() {
  startRecordingSensorData();
}

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
  } else {
    LabelHeartRate.text = "Heart rate: Sensor not detected."
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
  } else {
    LabelAccelerometer.text = "Acceleration: Sensor not detected."
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
  } else {
    LabelBarometer.text = "Pressure: Sensor not detected."
  }
}
