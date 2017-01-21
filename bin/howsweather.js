#!/usr/bin/env node

const config = require('./../src/configuration.js');

const ipinfo = require('./../src/ipinfo.js');

const OpenWeather = require('./../src/openweather.js');

const emoji = require('./../src/emoji.js');

const weather = new OpenWeather(config.api_key, config.scale || 'K');

// Get city based on either configs or inputs
let targetCity;
console.log('howsweather | visualize weather, from console');

if (process.argv.length >= 3) {
  targetCity = process.argv[2];
} else {
  targetCity = config.city;
}

// Get city from IPInfo if not set
if (targetCity) {
  getWeather(targetCity);
} else {
  console.log('Retrieving your location by your IP address...');

  ipinfo.get().then((coords) => {
    getWeather(coords.city);
  });
}

const showGraphicalWeather = function (status) {
  const weatherEmoji = emoji[status.toLowerCase()] || '';
  return weatherEmoji.concat(' ', status);
};

// Get and display weather
function getWeather(city) {
  console.log(`Retrieving weather for '${city.toUpperCase()}'...`);

  weather.on(city, (data) => {
    const suffix = `°${weather.scale}`;
    const graphic = showGraphicalWeather(data.weatherStatus);

    console.log(`Min: ${data.min}${suffix}, Max: ${data.max}${suffix} | ${graphic}`);
  });
}
