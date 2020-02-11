# webserver
webserver creation with node js ( weather app)

https://tasmiapl-weather-application.herokuapp.com/

## for running this application at your local mechine:
 ```bash
 npm run dev
 ```
## for running this application at production server:
 ```bash
 npm run start
 ```
 
 * This application uses mapbox api for finding specific latitude and longitude of a given location.Checkout [mapbox api doc](https://docs.mapbox.com/api/) for details.
 * Using the latitude and longitude, I've used darksky api for retriving the weather information of the given location.Checkout [darksky api doc](https://darksky.net/dev/docs) for details.
 * You may get result for some unexpected input like "undefined",integers,float or some invalid strings(e.g. "fnff"). This is because of mapbox implementation, as they provide some default data for these kind of strings. I was too lazy to handle such error prone strings!! :3
 * In some cases darksky may not provide some real-time data, That may cause return "undefined" values in some cases. Such as, "Dhaka" may contain property of "precipType", but "Austin" may not. So, in that case it'll retun "undefined".
 * Mapbox api may be enabled for "cors" mode, but darksky don't.

