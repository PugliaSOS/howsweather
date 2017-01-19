// Read configuration options by a JSON file.
const fs = require('fs');

const path = require('path');

const HOME_PATH = process.env.HOME || process.env.USERPROFILE;
const CONFIG_PATH = path.join(HOME_PATH, '.howsweather');
const OPTIONS = fs.readFileSync(CONFIG_PATH, 'utf8');

module.exports = JSON.parse(OPTIONS);
