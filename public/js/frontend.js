function guestSubmit() {
    document.getElementById("meals_now_stay_input").value = document.getElementById("meals_now_stay").innerHTML;
    document.getElementById("meals_now_go_input").value = document.getElementById("meals_now_go").innerHTML;
}


function refreshLanguage() {
    let cookie = getCurrentLanguage();
    let id = cookie === "en" ? 0 : 1;
    let previd = -1;
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
                        element.innerHTML = element.innerText.replace(previd === -1 ? "%phrase%" : response[previd][id], jsonElementElement);
                        console.log("Applying language " + k + " -> " + jsonElementElement);
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
    let target = isEng ? "sp" : "en";
    setLanguageCookie("lang", target, 7);
    refreshLanguage();
}


function setCookie(name, value, days) {
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
