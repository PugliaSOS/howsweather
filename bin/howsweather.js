#!/usr/bin/env node
'use strict';

const config = require('./../src/configuration.js');
const ipinfo = require('./../src/ipinfo.js');
const OpenWeather = require('./../src/openweather.js');

console.log('howsweather | visualize weather, from console');

let weather = new OpenWeather(config.api_key, config.scale || 'K');

// Get city based on either configs or inputs
let target_city;
if (process.argv.length >= 3) {
    target_city = process.argv[2];
} else {
    target_city = config.city;
}

// Get city from ipinfo if not set
if (target_city) {
    getWeather(city);
} else {
    console.log('Retrieving your location by your IP address...');
    ipinfo.get().then(function returnCoords(coords) {
        getWeather(coords.city);
    });
}

// Get and display weather
function getWeather(city) {
    console.log(`Retrieving weather for '${target_city.toUpperCase()}'...`);
    weather.on(city, function(data) {
        let suffix = `°${weather.scale}`;
        console.log(`Min: ${data.min}${suffix}, Max: ${data.max}${suffix} | ${data.weatherStatus}`);
    });
}
