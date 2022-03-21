// Created by Dayu Wang (dwang@stchas.edu) on 2022-03-20

// Last updated by Dayu Wang (dwang@stchas.edu) on 2022-03-20


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

$(function() {
    $("#start-date").on("change", function () {
        let startDate = new Date(document.getElementById("start-date").value);
        let endDate = new Date(document.getElementById("end-date").value);
        if (startDate.getTime() > endDate.getTime()) {
            document.getElementById("end-date").value = document.getElementById("start-date").value;
        }
        $("#end-date").attr({
            "min": document.getElementById("start-date").value
        });
    });
});

$(document).ready(function() {
    let date = getDate();
    let startDate = $("#start-date");
    startDate.attr("max", date);
    $("#end-date").attr({
        "value": date,
        "min": startDate.attr("value"),
        "max": date
    });
});