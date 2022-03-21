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
});