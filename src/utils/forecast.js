const request = require('request');

const forecast = (lat, long, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=135e59816c8e9b92500340bdccdfe043&query=${lat},${long}`;

    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('Unanble to connect to the Weather Service :(', undefined);
        }
        else if (response.body.error) {
            callback('Unable to find the location :(', undefined);
        }
        else {
            const cur = response.body.current.temperature;
            const feel = response.body.current.feelslike;
            const condition = response.body.current.weather_descriptions[0];
            callback(undefined, `Weather is "${condition}" with currently "${cur}" degree temperature and it feels like "${feel}" degree.`
            );
        }
    })
};

module.exports = forecast;