// Access to weather stats using OpenWeatherMap APIs.
'use strict';
var http = require('http');

module.exports = {
    API_ENDPOINT: 'http://api.openweathermap.org/data/2.5/weather?q={city}&apikey={api}',
    API_KEY: '',

    /*
     * Get weather stats for a specific city.
     * ```
     * let ny_stats = Weather.on('new york'); //=> [Object object]
     * ```
     */
    on: function (city) {
        let request_url = this.getRequestUrl(city);

        http.get(request_url, function (res) {
            console.log(`Retrieving weather for '${city.toUpperCase()}'..`);

            res.on('data', module.exports.parseWeather);
            res.on('error', console.log);
        });
    },

    // Parse weather retrieving only the necessary information.
    parseWeather: function (data) {
        data =  JSON.parse(data);

        let weatherStatus = data.weather[0].main;
        let temp = {
            min: module.exports.kelvinToCelsius(data.main.temp_min),
            max: module.exports.kelvinToCelsius(data.main.temp_max)
        };

        console.log(`${temp.min}°C - ${temp.max}°C | ${weatherStatus}`);
        return;
    },

    // Get the weather's request URL for the given city.
    getRequestUrl: function (city) {
        return this.API_ENDPOINT.replace('{city}', city)
                                .replace('{api}', this.API_KEY);
    },

    /*
     * Convert temperature from Kelvin to Celsius for European countries.
     * ```
     * let temp = Weather.kelvinToCelsius(0); //=> -273.15
     * ```
     */
    kelvinToCelsius: function (temperature) {
        return temperature - 273.15;
    }
};
