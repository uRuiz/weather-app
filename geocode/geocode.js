const config = require('../config/config');
const request = require("request");

const geocodeAddress = (address, callback) => {
    let add = encodeURIComponent(address);

    request({
            url: `http://www.mapquestapi.com/geocoding/v1/address?key=${config.mapQuestKey}&location=${add}`,
            json: true
        },
        (error, response, body) => {
            // console.log(body);
            if (error) {
                callback("Could not connect to the server");
            } else if (body == undefined) {
                callback("Unable to find that address");                
            } else if (response.statusCode === 200) {
                callback(undefined, {
                    address : body.results[0].providedLocation.location,
                    lat : body.results[0].locations[0].latLng.lat,
                    long: body.results[0].locations[0].latLng.lng
                });
            }
        }
    );
};

module.exports.geocodeAddress = geocodeAddress;