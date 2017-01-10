#!/usr/bin/env node
'use strict';

let config = require('./../src/configuration.js');
let weather = require('./../src/openweatherapi.js');
weather.API_KEY = config.options.api_key;

const DEFAULT_CITY = config.options.city || null;
console.log('howsweather | visualize weather, from console');

// Check if the target city was given to runtime.
if (process.argv.length < 3 && DEFAULT_CITY === null) {
    console.log('Usage: howsweather <city>');
    process.exit(0);
}

weather.on(process.argv[2] || DEFAULT_CITY);
