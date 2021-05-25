const request = require('request');

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1Ijoicm9oaXQxNDAyIiwiYSI6ImNrcDFmb2F2ejB6MW4yb21yaTE1aXVhdzQifQ.P6TZp_veNgsWxosUv1wf7g&limit=1`

    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to the Location Service :(', undefined);
        }
        else if(response.body.message || response.body.features.length === 0) {
            callback('Unable to find the location :(', undefined);
        }
        else {
            callback(undefined, {
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name,
                NOTE: 'If you are looking for another place, please be specific.'
            });
        }
    });
};

module.exports = geocode;