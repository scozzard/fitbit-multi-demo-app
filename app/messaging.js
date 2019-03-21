import document from 'document'
import * as messaging from "messaging";
import * as activitiesUI from "./ui/activities"

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
    console.log(`[App] Message received: ${JSON.stringify(evt)}`);

    // A little hacky at the moment...when a message is recieved from the peered (companion) phone, all we
    // are doing is udpating the text on one of the viewports labels. If we were going to do anything more
    // advanced than this, we'd have to update the structure of the messages sent here (from the companion)
    // and how we handle them here.
    let label = document.getElementById(evt.data.key);
    label.text = evt.data.newValue;
};

// Send data to Phone using Messaging API
export function sendVal(data) {
    console.log(`[App] Message being sent: ${JSON.stringify(data)}`);
    if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
        messaging.peerSocket.send(data);
    }
}