const expect = require('chai').expect;

const IPInfo = require('./../src/ipinfo');

describe('IPInfo', () => {
  it('get should returns a Promise object', () => {
    const ipinfo = new IPInfo();
    expect(ipinfo.get().toString()).to.equal('[object Promise]');
  });
});
