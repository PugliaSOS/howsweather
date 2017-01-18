#!/usr/bin/env node
'use strict';

let config = require('./../src/configuration.js');
let ipinfo = require('./../src/ipinfo.js');
const OpenWeather = require('./../src/openweather.js');
let target_city = config.city || null;

let weather = new OpenWeather(config.api_key, config.scale || 'K');

console.log('howsweather | visualize weather, from console');

// Check if the target city was given to runtime.
if (process.argv.length < 3 && target_city === null) {
    console.log('Retrieving your location by your IP address..');

    ipinfo.get().then(function returnCoords(coords) {
        target_city = coords.city;
        console.log(`Retrieving weather for '${target_city.toUpperCase()}'..`);
        weather.on(target_city, function(data) {
            let suffix = `°${weather.scale}`;

            console.log(`Min: ${data.min}${suffix}, Max: ${data.max}${suffix} | ${data.weatherStatus}`);
        });
    });
} else {
    target_city = process.argv[2] || target_city;
    console.log(`Retrieving weather for '${target_city.toUpperCase()}'..`);
    weather.on(target_city, function(data) {

        let suffix = `°${weather.scale}`;
        console.log(`Min: ${data.min}${suffix}, Max: ${data.max}${suffix} | ${data.weatherStatus}`);
    });
}
