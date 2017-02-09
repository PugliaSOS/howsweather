const expect = require('chai').expect;

const OpenWeather = require('./../src/openweather');

describe('OpenWeather', function() {
  it('constructor should accepts two parameters: API key and scale', () => {
    expect(() => new OpenWeather('API_KEY', 'C')).to.not.throw(Error);
  });

  it('constructor should throws an error if one of more parameters are missing', () => {
    expect(() => new OpenWeather('API_KEY')).to.throws(Error);
  });

  it('constructor should throws an error if the passed temperature scale is invalid', () => {
    expect(() => new OpenWeather('API_KEY', 'X')).to.throw(Error);
  });

  it('convertToUserScale should converts temperature from Kelvin to Celsius', function() {
    const weather = new OpenWeather('API_KEY', 'C');
    expect(weather.convertToUserScale(1)).to.equal('-272.15');
  });

  it('convertToUserScale should converts temperature from Kelvin to Fahrenheit', function() {
    const weather = new OpenWeather('API_KEY', 'F');
    expect(weather.convertToUserScale(1)).to.equal('-457.87');
  });
});
