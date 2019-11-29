# FitBit Demos App

A FitBit app that uses [Panorama View](https://dev.fitbit.com/build/guides/user-interface/svg-components/views/#panorama-view) to display three seperate horizontally scrollable screens. Each screen demos the ability to send a HTTP/HTTPS GET or POST request from the device to the internet (via the sending messages to the [companion](https://dev.fitbit.com/build/guides/companion/)). These demos include:

* POST today's [user activity](https://dev.fitbit.com/build/reference/device-api/user-activity/) metrics to a specified API endpoint (using the Device API).
* POST some current [sensor](https://dev.fitbit.com/build/guides/sensors/) metrics to a specified API endpoint (using Sensor APIs).
* Make a generic GET request.

## Local Development

### Requirements

* `npx` (https://www.npmjs.com/package/npx)
* Fitbit OS Simulator (https://dev.fitbit.com/getting-started/)

### Running Locally

* `npm install`
* `npx fitbit` (to enter fitbit shell)
* Open and run the Fitbit OS simulator
* execute `build-and-install` in the Fitbit shell (and run this command each time to redeploy changes)

The app requires a `URL` configuration setting to be set before it can be run successfully. The `URL` setting is used by each of the UI views (mentioned above) to determine an endpoint to make requests to. You can set the `URL` setting in the companion settings window that opens up with the simulator. A good temp url service to use while testing is https://www.requestcatcher.com.
