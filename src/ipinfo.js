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

const ENDPOINT = 'http://ipinfo.io';

function parseData(resolve, data) {
  resolve(JSON.parse(data));
}

function get() {
  return new Promise((resolve, reject) => {
    http.get(ENDPOINT, (response) => {
      response.on('data', parseData.bind(this, resolve));
    });
  });
}

exports.get = get;
