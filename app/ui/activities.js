import document from 'document'
import * as messaging from "../messaging"
import { today } from "user-activity";
import { vibration } from "haptics";

// Buttons
let ButtonPostActivityData = document.getElementById("ButtonPostActivityData");
let LabelPostActivityData = document.getElementById("LabelPostActivityData");
let LabelPostActivityDataResult = document.getElementById("LabelPostActivityDataResult");

// Labels
let LabelActiveMinutes = document.getElementById("LabelActiveMinutes");
let LabelCalories = document.getElementById("LabelCalories");
let LabelDistance = document.getElementById("LabelDistance");
let LabelElevationGain = document.getElementById("LabelElevationGain");
let LabelSteps = document.getElementById("LabelSteps");

export function populateButtonLabel(value) {
    LabelPostActivityData.text = value;
}

export function populateResultLabel(value) {
    LabelPostActivityDataResult.text = value;
}

export function initialiseComponents() {
    populateActivityLabels();
}

function populateActivityLabels() {
    LabelActiveMinutes.text = "Active minutes: " + today.local.activeMinutes;
    LabelCalories.text = "Calories: " + today.local.calories;
    LabelDistance.text = "Distance: " + today.local.distance;
    LabelElevationGain.text = "Elevation Gain: " + today.local.elevationGain;
    LabelSteps.text = "Steps: " + today.local.steps;
}

ButtonPostActivityData.onclick = function (evt) {
    messaging.sendVal({
        'key': 'PostActivityData',
        'value': {
            'activeMinutes': today.local.activeMinutes,
            'calories': today.local.calories,
            'distance': today.local.distance,
            'elevationGain': today.local.elevationGain,
            'steps': today.local.steps
        }
    })
    vibration.start("confirmation");
}

LabelPostActivityData.onclick = ButtonPostActivityData.onclick