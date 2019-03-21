# FitBit Demos App

A FitBit app that uses [Panorama View](https://dev.fitbit.com/build/guides/user-interface/svg-components/views/#panorama-view) to display three seperate horizontally scrollable views. Each view demonstrates the ability to send a HTTP/HTTPS GET or POST request from the device to the internet (via the sending messages to the [companion](https://dev.fitbit.com/build/guides/companion/)). These demos include:

* POST a selection today's [user activity](https://dev.fitbit.com/build/reference/device-api/user-activity/) metrics to a specified API endpoint (using the Device API).
* POST a selection of the current [sensor](https://dev.fitbit.com/build/guides/sensors/) metrics to a specified API endpoint (using Sensor APIs).
* Make a generic GET request to a specified endpoint.

The app requires a `URL` configuration setting to be set before it can be run successfully. The `URL` setting is used by each of the UI views (mentioned above) to determine an endpoint to make requests to.

A good way to test would be to use a free request testing service such as https://www.requestcatcher.com.
