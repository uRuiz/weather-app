const request = require("request");
const config = require('../config/config');

var geocodeAddress = (address) => {
 
  return new Promise ((resolve, reject) => {
    let add = encodeURIComponent(address);
    request({
      url: `http://www.mapquestapi.com/geocoding/v1/address?key=${config.mapQuestKey}&location=${add}`,
      json: true
    }, (error, response, body) => {
      if (error) {
        reject("Could not connect to the server");
      } else if (body == undefined) {
        reject("Unable to find that address");                
      } else if (response.statusCode === 200) {
        resolve({
            address : body.results[0].providedLocation.location,
            lat : body.results[0].locations[0].latLng.lat,
            long: body.results[0].locations[0].latLng.lng
        });
      }
    })
  })
}

geocodeAddress('Canoa 14, Majadahonda, Madrid, ES').then((location) => {
  console.log(JSON.stringify(location, undefined, 2));
}, (errorMessage) =>  {
  console.log(errorMessage);
});