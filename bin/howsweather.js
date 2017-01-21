#!/usr/bin/env node

const defaults = require('./../src/configuration.js');

const emojis = require('./../src/emoji.js');

const IPInfo = require('./../src/ipinfo.js');

const $ = require('./../src/utilities.js');

const appendWeatherEmoji = $.appendEmoji(emojis);

/*
 * === Impure functions ===
 * Fetch data about user's position and merge found 
 * information with the default ones in the configuration file.
 */
const fetchCity = function () {
  return process.argv[2] || defaults.city;
};

const checkForAPIKey = function () {
  if (defaults.api_key === undefined) {
    throw new Error('You should specify an API key in .howsweather');
  }
};

IPInfo.get().then((coords) => {
  const OPTIONS = {
    city: fetchCity() || coords.city,
    scale: defaults.scale || $.findCountryScale(coords.country),
  };

  checkForAPIKey();
  getWeather(defaults.api_key, OPTIONS.city, OPTIONS.scale);
});

function getWeather(api_key, city, scale) {
  const OpenWeather = require('./../src/openweather.js');
  const weather = new OpenWeather(api_key, scale);

  console.log(`Retrieving weather for '${city.toUpperCase()}'...`);

  weather.on(city, (data) => {
    const status = appendWeatherEmoji(data.weatherStatus);
    console.log($.formatWeather(data, weather.scale, status));
  });
}
