# webserver

webserver creation with node js ( weather app)

[WeatherApp-prod](https://tasmiapl-weather-application.herokuapp.com/)

## for running this application at your local mechine

```bash
npm run dev
```

## for running this application at production server

```bash
npm run start
```

- This application uses mapbox api for finding specific latitude and longitude of a given location.Checkout [mapbox api doc](https://docs.mapbox.com/api/) for details.
- Using the latitude and longitude, I've used darksky api for retriving the weather information of the given location.Checkout [darksky api doc](https://darksky.net/dev/docs) for details.
- You may get result for some unexpected input like "undefined",integers,float or some invalid strings(e.g. "fnff"). This is because of mapbox implementation, as they provide some default data for these kind of strings. I was too lazy to handle such error prone strings!! :3
- In some cases darksky may not provide some real-time data, That may cause return "undefined" values in some cases. Such as, "Dhaka" may contain property of "precipType", but "Austin" may not. So, in that case it'll retun "undefined".
- Mapbox api may be enabled for "cors" mode, but darksky don't.

## Asynchronous Operation

I've used [axios](https://github.com/axios/axios) library instead of "request" in the previous version.
Here in geocode.js, modgeo - Modified Geocode, modcast - Modified Forecast.

Callback has been removed.Istead, async-await has been used to pull data from apis.

Rest of the operations are as same as before.

## DISCLAIMER: (Please Read)

There may have some api keys for third party services and exposed in the public ripository. These api keys are used under free trial. Please use your own api key for darksky and mapbox for developement purpose and they offer some free access.
The code may need some further refactoring.

## API Aggregation

Api aggregation is a process in which multiple APIs from diffent sources are aggregated into one single API. It may follow an API workflow: Pull API data from one source and push it to another.

### API Aggregator / API Hub

This is an API on top of several APIs. It provides a single point of implementation and delivers a unique and standardized API regardless of what APIs or services it integrates with.

### Example

- [DarkSky.net](https://darksky.net/dev/docs) provides weather data based on the latitude and longitude of a certain place.
  **Forcast Request:** `https://api.darksky.net/forecast/[key]/[latitude],[longitude]`.
- To get the latitude and longitude of a certain place, we can use [Mapbox](https://docs.mapbox.com/api/) API.
  **Endpoint Request:** `https://api.mapbox.com/geocoding/v5/mapbox.places/[endpoint].json?[key]`

- When user inputs an `endpoint`, the aggregator takes the request query and execute the following function:

```javascript
const modgeo = async endpoint => {
  const limit = 1;
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${endpoint}.json?access_token=${token.MapBoxAT}&limit=${limit}`;

  try {
    let res = await axios.get(url);
    let data = res.data;
    const result = {
      latitude: data.features[0].center[0],
      longitude: data.features[0].center[1]
    };
    //console.log(obj);
    return result;
  } catch (error) {
    console.log(error);
  }
};
```

This provides the latitude and longitude data. Using this data, another function executes darksky api :

```javascript
const modcast = async (lat, long) => {
  const lang = "en";
  const url = `https://api.darksky.net/forecast/${token.darkSkyT}/${long},${lat}?lang=${lang}`;

  try {
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
  } catch (error) {
    console.log(error);
  }
};
```

**API Aggregation**:

```javascript
app.get("/weather", (req, res) => {
  if (!req.query.address) return res.send(error);
  try {
    const data = await modgeo(req.query.address);
    const result = await modcast(data.latitude, data.longitude);
    res.send(result);
  } catch (error) {
    console.log(error);
  }
});
```
