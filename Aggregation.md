# API Aggregation

 Api aggregation is a process in which multiple APIs from diffent sources are aggregated into one single API. It may follow an API workflow: Pull API data from one source and push it to another.

## API Aggregator / API Hub

This is an API on top of several APIs. It provides a single point of implementation and delivers a unique and standardized API regardless of what APIs or services it integrates with.

## Example

* [DarkSky.net](https://darksky.net/dev/docs) provides weather data based on the latitude and longitude of a certain place.
**Forcast Request:** `https://api.darksky.net/forecast/[key]/[latitude],[longitude]`.
* To get the latitude and longitude of a certain place, we can use [Mapbox](https://docs.mapbox.com/api/) API.
**Endpoint Request:** `https://api.mapbox.com/geocoding/v5/mapbox.places/[endpoint].json?[key]`.

* When user inputs an `endpoint`, the aggregator takes the request query and execute the following function:

```javascript
const geocode = (endpoint, callback) => {
 const url = `mapbox url` /// api url
 request({
  url,
  json: true
  }, (error, { body }) => {
  if( error )callback( error, undefined );
  else if( body.message )callback( body.message,  undefined );
  else if( body.features.length === 0 )callback( 'Unable to find location.', undefined );
  else{
   callback(undefined,{
   latitude: body.features[0].center[0],
   longitude:  body.features[0].center[1],
   location:  body.features[0].place_name
   })
  }
 })
}
```

This provides the latitude and longitude data. Using this data, another function executes darksky api :

```javascript
const  forecast = (lat,long,callback) => {
 const  url = `darsky url`;  
 request({
 url,
 json:true
 },(error,{body}) => {
  if(error)callback(error,undefined);
  else if(body.error)callback(body.error,undefined);
  else{
  callback(undefined,{
  temperature: body.currently.temperature,
  summary:  body.daily.data[0].summary
   })
  }
 })
}
```

**API Aggregation**:

```javascript
app.get('/weather',(req,res) => {
 if(!req.query.address)return  res.send(error);
 geocode(req.query.address,(error,{latitude,longitude,location} = {})=>{
 if(error)return res.send(error);
 else{
 forecast(lat,long,(error,data)=>{
 if(error)return res.send(error);
 else res.send(data);
   })
  }
 })
});
```
