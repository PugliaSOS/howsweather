#!/usr/bin/env node

const defaults = require('./../src/configuration.js');

const ipinfo = require('./../src/ipinfo.js');

const OpenWeather = require('./../src/openweather.js');

const emoji = require('./../src/emoji.js');

const findCountryScale = function (country) {
  if (['US', 'BS', 'BZ', 'KY', 'PW'].includes(country)) {
    return 'F';
  }

  return 'C';
};

const showGraphicalWeather = function (status) {
  const weatherEmoji = emoji[status.toLowerCase()] || '';
  return weatherEmoji.concat(' ', status);
};

console.log('howsweather | visualize weather, from console');
const targetCity = process.argv[2] || defaults.city;

ipinfo.get().then((coords) => {
  const geoScale = findCountryScale(coords.country);
  const weather = new OpenWeather(defaults.api_key, defaults.scale || geoScale);

  getWeather(targetCity || coords.city, weather);
});

// Get and display weather
function getWeather(city, weather) {
  console.log(`Retrieving weather for '${city.toUpperCase()}'...`);

  weather.on(city, (data) => {
    const suffix = `°${weather.scale}`;
    const graphic = showGraphicalWeather(data.weatherStatus);

    console.log(`Min: ${data.min}${suffix}, Max: ${data.max}${suffix} | ${graphic}`);
  });
}
