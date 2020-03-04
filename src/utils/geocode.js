/* eslint-disable no-undef */
const request = require('request');
const token = require('./tokens.js');
const axios = require('axios');

const geocode = (endpoint, callback) => {
    const limit = 1;
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${endpoint}.json?access_token=${token.MapBoxAT}&limit=${limit}`;
    
    request({
        url,
        json: true
    }, (error,{body}) => {
        if(error){
            callback(error,undefined);
        }else if(body.message){
           callback(body.message, undefined);
        }else if(body.features.length === 0){
            callback('Unable to find location. Try another search.', undefined);
        }else{
            callback(undefined,{
                latitude: body.features[0].center[0],
                longitude: body.features[0].center[1],
                location: body.features[0].place_name
            })
        }
    })
   
}

const axiosGeocode = (endpoint) => {
    const limit = 1 ;
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${endpoint}.json?access_token=${token.MapBoxAT}&limit=${limit}`;
    
    axios({
        method: 'get',
        url,
        responseType:'json'
    }).then(function(error, response){
        console.log(response);
        if(error)console.log(error);
    })
    
}

module.exports ={ geocode,
                 axGeocode,
                 };
