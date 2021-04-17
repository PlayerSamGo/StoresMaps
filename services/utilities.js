const fs = require('fs');
const Nodemailer = require('nodemailer');

const Config = require('../scripts/setConfig.json');

function readHTMLFile(path, callback) {
    fs.readFile(path, {encoding: 'utf-8'}, function (errors, html) {
        if (errors) {
            throw errors;
            callback(errors);
        }
        else {
            callback(null, html);
        }
    });
};

function createSMTPTransporter(){
    return Nodemailer.createTransport({
        service: 'gmail',
        auth: Config.smtp_auth
    });
}

module.exports = {
    readHTMLFile,
    createSMTPTransporter
}