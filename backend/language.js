let fs = require('fs');
module.exports = {getTranslationFile, getLanguageIndex};

function getTranslationFile() {
    let readFileSync = fs.readFileSync(process.cwd() + "/public/lang/language.json", 'UTF-8');
    return readFileSync;
}

function getLanguageIndex(req) {
    let cookie = req.cookies['lang'];
    if (typeof cookie === "undefined") {
        cookie = "en";
    }
    return cookie === "en" ? 0 : 1;
}