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

app.use('/', express.static('public'));

const options = {
    "method": "GET",
    "hostname": "community-open-weather-map.p.rapidapi.com",
    "port": null,
    "path": "/weather?q=London%2Cuk&lang=fr",
    "headers": {
        "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
        "x-rapidapi-key": "--",
        "useQueryString": true
    }
};

var interval = setInterval(function () {
    //Get information from the API
    const req = https.request(options, function (res) {
        const chunks = [];

        res.on("data", function (chunk) {
            chunks.push(chunk);
        });

        res.on("end", function () {
            const body = Buffer.concat(chunks);

            //Uncommented to see all data on the console
            //console.log(body.toString());

            const parsedData = JSON.parse(body);
            console.log(parsedData);
            //Collect data on the parsedData
            city = parsedData.name;
            meteo = parsedData.weather[0].main;

        
            console.log(city);
            console.log(meteo);
        
            console.log(i);
            i++;
        });
    });
    req.end();


io.on('connection', socket => {

    
        data = meteo + " " + i;

        console.log("SENT: " + data);

        socket.emit('afficherMeteo', data);
    

})
}, 1000);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/html/index.html');
});

server.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`)
})


module.exports = app;
