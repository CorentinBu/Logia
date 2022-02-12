const express = require('express');
const app = express();
const http = require("https");

var city = '';
var meteo = '';

const options = {
    "method": "GET",
    "hostname": "community-open-weather-map.p.rapidapi.com",
    "port": null,
    "path": "/weather?q=London%2Cuk&lang=fr",
    "headers": {
        "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
        "x-rapidapi-key": "90ff7ee5c2msh4e0de3b1449b49fp1ee4ccjsnabaada3c348b",
        "useQueryString": true
    }
};

//Get information from the API
const req = http.request(options, function (res) {
    const chunks = [];

    res.on("data", function (chunk) {
        chunks.push(chunk);
    });

    res.on("end", function () {
        const body = Buffer.concat(chunks);

        //console.log(body.toString());

        const parsedData = JSON.parse(body);

        city = parsedData.name;
        meteo = parsedData.weather[0].main;

        console.log(city);
        console.log(meteo);
    });
});

req.end();
module.exports = app;