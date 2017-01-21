const expect = require('chai').expect;

const $ = require('./../src/utilities');

describe('Utilities', function () {
  describe('#findCountryScale(String)', function () {
    it('should returns country temperature scale', function () {
      expect($.findCountryScale('IT')).to.equal('C');
      expect($.findCountryScale('US')).to.equal('F');
      expect($.findCountryScale('bz')).to.equal('F');
    });
  });

  describe('#appendEmoji', function () {
    const getEmoji = $.appendEmoji({ censored: 'X', smile: ':)' });

    it('should append the right emoji to its keyword', function () {
      expect(getEmoji('Smile')).to.equal(':) Smile');
    });

    it('should silently continue if no emoji is found', function () {
      expect(getEmoji('Unknown')).to.equal(' Unknown');
    });
  });
});
