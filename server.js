// Created by Dayu Wang (dwang@stchas.edu) on 2022-03-20

// Last updated by Dayu Wang (dwang@stchas.edu) on 2022-03-21


/** Returns the current date and time in "yyyy-mm-ddThhmm" format.
    @returns: current date in "yyyy-mm-dd" format
*/
function getTime() {
    let date = new Date();
    let year = `${date.getFullYear()}`;
    let month = `${date.getMonth() + 1}`;
    if (month.length === 1) { month = '0' + month; }
    let day = `${date.getDate()}`;
    if (day.length === 1) { day = '0' + date; }
    let hour = `${date.getHours()}`;
    if (hour.length === 1) { hour = '0' + hour; }
    let min = `${date.getMinutes()}`;
    if (min.length === 1) { min = '0' + min; }
    return `${year}-${month}-${day}T${hour}${min}`;
}

const http = require("http");
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const fs = require("fs");

const app = express();
app.use(express.static("express"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (_, res) => {
    res.sendFile(path.join(__dirname + "/express/index.html"));
});

app.post("/export", (req, res) => {
    // Delete the old files in the directory.
    const directory = path.join(__dirname + "/export_files");
    fs.readdirSync(directory).forEach(file => {
        fs.unlinkSync(directory + '/' + file);
    });

    const text = JSON.stringify(req.body);
    const file = path.join(__dirname + "/export_files/Search_Input_-_" + getTime() + ".txt");
    fs.writeFileSync(file, text.toString(), () => {});
    res.download(file);
});

const server = http.createServer(app);
const port = process.env.PORT || 3000;
server.listen(port);
console.debug('Server listening on port ' + port);