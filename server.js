// Created by Dayu Wang (dwang@stchas.edu) on 2022-03-20

// Last updated by Dayu Wang (dwang@stchas.edu) on 2022-03-20


const http = require("http");
const express = require("express");
const path = require("path");

const app = express();
app.use(express.json());
app.use(express.static("express"));

app.use('/', function(req, res) {
    res.sendFile(path.join(__dirname + "/express/index.html"));
});

const server = http.createServer(app);
const port = process.env.PORT || 3000;
server.listen(port);
console.debug('Server listening on port ' + port);