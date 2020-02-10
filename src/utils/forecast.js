const request = require('request');
const token = require('./tokens.js');

const forecast = (lat,long, callback) => {
    const lang = 'en';
    const url = `https://api.darksky.net/forecast/${token.darkSkyT}/${long},${lat}?lang=${lang}`;
    
    request({
        url,
        json: true
    }, (error, {body}) => {
        
        if(error){
            callback(error,undefined);
        }else if(body.error){
            callback(body.error,undefined);
        }else{
            callback(undefined,{
             temperature: body.currently.temperature,
             percentage: (body.currently.precipProbability) * 100,
             precipType: body.currently.precipType, ///this data can be unavailable sometimes , depends on currently property
             summary: body.daily.data[0].summary,
             timezone: body.timezone
            })
            
        }
        
    })
}

module.exports = forecast;
