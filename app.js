const config = require("./config");

const request = require("request");
const yargs = require("yargs");

const argv = yargs
    .options({
        a: {
            demand: true,
            alias: "address",
            describe: "Address to fetch weather for",
            string: true
        }
    })
    .help()
    .alias("help", "h").argv;

let address = encodeURIComponent(argv.address);

request(
    {
        url: `http://www.mapquestapi.com/geocoding/v1/address?key=${
            config.KEY
        }&location=${address}`,
        json: true
    },
    (error, response, body) => {
        if (error) {
            console.log("Could not connect to the server");
        } else if (body.status === "ZERO_RESULTS") {
            console.log("Unable to find that address");
        } else {
            console.log(
                `Address: ${body.results[0].providedLocation.location}`
            );
            console.log(`Latitude: ${body.results[0].locations[0].latLng.lat}`);
            console.log(
                `Longitude: ${body.results[0].locations[0].latLng.lng}`
            );
        }
    }
);
