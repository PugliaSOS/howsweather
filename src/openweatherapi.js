// Access to weather stats using OpenWeatherMap APIs.
'use strict';
let http = require('http');

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
function OpenWeather() {
    let endpoint = 'http://api.openweathermap.org/data/2.5/weather?q={city}&apikey={api}';
    let api_key  = '';
    let scale = '';

    function setAPI(key) {
        api_key = key;
    }

    function setScale(given_scale) {
        if (!['C', 'F', 'K'].includes(given_scale)) {
            abort("Invalid scale for 'setScale' , expected: C, F or K.");
        }

        scale = given_scale;
    }

    /* Get weather for a specific city. */
    function on(city) {
        let request_url = composeURL(city);

        http.get(request_url, function (res) {
            console.log(`Retrieving weather for '${city.toUpperCase()}'..`);

            res.on('data', formatWeather);
            res.on('error', console.log);
        });
    }

    function formatWeather(data) {
        let suffix = `°${scale}`;

        try {
            data =  JSON.parse(data);

            var weatherStatus = data.weather[0].main;
            var temp = {
                min: convertToUserScale(data.main.temp_min),
                max: convertToUserScale(data.main.temp_max)
            };
        } catch(error) {
            abort('An error occured: check your .howsweather file');
        }

        console.log(`Min: ${temp.min}${suffix}, Max: ${temp.max}${suffix} | ${weatherStatus}`);
        return;
    }

    function convertToUserScale(temperature) {
        switch (scale) {
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
    function composeURL(city) {
        return endpoint.replace('{city}', city)
                       .replace('{api}', api_key);
    }

    function abort(message) {
        console.log(message);
        process.exit(1);
    }

    return { on: on, setAPI: setAPI, setScale: setScale };
}

module.exports = new OpenWeather();
