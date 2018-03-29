const path = require('path');
const bodyParser = require('body-parser');
const http = require('http');
const express = require('express');

// API files to interact with MongoDB
const api = require('./server/routes/api');
const app = express();

// Parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Angular CLIENT output folder
app.use(express.static(path.join(__dirname, 'client')));

// CORS on ExpressJS 
api.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Content-Type', 'application/json');
    next();
});

// API location
app.use('/api', api);

// Send all other request to Angular app
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, 'client/index.html'));
})

// Set port
const port = process.env.PORT || 3000;
app.set('port', port);

const server = http.createServer(app);

server.listen(port, () => {
    console.log(`Running on localhost:${port}`);
})





