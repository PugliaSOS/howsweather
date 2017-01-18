// Access to weather stats using OpenWeatherMap APIs.
'use strict';
const http = require('http');
const endpoint = 'http://api.openweathermap.org/data/2.5/weather?q={city}&apikey={api}';

/**!
 * This module allows you to easily retrieve weather using OpenWeather API.
 * All you need is an API key you can get here: https://openweathermap.org/api.
 *
 *   @example
 *     let weather = new OpenWeather();
 *     weather.setAPI('YOUR_API_KEY')
 *     weather.setScale('C');
 *     weather.on('New York');
 */
function OpenWeather(api_key, scale) {
    this.setAPI(api_key);
    this.setScale(scale);
    return this;
}

OpenWeather.prototype.setAPI = function(key) {
    this.api_key = key;
}

OpenWeather.prototype.setScale = function(given_scale) {
    if (!['C', 'F', 'K'].includes(given_scale)) {
        throw new Error("Invalid scale for 'setScale' , expected: C, F or K.");
    }

    this.scale = given_scale;
}

/* Get weather for a specific city. */
OpenWeather.prototype.on = function(city, cb) {
    const self = this;
    const request_url = this.composeURL(city);

    http.get(request_url, function (res) {
        res.on('data', self.formatWeather.bind(self, cb));
        res.on('error', console.log);
    });
}

OpenWeather.prototype.formatWeather = function(cb, data) {
    data =  JSON.parse(data);

    cb({
        min: this.convertToUserScale(data.main.temp_min),
        max: this.convertToUserScale(data.main.temp_max),
        weatherStatus: data.weather[0].main
    });
}

OpenWeather.prototype.convertToUserScale = function(temperature) {
    switch (this.scale) {
        case 'C':
          temperature -= 273.15;
          break;
        case 'F':
          temperature = temperature * (9/5) - 459.67;
          break;
    }

    return temperature.toFixed(2);
}

/* Compose the request's URL attaching necessary information. */
OpenWeather.prototype.composeURL = function(city) {
    return endpoint
        .replace('{city}', city)
        .replace('{api}', this.api_key);
}

module.exports = OpenWeather;
