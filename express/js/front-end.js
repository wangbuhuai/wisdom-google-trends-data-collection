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

document.addEventListener("DOMContentLoaded",() => {
    const fileSelector = document.createElement("input");
    fileSelector.id = "input-file-selector";
    fileSelector.type = "file";
    fileSelector.hidden = true;
    fileSelector.accept = ".txt";
    fileSelector.multiple = false;
    document.body.appendChild(fileSelector);

    fileSelector.addEventListener("change", (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.addEventListener("load", (event) => {
            const inputData = JSON.parse(event.target.result.toString());
            document.getElementById("start-date").value = inputData["start-date"];
            document.getElementById("end-date").value = inputData["end-date"];
            document.getElementById("search-terms").value = inputData["search-terms"];
            const suggestionSwitch = inputData["suggestions"];
            if (suggestionSwitch === "on") {
                document.getElementById("suggestions-on").checked = true;
                document.getElementById("suggestions-off").checked = false;
                document.getElementById("suggestions").disabled = false;
                document.getElementById("suggestions").style.color = document.getElementById("suggestions-on").checked ? "blue" : "gray";
                document.getElementById("suggestions").value = inputData["suggestions-text"];
            } else {
                document.getElementById("suggestions-on").checked = false;
                document.getElementById("suggestions-off").checked = true;
                document.getElementById("suggestions").disabled = true;
                document.getElementById("suggestions").style.color = document.getElementById("suggestions-on").checked ? "blue" : "gray";
            }
            document.getElementById("index").value = parseInt(inputData["index"]);
        });
        reader.readAsText(file);
    });

    let date = getDate();
    document.getElementById("start-date").max = date;
    document.getElementById("end-date").value = date;
    document.getElementById("end-date").min = document.getElementById("start-date").value;
    document.getElementById("end-date").max = date;

    document.getElementById("start-date").addEventListener("change", () => {
        let startDate = new Date(document.getElementById("start-date").value);
        let endDate = new Date(document.getElementById("end-date").value);
        if (startDate.getTime() > endDate.getTime()) {
            document.getElementById("end-date").value = document.getElementById("start-date").value;
        }
        document.getElementById("end-date").min = document.getElementById("start-date").value;
    });

    document.getElementById("suggestions-on").addEventListener("change", () => {
        document.getElementById("suggestions").disabled = !document.getElementById("suggestions-on").checked;
        document.getElementById("suggestions").style.color = document.getElementById("suggestions-on").checked ? "blue" : "gray";
    });
    document.getElementById("suggestions-off").addEventListener("change", () => {
        document.getElementById("suggestions").disabled = document.getElementById("suggestions-off").checked;
        document.getElementById("suggestions").style.color = document.getElementById("suggestions-off").checked ? "gray" : "blue";
    });

    document.getElementById("import-file").addEventListener("click", () => {
        document.getElementById("reset").click();
        document.getElementById("input-file-selector").value = "";
        document.getElementById("input-file-selector").click();
    });

    document.getElementById("reset").addEventListener("click", () => {
        let date = getDate();
        document.getElementById("start-date").value = "2004-01-01";
        document.getElementById("start-date").min = "2004-01-01";
        document.getElementById("start-date").max = date;
        document.getElementById("end-date").value = date;
        document.getElementById("end-date").min = document.getElementById("start-date").value;
        document.getElementById("end-date").max = date;
        document.getElementById("search-terms").value = "";
        document.getElementById("suggestions-on").checked = false;
        document.getElementById("suggestions-off").checked = true;
        document.getElementById("suggestions").value = "";
        document.getElementById("suggestions").disabled = true;
        document.getElementById("suggestions").style.color = document.getElementById("suggestions-off").checked ? "gray" : "blue";
        document.getElementById("index").value = 1;
        document.getElementById("input-file-selector").value = "";
    });
});