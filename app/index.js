import document from "document";
import * as messaging from "messaging";
import { vibration } from "haptics";
import { today } from "user-activity";

console.log(`Setting up...`);
let background1 = document.getElementById("clickbg1");
let Label1 = document.getElementById("Label1");

// Activities
let ActiveMinutes = today.local.activeMinutes;
let Calories = today.local.calories;
let distance = today.local.distance;
let elevationGain = today.local.elevationGain;
let steps = today.local.steps;

// Activity Labels
let LabelActiveMinutes = document.getElementById("LabelActiveMinutes");
LabelActiveMinutes.text = "Active minutes: " + today.local.activeMinutes;

let LabelCalories = document.getElementById("LabelCalories");
LabelCalories.text = "Calories: " + today.local.calories;

let LabelDistance = document.getElementById("LabelDistance");
LabelDistance.text = "Distance: " + today.local.distance;

let LabelElevationGain = document.getElementById("LabelElevationGain");
LabelElevationGain.text = "Elevation Gain: " + today.local.elevationGain;

let LabelSteps = document.getElementById("LabelSteps");
LabelSteps.text = "Steps: " + today.local.steps;

// Message is received
messaging.peerSocket.onmessage = evt => {
  console.log(`App received: ${JSON.stringify(evt)}`);
  if (evt.data.key === "Label1" && evt.data.newValue)
    Label1.text = JSON.parse(evt.data.newValue).name;
};

  // Message socket opens
messaging.peerSocket.onopen = () => {
  console.log("App Socket Open");
};

// Message socket closes
messaging.peerSocket.onclose = () => {
  console.log("App Socket Closed");
};

background1.onclick = function(evt) {
  sendVal({key:'msg', value:'1'})
  console.log("Click Label 1");
  vibration.start("confirmation");
}

Label1.onclick = background1.onclick

// Send data to device using Messaging API
function sendVal(data) {
  console.log(JSON.stringify(data))
  if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
    messaging.peerSocket.send(data);
  }  else {
    responseDisplay.style.display = "inline"
    responseDisplay.text = "Phone?";
  }
}

