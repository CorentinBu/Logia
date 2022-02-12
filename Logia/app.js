const express = require('express');
const app = express();
const http = require("http");
const https = require("https");

const { Server } = require("socket.io");
const port = 3000
const server = http.createServer(app);
const io = new Server(server);

var data = "Real-Time Update 1";
var i = 1;
var city = '';
var meteo = '';
var desc = '';
var temp = '';
var waitTime=3000;

app.use('/', express.static('public'));

const options = {
    "method": "GET",
    "hostname": "community-open-weather-map.p.rapidapi.com",
    "port": null,
    //"path": "/weather?q=London%2Cuk&lang=fr",
    "path": "/weather?",
    "headers": {
        "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
        "x-rapidapi-key": "---",
        "useQueryString": true
    }
};

villeAleatoire();

//Choose a random city on the list
function villeAleatoire() {

    //Init the link, then choose the city randomly
    options.path = "/weather?";
    var cityList = ["Paris", "London", "Tokyo", "New+York+City", "Moscow","Nantes","Florence","Belgrade","Sofia","Madrid","Tunis","Hamburg","Berlin","Cologne","Amsterdam","Los+Angeles","Inuvik","Barrow","Mould+Bay","Anadyr","Seoul","Sendai","Singapore"];
    var size = cityList.length;
    var random = randomIntFromInterval(0, size);

    //Create URL with the city
    var URLcity = cityList[random];
    options.path = options.path + "q=" + URLcity + "&lang=fr";
    console.log(options.path);
}

function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}

//Do once to not get a empty page at the start
var req = https.request(options, function (res) {
    var chunks = [];

    res.on("data", function (chunk) {
        chunks.push(chunk);
    });

    res.on("end", function () {
        var body = Buffer.concat(chunks);

        var parsedData = JSON.parse(body);
        //Uncommented to see all data on the console
        console.log(parsedData);

        //Collect data on the parsedData
        city = parsedData.name;
        meteo = parsedData.weather[0].main;
        desc = parsedData.weather[0].description;
        temp = parsedData.main.temp;

        console.log("Ville : " + city);
        console.log("Météo actuelle : " + meteo);
        console.log("Description : " + desc);
        console.log("Température : " + temp);
        console.log("-----------------------------");
    });
});
req.end();

//Search a new city every 30 secondes
var interval = setInterval(function () {
   
    villeAleatoire();

    //Get information from the API
    var req = https.request(options, function (res) {
        var chunks = [];

        res.on("data", function (chunk) {
            chunks.push(chunk);
        });

        res.on("end", function () {
            var body = Buffer.concat(chunks);

            var parsedData = JSON.parse(body);
            //Uncommented to see all data on the console
            console.log(parsedData);

            //Collect data on the parsedData
            city = parsedData.name;
            meteo = parsedData.weather[0].main;
            desc = parsedData.weather[0].description;
            temp = parsedData.main.temp;

            console.log("Ville : " + city);
            console.log("Météo actuelle : " + meteo);
            console.log("Description : " + desc);
            console.log("Température : " + temp);
            console.log("-----------------------------");
        });
    });

    req.end();

    io.on('connection', socket => {
            data= [city, meteo, desc, temp];
            //console.log("SENT: " + data);
            socket.emit('afficherMeteo', data);
        })

}, waitTime);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/html/index.html');
});

server.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`)
})


module.exports = app;
