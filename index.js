// howsweather | visualize weather, from console
// Copyright (c) 2017 Dom Corvasce
// Licensed under terms of GNU/GPL ver3.
'use strict';

let config = require('./src/configuration.js');
let weather = require('./src/openweatherapi.js');

console.log('howsweather | visualize weather, from console');

// Check if the target city was given to runtime.
if (process.argv.length < 3) {
    console.log('Usage: howsweather <city>');
    process.exit(0);
}

weather.on(process.argv[2]);
