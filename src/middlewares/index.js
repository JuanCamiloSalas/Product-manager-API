const authentication = require("./authentication.js");
const authorization = require("./authorization.js");
const convertCSV = require("./convertCSV.js");
const readFile = require("./readFile.js");
const uploadFile = require("./uploadFile.js");

module.exports = {
    authentication,
    authorization,
    convertCSV,
    readFile,
    uploadFile,
}
