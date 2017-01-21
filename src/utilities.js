// Groups together utilities' functions used across the program.

/*
 * Find the temperature's scale used in a certain country,
 * by passing it country's ISO code.
 * ```
 * findCountryScale('IT') //=> C
 * findCountryScale('US') //=> F
 * ``` 
 */
const findCountryScale = function (country) {
  const target_country = country.toLowerCase();

  if (['us', 'bs', 'bz', 'ky', 'pw'].includes(target_country)) {
    return 'F';
  }

  return 'C';
};

/*
 * Append emoji to its text representation.
 * Its first argument is the object which contains emojis.
 * ```
 * const emojis = { rain: '\u2614' };
 * const getWeatherEmoji = appendEmoji(emojis);
 *
 * getWeatherEmoji('Rain');
 * ```
 */
const appendEmoji = function (emoji, keyword) {
  return function (keyword) {
    const target_keyword = keyword.toLowerCase();
    const target_emoji = emoji[target_keyword] || '';

    return target_emoji.concat(' ', keyword);
  }
};

/*
 * Returns information about weather in a human-readable way:
 * ```
 *  MIN 2°C, MAX 5°C | Clouds
 * ```
 */
const formatWeather = function (data, scale, status) {
  const suffix = '°'.concat(scale);
  return `MIN ${data.min.concat(suffix)}, MAX ${data.max.concat(suffix)} | ${status}`;
};

module.exports = { findCountryScale, appendEmoji, formatWeather };
