const expect = require('chai').expect;

const ipinfo = require('./../src/ipinfo');

describe('IPInfo', () => {
  describe ('#get()', () => {
    it('should returns a Promise', () => {
      expect(ipinfo.get().toString()).to.equal('[object Promise]');
    });
  });
});
