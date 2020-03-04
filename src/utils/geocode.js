/* eslint-disable no-undef */
const request = require("request");
const token = require("./tokens.js");
const axios = require("axios");

const geocode = (endpoint, callback) => {
  const limit = 1;
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${endpoint}.json?access_token=${token.MapBoxAT}&limit=${limit}`;

  request(
    {
      url,
      json: true
    },
    (error, { body }) => {
      if (error) {
        callback(error, undefined);
      } else if (body.message) {
        callback(body.message, undefined);
      } else if (body.features.length === 0) {
        callback("Unable to find location. Try another search.", undefined);
      } else {
        callback(undefined, {
          latitude: body.features[0].center[0],
          longitude: body.features[0].center[1],
          location: body.features[0].place_name
        });
      }
    }
  );
};


const axiosGeocode = (endpoint, callback) => {
  const limit = 1;
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${endpoint}.json?access_token=${token.MapBoxAT}&limit=${limit}`;

  axios({
    method: "get",
    url,
    responseType: "object"
  }).then(response => {
    if (response.data.message) callback(response.data.message);
    else if (response.data.features.length === 0) callback("No loc found");
    else {
      callback({
        latitude: response.data.features[0].center[0],
        longitude: response.data.features[0].center[1],
        location: response.data.features[0].place_name
      });
    }
  });
};


const modgeo = async(endpoint) => {
    const limit = 1 ;
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${endpoint}.json?access_token=${token.MapBoxAT}&limit=${limit}`;
    
    let res = await axios.get(url);
    let data = res.data;
    const result  = { latitude: data.features[0].center[0], longitude: data.features[0].center[1] };
    //console.log(obj);
    return result;
    
    
} 


module.exports = { geocode, axiosGeocode , modgeo};
