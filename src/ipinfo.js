/**
 * Retrieve location's data and istantiate a new promise which
 * can be used to access to coords when it's ready:
 *
 * ```
 * var ipinfo = require('./ipinfo')
 * ipinfo.get().then(function returnCoords() {
 *   console.log(ipinfo.getCoords());
 * });
 * ```
 */
const http = require('http');

class IPInfo {
  constructor() {
    this.apiURL = 'http://ipinfo.io';
  }

  get() {
    return new Promise((resolve) => {
      http.get(this.apiURL, (response) => {
        response.on('data', this.parseData.bind(this, resolve));
      });
    });
  }

  parseData(resolve, data) {
    resolve(JSON.parse(data));
  }
}

module.exports = IPInfo;
