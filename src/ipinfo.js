// Access to user's location through http://ipinfo.io
var http = require('http');

function IPInfo() {
    var ENDPOINT = 'http://ipinfo.io';
    var coords;

    /*
     * Retrieve location's data and istantiate a new promise which
     * can be used to access to coords when it's ready:
     * ```
     * var ipinfo = new IPInfo();
     * ipinfo.get().then(function returnCoords() {
     *   console.log(ipinfo.getCoords());
     * });
     * ```
     */
    function get() {
        return new Promise(function getData(resolve, reject) {
            http.get(ENDPOINT, function fetchResponse(response) {
                response.on('data', parseData);
                resolve();
            });
        });
    }

    function parseData(data) {
        coords = JSON.parse(data);
        return;
    }

    function getCoords() {
        return coords;
    }

    return { get: get, getCoords: getCoords };
}

module.exports = { ipinfo: new IPInfo() };
