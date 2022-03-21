// Created by Dayu Wang (dwang@stchas.edu) on 2022-03-20

// Last updated by Dayu Wang (dwang@stchas.edu) on 2022-03-21


/** Returns the current date in "yyyy-mm-dd" format.
    @returns: current date in "yyyy-mm-dd" format
*/
function getDate() {
    let date = new Date();
    let year = `${date.getFullYear()}`;
    let month = `${date.getMonth() + 1}`;
    if (month.length === 1) { month = '0' + month; }
    date = `${date.getDate()}`;
    if (date.length === 1) { date = '0' + date; }
    return `${year}-${month}-${date}`;
}

function exportInputData() {
    let startDate = document.getElementById("start-date").value;
    let xhr = new XMLHttpRequest();
    let url = "#";
    xhr.open("POST", url, true);

    // Set the request header i.e. which type of content you are sending
    xhr.setRequestHeader("Content-Type", "application/json");

    // Create a state change callback
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            // Print received data from server
            console.log(this.responseText);
        }
    };

    // Converting JSON data to string
    let data = JSON.stringify({ "start": startDate });
    console.log(data);

    // Sending data with the request
    xhr.send(data);
}

document.addEventListener("DOMContentLoaded",function() {
    let date = getDate();
    document.getElementById("start-date").max = date;
    document.getElementById("end-date").value = date;
    document.getElementById("end-date").min = document.getElementById("start-date").value;
    document.getElementById("end-date").max = date;

    document.getElementById("start-date").addEventListener("change", function() {
        let startDate = new Date(document.getElementById("start-date").value);
        let endDate = new Date(document.getElementById("end-date").value);
        if (startDate.getTime() > endDate.getTime()) {
            document.getElementById("end-date").value = document.getElementById("start-date").value;
        }
        document.getElementById("end-date").min = document.getElementById("start-date").value;
    });

    document.getElementById("suggestions-on").addEventListener("change", function() {
        document.getElementById("suggestions").disabled = !document.getElementById("suggestions-on").checked;
        document.getElementById("suggestions").style.color = document.getElementById("suggestions-on").checked ? "blue" : "gray";
    });
    document.getElementById("suggestions-off").addEventListener("change", function() {
        document.getElementById("suggestions").disabled = document.getElementById("suggestions-off").checked;
        document.getElementById("suggestions").style.color = document.getElementById("suggestions-off").checked ? "gray" : "blue";
    });
});