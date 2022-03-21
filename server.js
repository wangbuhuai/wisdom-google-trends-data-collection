// Created by Dayu Wang (dwang@stchas.edu) on 2022-03-20

// Last updated by Dayu Wang (dwang@stchas.edu) on 2022-03-21


/** Returns the current date and time in "yyyy-mm-ddThhmm" format.
    @returns: current date in "yyyy-mm-ddThhmm" format
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
const googleTrends = require("google-trends-api");
const csvJson = require("csvjson");
const admZip = require("adm-zip");
const alert = require("alert");

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

app.post("/collect", (req, res) => {
    alert("Data being processed, please wait...");

    // Delete the old files in the directory.
    const directory = path.join(__dirname + "/svi_output_files");
    fs.readdirSync(directory).forEach(file => {
        fs.unlinkSync(directory + '/' + file);
    });

    const startDate = req.body["start-date"];
    const endDate = req.body["end-date"];
    const searchTerms = req.body["search-terms"].split(/\r\n/).filter(element => { return element.trim() !== ''; });
    const offset = parseInt(req.body["index"]);
    const zipFile = new admZip(undefined, undefined);
    let itemProcessed = 0;

    searchTerms.forEach((term, index) => {
        googleTrends.interestOverTime({
            keyword: term.trim(),
            startTime: new Date(startDate),
            endTime: new Date(endDate),
            geo: "US",
            hl: "en-US"
        })
            .then((results) => {
                const outputData = csvJson.toCSV(results, {
                    headers : "key"
                });
                let indexStr = (index + offset).toString();
                while (indexStr.length < 3) { indexStr = '0' + indexStr; }
                const outputFile = path.join(__dirname + "/svi_output_files/" + indexStr + "_-_" + term.replace(/\s+/, '_') + "_-_" + getTime() + ".csv");
                fs.writeFileSync(outputFile, outputData);
                zipFile.addLocalFile(outputFile, undefined, undefined, "no comments");
                itemProcessed++;
                if (itemProcessed === searchTerms.length) {
                    const filename = "SVI_Results_-_" + getTime() + ".zip";
                    const data = zipFile.toBuffer();
                    res.set("Content-Type", "application/octet-stream");
                    res.set("Content-Disposition", `attachment; filename=${filename}`);
                    res.set("Content-Length", data.length.toString());
                    res.send(data);
                    alert("Output data being downloaded...");
                }
            });
    });
});

const server = http.createServer(app);
const port = process.env.PORT || 3000;
server.listen(port);
console.debug('Server listening on port ' + port);