// Read configuration options by a JSON file.
'use strict';

let fs = require('fs');
let path = require('path');

const HOME_PATH = process.env.HOME || process.env.USERPROFILE;
const CONFIG_PATH = path.join(HOME_PATH, '.howsweather');
const OPTIONS = fs.readFileSync(CONFIG_PATH, 'utf8');

module.exports = JSON.parse(OPTIONS);
