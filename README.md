# howsweather
A simple JS script that displays weather on terminal

## Preface

This is just an experiment I took in order to practice with 
JavaScript and Node.js environment.

## Getting Started
### Configure the necessary

In order to work, **howsweather** reads configuration options from a 
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
