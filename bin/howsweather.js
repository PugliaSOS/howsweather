#!/usr/bin/env node
'use strict';

let config = require('./../src/configuration.js');
let weather = require('./../src/openweatherapi.js');
let ipinfo = require('./../src/ipinfo.js');

weather.API_KEY = config.options.api_key;
let target_city = config.options.city || null;

console.log('howsweather | visualize weather, from console');

// Check if the target city was given to runtime.
if (process.argv.length < 3 && target_city === null) {
    console.log('Retrieving your location by your IP address..');

    ipinfo.get().then(function returnCoords(coords) {
      target_city = coords.city;
      weather.on(target_city);
    });
} else {
    weather.on(process.argv[2] || target_city);
}
