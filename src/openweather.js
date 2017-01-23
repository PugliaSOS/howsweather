// Access to weather stats using OpenWeatherMap APIs.
const http = require('http');

const endpoint = 'http://api.openweathermap.org/data/2.5/weather?q={city}&apikey={api}';

/*
 * This module allows you to easily retrieve weather using OpenWeather API.
 * All you need is an API key you can get here: https://openweathermap.org/api.
 *
 *   @example
 *     let weather = new OpenWeather();
 *     weather.setAPI('YOUR_API_KEY')
 *     weather.setScale('C');
 *     weather.on('New York');
 */
function OpenWeather(apiKey, scale) {
  this.setAPI(apiKey);
  this.setScale(scale);
  return this;
}

OpenWeather.prototype.setAPI = function setAPI(key) {
  this.apiKey = key;
};

OpenWeather.prototype.setScale = function setScale(givenScale) {
  if (!['C', 'F', 'K'].includes(givenScale)) {
    throw new Error("Invalid scale for 'setScale' , expected: C, F or K.");
  }

  this.scale = givenScale;
};

/* Get weather for a specific city. */
OpenWeather.prototype.on = function on(city, cb) {
  const self = this;
  const requestURL = this.composeURL(city);

  http.get(requestURL, (res) => {
    res.on('data', self.formatWeather.bind(self, cb));
    res.on('error', console.log);
  });
};

OpenWeather.prototype.formatWeather = function formatWeather(cb, rawData) {
  const data = JSON.parse(rawData);

  cb({
    min: this.convertToUserScale(data.main.temp_min),
    max: this.convertToUserScale(data.main.temp_max),
    weatherStatus: data.weather[0].main
  });
};

OpenWeather.prototype.convertToUserScale = function convertToUserScale(temperature) {
  let convertedTemperature;

  switch (this.scale) {
    case 'C':
      convertedTemperature = temperature - 273.15;
      break;
    case 'F':
      convertedTemperature = (temperature * (9 / 5)) - 459.67;
      break;
    default:
      convertedTemperature = temperature;
  }

  return convertedTemperature.toFixed(2);
};

/* Compose the request's URL attaching necessary information. */
OpenWeather.prototype.composeURL = function composeURL(city) {
  return endpoint.replace('{city}', city)
                 .replace('{api}', this.apiKey);
};

module.exports = OpenWeather;
