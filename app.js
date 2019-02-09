const request = require("request");
const yargs = require("yargs");

const KEY = "Zq0jVLe2Bk5vMgEGoyfcm1zREem2Hz3n";
const argv = yargs
    .options({
        a: {
            demand: true,
            alias: "address",
            describe: "Address tp fetch weather for",
            string: true
        }
    })
    .help()
    .alias("help", "h").argv;

let address = encodeURIComponent(argv.address);

request(
    {
        url: `http://www.mapquestapi.com/geocoding/v1/address?key=${KEY}&location=${address}`,
        json: true
    },
    (error, response, body) => {
        console.log(`Address: ${body.results[0].providedLocation.location}`);
        console.log(`Latitude: ${body.results[0].locations[0].latLng.lat}`);
        console.log(`Longitude: ${body.results[0].locations[0].latLng.lng}`);
    }
);
