# howsweather
A simple JS script for display weather at terminal

## Preface

This is just an experiment I took in order to make practice with 
JavaScript and Node.js environment.

## Getting Started
### Configure the necessary

In order to work, **howsweather** read configuration options by a 
JSON file `.howsweather` in your `$HOME` directory.

So open your favourite text editor and type:
```plain
{
  "city": "YOURCITY",
  "api_key": "YOURAPIKEY"
}
```

You can get an API key at [OpenWeatherMap](https://openweathermap.org/api).

Now you're ready to use howsweather.
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

howsweather is released under terms of GNU/GPL ver3.
