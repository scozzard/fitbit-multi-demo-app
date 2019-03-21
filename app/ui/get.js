import document from 'document'
import * as messaging from "../messaging/";
import { vibration } from "haptics";

// Buttons
let ButtonGetData = document.getElementById("ButtonGetData");
let LabelGetData = document.getElementById("LabelGetData");

ButtonGetData.onclick = function (evt) {
    messaging.sendVal({ key: 'GetData' })
    vibration.start("confirmation");
}

LabelGetData.onclick = ButtonGetData.onclick

export function initialiseComponents() {
    // Nothing to initialise.
}