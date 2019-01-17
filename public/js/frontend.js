function guestSubmit() {
    document.getElementById("meals_now_stay_input").value = document.getElementById("meals_now_stay").innerHTML;
    document.getElementById("meals_now_go_input").value = document.getElementById("meals_now_go").innerHTML;
}

let previous = null;

function refreshLanguage() {
    let cookie = getCurrentLanguage();
    let id = cookie === "en" ? 0 : 1;
    let previd = previous == null ? -1 : previous;
    $.ajax({
        dataType: "json",
        url: "http://localhost:3000/lang/language.json",
        success: function (response) {
            console.log(response);
            for (let k in response) {
                console.log("Trying " + k);
                let element = document.getElementById(k);
                if (element != null)
                    if (!(typeof element === "undefined")) {
                        let jsonElementElement = response[k][id];
                        console.log("prev: " + previous + " previd: " + previd);
                        let searchValue = previd === -1 ? "%phrase%" : response[k][previd];
                        element.innerHTML = element.innerText.replace(searchValue, jsonElementElement);
                        console.log("Applying language " + k + " -> " + jsonElementElement+" (" +searchValue+")");
                    }
            }
        }
    });


}

function getCurrentLanguage() {
    let cookie = getCookie("lang");
    if (typeof cookie === "undefined") {
        cookie = "en";
    }
    return cookie;
}

function swapLanguage() {
    let isEng = getCurrentLanguage() === "en";
    previous = isEng ? 0 : 1;
    let target = isEng ? "sp" : "en";
    setCookie("lang", target, 7);
    refreshLanguage();
}


function setCookie(name, value, days) {
    console.log("Setting " + name + " to " + value);
    let expires = "";
    if (days) {
        let date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function getCookie(name) {
    let value = "; " + document.cookie;
    let parts = value.split("; " + name + "=");
    if (parts.length === 2) return parts.pop().split(";").shift();
}


$(document).ready(function () {
    refreshLanguage();
});
