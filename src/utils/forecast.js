/* eslint-disable no-undef */
const request = require("request");
const token = require("./tokens.js");
const axios = require("axios");

const forecast = (lat, long, callback) => {
  const lang = "en";
  const url = `https://api.darksky.net/forecast/${token.darkSkyT}/${long},${lat}?lang=${lang}`;

  request(
    {
      url,
      json: true
    },
    (error, { body }) => {
      if (error) {
        callback(error, undefined);
      } else if (body.error) {
        callback(body.error, undefined);
      } else {
        callback(undefined, {
          temperature: body.currently.temperature,
          percentage: body.currently.precipProbability * 100,
          precipType: body.currently.precipType, ///this data can be unavailable sometimes , depends on currently property
          summary: body.daily.data[0].summary,
          timezone: body.timezone
        });
      }
    }
  );
};

const axiosForecast = (lat, long, callback) => {
  const lang = "en";
  const url = `https://api.darksky.net/forecast/${token.darkSkyT}/${long},${lat}?lang=${lang}`;

  axios({
    method: "get",
    url,
    responseType: "object"
  }).then(response => {
    if (response.data.error) callback(response.data.error);
    else {
      callback({
        temperature: response.data.currently.temperature,
        percentage: response.data.currently.precipProbability * 100,
        precipType: response.data.currently.precipType, ///this data can be unavailable sometimes , depends on currently property
        summary: response.data.daily.data[0].summary,
        timezone: response.data.timezone
      });
    }
  });
};

const modcast = async (lat, long) => {
  const lang = "en";
  const url = `https://api.darksky.net/forecast/${token.darkSkyT}/${long},${lat}?lang=${lang}`;

  let res = await axios.get(url);
  let data = res.data;
  const result = {
    temperature: data.currently.temperature,
    percentage: data.currently.precipProbability * 100,
    precipType: data.currently.precipType, ///this data can be unavailable sometimes , depends on currently property
    summary: data.daily.data[0].summary,
    timezone: data.timezone
  };
  console.log(result);
  return result;
};

module.exports = { forecast, axiosForecast, modcast};
