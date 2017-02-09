// Access to weather stats using OpenWeatherMap APIs.
const http = require('http');

/*
 * This module allows you to easily retrieve weather using OpenWeather API.
 * All you need is an API key you can get here: https://openweathermap.org/api.
 *
 *   @example
 *     const weather = new OpenWeather('YOUR_API_KEY')
 *     weather.on('New York');
 */
class OpenWeather {
  // Initializes a new connection with OpenWeatherMap's APIs */
  constructor(apiKey, temperatureScale) {
    this.apiKey = apiKey;
    this.temperatureScale = this.checkScale(temperatureScale);
    this.apiURL = 'http://api.openweathermap.org/data/2.5/weather?q={city}&apikey={api}';
  }

  checkScale(scale) {
    if (!['C', 'F', 'K'].includes(scale)) {
      throw new Error(`The given scale "${scale}" is not a valid one.`);
    }

    return scale;
  }

  // Get weather for a specific city.
  on(city, cb) {
    const self = this;
    const requestURL = this.composeURL(city);

    http.get(requestURL, (res) => {
      res.on('data', self.formatWeather.bind(self, cb));
      res.on('error', console.log);
    });
  }

  // Format weather's stats.
  formatWeather(cb, rawData) {
    const data = JSON.parse(rawData);

    cb({
      min: this.convertToUserScale(data.main.temp_min),
      max: this.convertToUserScale(data.main.temp_max),
      weatherStatus: data.weather[0].main
    });
  }

  // Convert temperature to the right temperature scale from Kelvin.
  convertToUserScale(temperature) {
    let convertedTemperature;

    switch (this.temperatureScale) {
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
  }

  // Compose the request's URL attaching necessary information.
  composeURL(city) {
    return this.apiURL.replace('{city}', city)
                      .replace('{api}', this.apiKey);
  }
}

module.exports = OpenWeather;
