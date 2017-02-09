#!/usr/bin/env node

const defaults = require('./../src/configuration.js');
const emojis = require('./../src/emoji.js');
const IPInfo = require('./../src/ipinfo.js');
const $ = require('./../src/utilities.js');
const OpenWeather = require('./../src/openweather.js');

const appendWeatherEmoji = $.appendEmoji(emojis);
const ipinfo = new IPInfo();

/*
 * Fetch data about user's position and merge found
 * information with the default ones in the configuration file.
 */
const fetchCity = () => process.argv[2] || defaults.city;

// Get weather for a specific city.
const getWeather = (apiKey, city, scale) => {
  const weather = new OpenWeather(apiKey, scale);

  console.log(`Retrieving weather for '${city.toUpperCase()}'...`);

  weather.on(city, (data) => {
    const status = appendWeatherEmoji(data.weatherStatus);
    console.log($.formatWeather(data, scale, status));
  });
};

// Check for an API key.
const checkForAPIKey = () => {
  if (defaults.api_key === undefined) {
    throw new Error('You should specify an API key in .howsweather');
  }
};

ipinfo.get().then((coords) => {
  const OPTIONS = {
    city: fetchCity() || coords.city,
    scale: defaults.scale || $.findCountryScale(coords.country),
  };

  checkForAPIKey();
  getWeather(defaults.api_key, OPTIONS.city, OPTIONS.scale);
});
