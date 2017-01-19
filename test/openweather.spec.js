const expect = require('chai').expect;

const OpenWeather = require('./../src/openweather');

const weather = new OpenWeather('', 'C');

describe('OpenWeather', function() {
  describe('#setAPI()', function() {
    it('should edits API key', function() {
      weather.setAPI('MOCHA_TEST');
      expect(weather.apiKey).to.equal('MOCHA_TEST');
    });
  });

  describe('#setScale()', function() {
    it('should raises an error if the scale is not valid', function() {
      expect(function() {
        weather.setScale(0);
      }).to.throw(Error);
    })

    it ('should edits scale', function() {
      weather.setScale('F');
      expect(weather.scale).to.equal('F');
    });
  })

  describe('#convertToUserScale()', function() {
    it('should convert from Kelvin to Celsius', function() {
      weather.setScale('C');
      expect(weather.convertToUserScale(1)).to.equal('-272.15');
    });

    it('should convert from Kelvin to Fahrenheit', function() {
      weather.setScale('F');
      expect(weather.convertToUserScale(1)).to.equal('-457.87');
    })
  });
});
