# howsweather
[![Build Status](https://travis-ci.org/PugliaSOS/howsweather.svg?branch=master)](https://travis-ci.org/PugliaSOS/howsweather)
[![codecov](https://codecov.io/gh/PugliaSOS/howsweather/branch/master/graph/badge.svg)](https://codecov.io/gh/PugliaSOS/howsweather)

A simple Node.js script that displays weather on terminal.

## Installation

Make sure you've Node.js `>= 6.3.1` and `npm` installed on your system.

Then type:

```shell
npm install howsweather -g
```

Here you are! You're ready to use **howsweather**.

## Getting Started
![Screenshot](http://i.imgur.com/UG40JgX.png "Screenshot")

### Configure the necessary

In order to work, **howsweather** reads configuration options from a 
JSON file `.howsweather` in your `$HOME` directory.

So open your favourite text editor and type:
```json
{
  "city": "YOURCITY",
  "api_key": "YOURAPIKEY"
}
```

If you don't specify a city, it'll find your location automatically.

You can get an API key at [OpenWeatherMap](https://openweathermap.org/api).

#### Scales

_howsweather_ allows you to show temperatures in the three main scales.
By default, it uses your position in order to understand what scale use.

You can change this behavior specifying a `scale` option in your 
configuration file, there are three possible values:

- `C` for Celsius scale
- `F` for Fahrenheit scale
- `K` for Kelvin scale

### See weather stats

If you want to see weather for a specific city:
```shell
howsweather "New York"
```

Or for the default one:
```shell
howsweather
```

## License

howsweather is released under terms of [GNU/GPL 3.0 license](LICENSE).
